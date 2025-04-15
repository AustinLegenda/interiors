<?php use MatrixAddons\EasyInvoice\Admin\Fields\Quotes\DiscountFields;
use MatrixAddons\EasyInvoice\Admin\Fields\Quotes\LineItemFields; ?>
<div class="postbox">
	<div class="postbox-header"><h2>
			<?php
			echo __('Line Items', 'easy-invoice') ?></h2>
	</div>
	<div class="inside">
		<div class="easy-invoice-line-item-wrap">
			<?php
			$line_item_fields = new LineItemFields();

			$line_item_fields->render();


			/** @var \MatrixAddons\EasyInvoice\Repositories\QuoteRepository $line_item */
			$quote_repo = easy_invoice_get_quote_options();
			?>

		</div>
		<div class="easy-invoice-totals-wrap">
			<div class="easy-invoice-totals">
				<h3><?php echo __('Invoice Totals', 'easy-invoice') ?></h3>
				<div class="easy-invoice-sub-total total-item">
					<span class="label"><?php echo __('Sub Total', 'easy-invoice') ?></span><span
							class="value amount"><?php echo esc_html(easy_invoice_get_price($quote_repo->get_sub_total(), '', $quote_repo->get_id())) ?></span>

				</div>
				<div class="easy-invoice-tax total-item">
					<span class="label"><?php echo __('Tax', 'easy-invoice') ?></span><span
							class="value amount"><?php echo esc_html(easy_invoice_get_price($quote_repo->get_tax_amount(), '', $quote_repo->get_id())) ?></span>

				</div>

				<div class="easy-invoice-discount total-item">
				<span class="label"><?php echo __('Discount', 'easy-invoice') ?>
					<div class="easy-invoice-discount-settings">
					<?php
					$discount_settings = new DiscountFields();

					$discount_settings->render();
					?>
					</div>
				</span><span
							class="value amount">- <?php echo esc_html(easy_invoice_get_price($quote_repo->get_discount_amount(), '', $quote_repo->get_id())) ?></span>

				</div>

				<div class="easy-invoice-paid total-item" data-amount="<?php echo esc_attr($quote_repo->get_total_paid()) ?>">
					<span class="label"><?php echo __('Paid', 'easy-invoice') ?></span><span
							class="value amount"><?php echo esc_html(easy_invoice_get_price($quote_repo->get_total_paid(), '', $quote_repo->get_id())) ?></span>

				</div>

				<div class="easy-invoice-total total-item">
					<span class="label"><?php echo __('Total Due', 'easy-invoice') ?></span><span
							class="value amount"><?php echo esc_html(easy_invoice_get_price($quote_repo->get_due_amount(), '', $quote_repo->get_id())) ?></span>

				</div>

			</div>
		</div>
		<div class="clear"></div>

	</div>
</div>
