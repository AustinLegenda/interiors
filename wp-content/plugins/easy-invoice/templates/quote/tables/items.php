<?php

use MatrixAddons\EasyInvoice\Models\LineItemModel;

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly
}

global $ei_quote;

$line_items = $ei_quote->get_line_items();

?>

<div class="ei-invoice-items">
	<table>
		<tbody>
			<?php
			/** @var LineItemModel $line_item */
			foreach ($line_items as $line_item) {

				// If it's a section header, render it as a separate row
				if ($line_item->get_entry_type() === 'header') { ?>
					<tr class="section-header">
						<td colspan="" class="section-header-title">
							<strong><?php echo esc_html($line_item->get_section_header()); ?></strong>
						</td>

					</tr>
				<?php } else { // Otherwise, render as a regular line item 
				?>
					<tr>
						<td class="service line-item-style">
						&nbsp;&nbsp;&nbsp;&nbsp;
							<?php echo esc_html($line_item->get_quantity()); ?>
							<?php echo esc_html($line_item->get_item_title()); ?>
							<?php echo esc_html($line_item->get_qty_type()); ?>
							@ <?php echo esc_html(easy_invoice_get_price($line_item->get_rate(), '', $ei_quote->get_id())); ?>
							<?php
							// Check if qty_type is greater than 1 and output "each"
							if ($line_item->get_quantity() > 1) {
								echo esc_html(' each');
							}
							?>
							<?php echo esc_html($line_item->get_description()); ?>
							.
						
						</td>
						<td class="total right-text"><?php echo esc_html(easy_invoice_get_price($line_item->get_amount(), '', $ei_quote->get_id())); ?></td>
					</tr>
				<?php } ?>
			<?php } ?>
		</tbody>
	</table>
</div>