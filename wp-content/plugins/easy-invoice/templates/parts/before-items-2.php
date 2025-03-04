<hr>
<table class="before-items-two | lei-section">
    <tr class="lei-tr">
        <td class="lei-td"><?php easy_invoice_get_to_address(); ?></td>

        <td class="lei-td | align-right">
            <?php
            global $ei_invoice, $ei_quote;

			$is_quote = isset($ei_quote);
			$is_invoice = isset($ei_invoice);

            if ($is_quote) {
                // Quote block
                foreach ($details_data as $details) {
                    if ($details['label'] === easy_invoice_get_text('quote_number')) {
                        echo '<div class="quote-number lei-detail"><strong>Estimate Number:</strong> ' . esc_html($details['value']) . '</div>';
                    } elseif ($details['label'] === easy_invoice_get_text('quote_date')) {
                        echo '<div class="quote-date lei-detail"><strong>Estimate Date:</strong> ' . esc_html($details['value']) . '</div>';
                    } elseif ($details['label'] === easy_invoice_get_text('valid_until_date')) {
                        echo '<div class="valid-until lei-detail"><strong>Valid Until Date:</strong> ' . esc_html($details['value']) . '</div>';
                    }
                }
            } elseif ($is_invoice) {
                // Invoice block
                foreach ($details_data as $details) {
                    if ($details['label'] === easy_invoice_get_text('invoice_number')) {
                        echo '<div class="invoice-number lei-detail"><strong>Invoice Number:</strong> ' . esc_html($details['value']) . '</div>';
					} elseif ($details['label'] === easy_invoice_get_text('order_number')) { // Added Purchase Order
                        echo '<div class="order-number lei-detail"><strong>Work Order:</strong> ' . esc_html($details['value']) . '</div>';
					} elseif ($details['label'] === easy_invoice_get_text('invoice_date')) {
                        echo '<div class="invoice-date lei-detail"><strong>Invoice Date:</strong> ' . esc_html($details['value']) . '</div>';
                    } elseif ($details['label'] === easy_invoice_get_text('due_date')) {
                        echo '<div class="due-date lei-detail"><strong>Due Date:</strong> ' . esc_html($details['value']) . '</div>';
                    } elseif ($details['label'] === easy_invoice_get_text('total_due')) {
                        echo '<div class="total-due lei-detail"><strong>Total Due:</strong> ' . esc_html($details['value']) . '</div>';
                    }
                }
            }
            ?>
        </td>
    </tr>
</table>

