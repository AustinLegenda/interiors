<?php

namespace MatrixAddons\EasyInvoice\Meta;

use MatrixAddons\EasyInvoice\Admin\Fields\Quotes\ClientFields;
use MatrixAddons\EasyInvoice\Admin\Fields\Quotes\CurrencyFields;
use MatrixAddons\EasyInvoice\Admin\Fields\Quotes\DiscountFields;
use MatrixAddons\EasyInvoice\Admin\Fields\Quotes\QuoteDescriptionFields;
use MatrixAddons\EasyInvoice\Admin\Fields\Quotes\QuoteFields;
use MatrixAddons\EasyInvoice\Admin\Fields\Quotes\LineItemFields;
use MatrixAddons\EasyInvoice\Admin\Fields\Quotes\PaymentFields;
use MatrixAddons\EasyInvoice\Admin\Fields\Quotes\TaxFields;
use MatrixAddons\EasyInvoice\Admin\Fields\Quotes\TermsConditionsFields;
use MatrixAddons\EasyInvoice\Constant;
use MatrixAddons\EasyInvoice\Repositories\QuoteRepository;

class Quote
{

	public function metabox()
	{
		$current_screen = get_current_screen();

		$screen_id = $current_screen->id ?? '';


		if ($screen_id != Constant::QUOTE_POST_TYPE) {
			return;
		}
		add_action('edit_form_after_editor', array($this, 'quote_description_template'));

		add_action('edit_form_after_editor', array($this, 'line_items_template'));

		add_action('edit_form_after_editor', array($this, 'terms_conditions'));

		add_meta_box('easy-invoice-quote-client-details',
			__('Client Detail', 'easy-invoice'), array($this, 'client_settings'), Constant::QUOTE_POST_TYPE, 'side', 'low');

		add_meta_box('easy-invoice-quote-details',
			__('Estimate Details', 'easy-invoice'), array($this, 'quote_details'), Constant::QUOTE_POST_TYPE, 'side', 'low');

		add_meta_box('easy-invoice-currency',
			__('Currency', 'easy-invoice'), array($this, 'currency_settings'), Constant::QUOTE_POST_TYPE, 'side', 'low');

		add_meta_box('easy-invoice-tax',
			__('Tax', 'easy-invoice'), array($this, 'tax_settings'), Constant::QUOTE_POST_TYPE, 'side', 'low');

		add_meta_box('easy-invoice-quote-log',
			__('Estimate Log', 'easy-invoice'), array($this, 'quote_log'), Constant::QUOTE_POST_TYPE, 'side', 'low');


		add_action('post_submitbox_misc_actions', array($this, 'before_save_post'));

	}


	public function save($post_id)
	{

		if (get_post_type($post_id) !== Constant::QUOTE_POST_TYPE) {
			return;
		}

		$active_tab = isset($_POST['easy_invoice_meta_active_tab']) ? sanitize_text_field($_POST['easy_invoice_meta_active_tab']) : 'easy_invoice_general_options';


		$client_fields = new ClientFields();

		$client_fields->save($_POST, $post_id);


		$currency_fields = new CurrencyFields();

		$currency_fields->save($_POST, $post_id);


		$discount_fields = new DiscountFields();

		$discount_fields->save($_POST, $post_id);


		$description_fields = new QuoteDescriptionFields();

		$description_fields->save($_POST, $post_id);


		$line_item_fields = new LineItemFields();

		$line_item_fields->save($_POST, $post_id);


		$tax_fields = new TaxFields();

		$tax_fields->save($_POST, $post_id);

		$quote_fields = new QuoteFields();

		$quote_fields->save($_POST, $post_id);


		$terms_conditions_fields = new TermsConditionsFields();

		$terms_conditions_fields->save($_POST, $post_id);


		update_post_meta($post_id, 'easy_invoice_meta_active_tab', $active_tab);

	}

	public function quote_description_template($post)
	{

		easy_invoice_load_admin_template('Metabox.Quote.Descriptions');
	}

	public function terms_conditions()
	{

		easy_invoice_load_admin_template('Metabox.Quote.TermsConditions');
	}

	public function line_items_template()
	{

		easy_invoice_load_admin_template('Metabox.Quote.LineItems');
	}


	public function currency_settings($post)
	{
		if ($post->post_type !== Constant::QUOTE_POST_TYPE) {
			return;
		}

		echo '<div class="easy-invoice-currency-settings">';

		$currency_fields = new CurrencyFields();

		$currency_fields->render();

		echo '</div>';
	}

	public function client_settings($post)
	{
		if ($post->post_type !== Constant::QUOTE_POST_TYPE) {
			return;
		}
		echo '<div class="easy-invoice-client-settings">';

		$client_fields = new ClientFields();

		$client_fields->render();

		echo '</div>';
	}

	public function quote_details($post)
	{
		if ($post->post_type !== Constant::QUOTE_POST_TYPE) {
			return;
		}
		echo '<div class="easy-invoice-invoice-settings">';

		$quote_fields = new QuoteFields();

		$quote_fields->render();

		echo '</div>';
	}

