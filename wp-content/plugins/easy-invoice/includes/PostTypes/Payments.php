<?php

namespace MatrixAddons\EasyInvoice\PostTypes;

use MatrixAddons\EasyInvoice\Constant;

class Payments
{
    private $slug = Constant::PAYMENT_POST_TYPE;

    public function register()
    {
        $labels = array(
            'name' => __('Payments', 'easy-invoice'),
            'singular_name' => __('Payment', 'easy-invoice'),
            'add_new' => __('Add New payment', 'easy-invoice'),
            'add_new_item' => __('Add New payment', 'easy-invoice'),
            'edit_item' => __('Edit payment', 'easy-invoice'),
            'new_item' => __('New payment', 'easy-invoice'),
            'all_items' => __('All Payments', 'easy-invoice'),
            'view_item' => __('View invoice', 'easy-invoice'),
            'search_items' => __('Search invoice', 'easy-invoice'),
            'not_found' => __('No Payments found', 'easy-invoice'),
            'not_found_in_trash' => __('No Payments found in the Trash', 'easy-invoice'),
            'parent_item_colon' => '',
        );

        $args = array(
            'labels' => $labels,
            'show_in_menu' => 'edit.php?post_type=' . Constant::INVOICE_POST_TYPE,
            'public' => true,
            'supports' => array('title'),
            'has_archive' => false,
            'publicly_queryable' => false,
            'exclude_from_search' => false,
            'show_in_admin_bar' => false,
        );
        register_post_type($this->slug, $args);
    }

    public function generate_split_invoices($estimate_id, $deposit_percentage)
    {
        $total_amount = get_post_meta($estimate_id, 'total_invoice_amount', true);
        $deposit_amount = $total_amount * ($deposit_percentage / 100);
        $remaining_amount = $total_amount - $deposit_amount;
        $order_number = get_post_meta($estimate_id, 'order_number', true);
        
        // Create Deposit Invoice
        $deposit_invoice_id = wp_insert_post([
            'post_title' => 'Deposit Invoice - Estimate #' . $estimate_id,
            'post_type' => Constant::INVOICE_POST_TYPE,
            'post_status' => 'publish'
        ]);
        update_post_meta($deposit_invoice_id, 'invoice_amount', $deposit_amount);
        update_post_meta($deposit_invoice_id, 'invoice_status', 'available');
        update_post_meta($deposit_invoice_id, 'is_deposit_invoice', true);
        update_post_meta($deposit_invoice_id, 'order_number', $order_number);

        // Create Remaining Balance Invoice
        $balance_invoice_id = wp_insert_post([
            'post_title' => 'Final Payment Invoice - Estimate #' . $estimate_id,
            'post_type' => Constant::INVOICE_POST_TYPE,
            'post_status' => 'pending'
        ]);
        update_post_meta($balance_invoice_id, 'invoice_amount', $remaining_amount);
        update_post_meta($balance_invoice_id, 'invoice_status', 'available');
        update_post_meta($balance_invoice_id, 'order_number', $order_number);

        return [$deposit_invoice_id, $balance_invoice_id];
    }

    public function mark_deposit_paid($invoice_id)
    {
        // Check if it's a deposit invoice
        $is_deposit = get_post_meta($invoice_id, 'is_deposit_invoice', true);
        if ($is_deposit) {
            update_post_meta($invoice_id, 'invoice_status', 'paid');

            // Find linked final invoice using order_number
            $order_number = get_post_meta($invoice_id, 'order_number', true);
            $final_invoice = get_posts([
                'post_type' => Constant::INVOICE_POST_TYPE,
                'meta_query' => [
                    [
                        'key' => 'order_number',
                        'value' => $order_number
                    ],
                    [
                        'key' => 'is_deposit_invoice',
                        'compare' => 'NOT EXISTS'
                    ]
                ]
            ]);

            if (!empty($final_invoice)) {
                update_post_meta($final_invoice[0]->ID, 'invoice_status', 'available');
            }
        }
    }

    public static function init()
    {
        $self = new self();
        add_action('init', [$self, 'register']);
    }
}

Payments::init();
