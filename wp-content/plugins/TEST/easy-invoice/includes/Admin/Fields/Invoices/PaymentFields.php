<?php

namespace MatrixAddons\EasyInvoice\Admin\Fields\Invoices;

use MatrixAddons\EasyInvoice\Repositories\InvoiceRepository;
use MatrixAddons\EasyInvoice\Repositories\PaymentRepository;
use MatrixAddons\EasyInvoice\Admin\Fields\Base;

class PaymentFields extends Base
{
	public function get_settings()
	{
		return [
			'payment_item_0_start' => [
				'type' => 'wrap',
				'class' => 'easy-invoice-payment-item-0-wrap',
			],
			'invoice_id' => [
				'title' => __('Select any invoice', 'easy-invoice'),
				'type' => 'text',
				'class' => 'easy-invoice-invoice-id',
				'options' => array()
			],

			'payment_item_0_end' => [
				'type' => 'wrap_end',
				'class' => 'easy-invoice-payment-item-3-wrap-end',
			],
			'payment_item_1_start' => [
				'type' => 'wrap',
				'class' => 'easy-invoice-payment-item-1-wrap',
			],
			'payment_date' => [
				'type' => 'text',
				'title' => __('Payment Date', 'easy-invoice'),
				'class' => 'easy-invoice-payment-date',
				'default' => '',
			],
			'paid_amount' => [
				'type' => 'text',
				'title' => __('Amount', 'easy-invoice'),
				'class' => 'easy-invoice-payment-paid-amount',
				'default' => '',
			],
			'payment_gateway' => [
				'type' => 'select',
				'title' => __('Payment Method', 'easy-invoice'),
				'class' => 'easy-invoice-payment-method',
				'default' => '',
				'options' => easy_invoice_get_payment_gateway_lists()
			],
			'transaction_id' => [
				'type' => 'text',
				'title' => __('Transaction ID', 'easy-invoice'),
				'class' => 'easy-invoice-payment-transaction-id',
				'default' => '',
			],
			'status' => [
				'type' => 'select',
				'title' => __('Payment Status', 'easy-invoice'),
				'class' => 'easy-invoice-payment-status',
				'default' => '',
				'options' => PaymentRepository::payment_statuses()
			],

			'payment_item_1_end' => [
				'type' => 'wrap_end',
				'class' => 'easy-invoice-payment-item-1-wrap-end',
			],

			'payment_item_2_start' => [
				'type' => 'wrap',
				'class' => 'easy-invoice-payment-item-2-wrap',
			],
			'payment_note' => [
				'title' => __('Payment Note', 'easy-invoice'),
				'type' => 'textarea',
				'class' => 'easy-invoice-payment-note',
			],

			'payment_item_2_end' => [
				'type' => 'wrap_end',
				'class' => 'easy-invoice-payment-item-3-wrap-end',
			],

		];
	}

	public function render()
	{
		$this->output();
	}

	public function nonce_id()
	{
		return 'easy_invoice_payment_item_fields';
	}

	public function save1($post_data, $post_id)
	{
		if (empty($post_data) || !check_admin_referer($this->nonce_id(), $this->nonce_id() . '_nonce')) {
			return;
		}
		$valid_data = $this->get_valid_data($post_data);


		$invoice_id = get_the_ID();

		$invoice = new InvoiceRepository($invoice_id);

		$due_amount = $invoice->get_due_amount();

		$paid_amount = $invoice->get_total_paid();

		if ($paid_amount > $due_amount) {

			return;
		}

		$payment_valid_data = $valid_data['easy_invoice_payment_items'] ?? array();

		$paid_amount_from_valid_data = 0;

		foreach ($payment_valid_data as $valid_data_index => $valid_data_item) {

			if ($valid_data_item['status'] === 'publish') {

				$paid_amount_from_valid_data += (isset($valid_data_item['paid_amount']) ? floatval($valid_data_item['paid_amount']) : 0);
			}

		}
		if ($paid_amount_from_valid_data > $due_amount) {
			return;
		}


		foreach ($payment_valid_data as $valid_data_item_for_save) {

			$payment_id = isset($valid_data_item_for_save['payment_id']) ? absint($valid_data_item_for_save['payment_id']) : 0;

			if ($payment_id > 0) {

				$payment = new PaymentRepository($payment_id);

				$invoice_id_by_payment_id = $payment->get_invoice_id();


				if (absint($invoice_id) !== absint($invoice_id_by_payment_id)) {
					return;
				}

				$payment->add_note($valid_data_item_for_save['payment_note']);

				easy_invoice_update_payment_status($payment_id, $valid_data_item_for_save['status'], $valid_data_item_for_save['paid_amount'], $valid_data_item_for_save['transaction_id']);

				$payment->update_payment_date($valid_data_item_for_save['payment_date']);

				$payment->update_payment_gateway($valid_data_item_for_save['payment_gateway']);

			}

		}

	}

}