	public function tax_settings($post)
	{
		if ($post->post_type !== Constant::QUOTE_POST_TYPE) {
			return;
		}
		echo '<div class="easy-invoice-tax-settings">';

		$tax_fields = new TaxFields();

		$tax_fields->render();

		echo '</div>';
	}

	public function quote_log($post)
	{
		if ($post->post_type !== Constant::QUOTE_POST_TYPE) {
			return;
		}
		echo '<div class="easy-invoice-quote-log">';

		$quote = new QuoteRepository($post->ID);

		$log = $quote->get_quote_log();

		$log = is_array($log) ? $log : array();

		rsort($log);

		easy_invoice_load_admin_template('Metabox.Quote.Logs', array('logs' => $log));

		echo '</div>';
	}


	public function scripts()
	{
		$screen = get_current_screen();

		$screen_id = $screen->id ?? '';

		if ($screen_id != Constant::QUOTE_POST_TYPE) {
			return;
		}
		wp_enqueue_media();


		wp_register_style('easy-invoice-flatpicker-style', EASY_INVOICE_PLUGIN_URI . '/assets/lib/flatpicker/flatpicker.min.css', array(), EASY_INVOICE_VERSION);
		wp_register_script('easy-invoice-flatpicker-script', EASY_INVOICE_PLUGIN_URI . '/assets/lib/flatpicker/flatpicker.min.js', array('jquery'), EASY_INVOICE_VERSION);


		wp_enqueue_style('easy-invoice-admin-style', EASY_INVOICE_PLUGIN_URI . '/assets/admin/css/easy-invoice-admin.css', array('easy-invoice-flatpicker-style'), EASY_INVOICE_VERSION);
		wp_enqueue_script('easy-invoice-admin-script', EASY_INVOICE_PLUGIN_URI . '/assets/admin/js/easy-invoice-admin.js', array('easy-invoice-flatpicker-script'), EASY_INVOICE_VERSION, true);
		wp_localize_script('easy-invoice-admin-script', 'easyInvoiceAdminParams', array(
			'currency_position' => easy_invoice_get_currency_position(),
			'thousand_separator' => easy_invoice_get_thousand_separator(),
			'decimal_separator' => easy_invoice_get_decimal_separator(),
			'number_decimals' => easy_invoice_get_price_number_decimals(),
			'currency_symbol_type' => get_option('easy_invoice_currency_symbol_type', 'symbol')
		));


	}


	public function hide_screen_option($show_screen)
	{
		if (get_current_screen()->post_type === Constant::QUOTE_POST_TYPE) {

			return false;
		}
		return $show_screen;

	}

	public function before_save_post($post)
	{

		if ($post->post_type != Constant::QUOTE_POST_TYPE || $post->post_status == 'auto-draft') {
			return;
		}

		$invoice_id = $post->ID;

		echo '<div class="misc-pub-section curtime" style="text-align:right">';
		echo '<a style="display:inline-flex;justify-content:space-between; align-items: center; text-align:center; margin-right:5px;" target="_blank" title="' . esc_html__('View', 'easy-invoice') . '" class="button button-secondary" href="' . get_permalink($invoice_id) . '"><span class="dashicons dashicons-visibility"></span></a>';
		echo '<a style="display:inline-flex;justify-content:space-between; align-items: center; text-align:center;margin-right:5px;" target="_blank; margin-right:5px;" title="' . esc_html__('Download as PDF', 'easy-invoice') . '" class="button button-secondary" href="' . esc_url(easy_invoice_get_download_as_pdf_url($invoice_id)) . '"><span class="dashicons dashicons-pdf"></span></a>';
		echo '</div>';
	}

	public function first_publish($new, $old, $post)
	{
		if ($post->post_type != Constant::QUOTE_POST_TYPE) {
			return;
		}
		if ($new == 'publish' && $old != 'publish' && isset($post->post_type)) {

			$quote_number = absint(get_option('easy_invoice_quote_number', 0));

			$quote_number = $quote_number + 1;

			$quote_number = $quote_number < 1 ? 1 : $quote_number;

			update_option('easy_invoice_quote_number', absint($quote_number));

		}

	}

	public static function init()
	{
		$self = new self();
		add_filter('screen_options_show_screen', array($self, 'hide_screen_option'));
		add_action('add_meta_boxes', array($self, 'metabox'), 11);
		add_action('save_post', array($self, 'save'));
		add_action('admin_enqueue_scripts', array($self, 'scripts'), 10);
		add_action('do_meta_boxes', array($self, 'remove_metabox'), 1, 3);
		add_action('transition_post_status', array($self, 'first_publish'), 10, 3);

	}

	public function remove_metabox($post_type, $context, $post)
	{
		if ($post_type !== Constant::QUOTE_POST_TYPE) {
			return;
		}

		remove_meta_box('astra_settings_meta_box', $post_type, $context);
		remove_meta_box('postcustom', $post_type, $context);

	}
}

