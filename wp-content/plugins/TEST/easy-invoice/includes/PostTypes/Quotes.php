<?php

namespace MatrixAddons\EasyInvoice\PostTypes;

use MatrixAddons\EasyInvoice\Constant;

class Quotes
{

	private $slug = Constant::QUOTE_POST_TYPE;

	public function register()
	{
		$permalink = sanitize_text_field(get_option('easy_invoice_permalink_for_quotes', Constant::QUOTE_POST_TYPE));

		$permalink = $permalink == '' ? Constant::QUOTE_POST_TYPE : sanitize_text_field($permalink);

		$labels = array(
			'name' => __('Quotes', 'easy-invoice'),
			'singular_name' => __('Quote', 'easy-invoice'),
			'add_new' => __('Add New quote', 'easy-invoice'),
			'add_new_item' => __('Add New quote', 'easy-invoice'),
			'edit_item' => __('Edit quote', 'easy-invoice'),
			'new_item' => __('New quote', 'easy-invoice'),
			'all_items' => __('All Quotes', 'easy-invoice'),
			'view_item' => __('View quote', 'easy-invoice'),
			'search_items' => __('Search quote', 'easy-invoice'),
			'not_found' => __('No Quotes found', 'easy-invoice'),
			'not_found_in_trash' => __('No Quotes found in the Trash', 'easy-invoice'),
			'parent_item_colon' => '',
		);

		$args = array(
			'labels' => $labels,
			'menu_icon' => 'dashicons-text-page',
			'public' => true,
			'supports' => array('title'),
			'has_archive' => false,
			'publicly_queryable' => true,
			'exclude_from_search' => true,
			'show_in_admin_bar' => false,
			'rewrite' => array(
				'slug' => trim($permalink),
				'with_front' => true
			),
		);
		register_post_type($this->slug, $args);

		do_action('easy_invoice_after_register_post_type');

	}

	public static function init()
	{

		$self = new self();
		add_action('init', [$self, 'register']);
	}
}



