<?php
get_header('single');

// Retrieve categories data
$categories = get_post_meta(get_the_ID(), 'categories', true);

if (have_posts()) :
    while (have_posts()) : the_post(); ?>
        <article class="main-grid-full">
            <div>
                <div class="estimate-wrapper">
                    <!-- Job Header Section -->
                    <div class="estimate-header">
                        <h1>ESTIMATE</h1>
                        <h5><?php echo esc_html(get_post_meta(get_the_ID(), 'estimate_number', true)); ?></h5>
                    </div>
                    <div class="Estimate-Info">
                        <h4>
                            JOB TITLE: <?php the_title(); ?> <br>
                            JOB DATE(S): <?php echo esc_html(get_post_meta(get_the_ID(), 'job_dates', true)); ?>
                        </h4>
                    </div>
                    <div class="contact-info">
                        <h4 class="my-contact">
                            <?php echo nl2br(esc_html(get_post_meta(get_the_ID(), 'my_contact', true))); ?>
                        </h4>
                        <h4 class="client-contact">
                            <?php echo nl2br(esc_html(get_post_meta(get_the_ID(), 'client_contact', true))); ?>
                        </h4>
                    </div>

                    <div class="job-description">
                        <p><strong>Job Description:</strong> <?php the_content(); ?> </p>
                        <p><strong>Job Scope:</strong></p>
                        <p><?php echo nl2br(esc_html(get_post_meta(get_the_ID(), 'job_scope', true))); ?></p>
                    </div>

                    <!-- Additional Details -->
                    <div class="additional-details">
                        <?php
                        $licensing_options = get_post_meta(get_the_ID(), 'licensing_options', true);
                        $client_provisions = get_post_meta(get_the_ID(), 'client_provisions', true);
                        ?>

                        <?php if (!empty($licensing_options)): ?>
                            <p><strong>Licensing Options:</strong></p>
                            <p><?php echo nl2br(esc_html($licensing_options)); ?></p>
                        <?php endif; ?>

                        <?php if (!empty($client_provisions)): ?>
                            <p><strong>Client Provisions:</strong></p>
                            <p><?php echo nl2br(esc_html($client_provisions)); ?></p>
                        <?php endif; ?>
                    </div>

                    <!-- Line Items Section -->
                    <hr />
                    <div class="line-items">
                        <table class="line-items-table">
                            <tbody>
                                <?php
                                $categories = get_post_meta(get_the_ID(), 'categories', true);

                                if (!empty($categories) && is_array($categories)) {
                                    foreach ($categories as $category) {
                                        echo '<tr><td colspan="2"><strong>' . esc_html($category['name']) . '</strong></td></tr>';

                                        if (!empty($category['line_items']) && is_array($category['line_items'])) {
                                            foreach ($category['line_items'] as $item) {
                                                $description = esc_html($item['description'] ?? '');
                                                $quantity = intval($item['quantity'] ?? 0);
                                                $unit_price = floatval($item['unit_price'] ?? 0);
                                                $unit = esc_html($item['unit'] ?? '');
                                                $total = $quantity * $unit_price;

                                                if ($description && $quantity > 0 && $unit_price > 0) {
                                                    echo '<tr>';
                                                    echo '<td>' . $quantity . ' ' . $description . ' ' . $unit . ' @ $' . number_format($unit_price, 2) . '</td>';
                                                    echo '<td>$' . number_format($total, 2) . '</td>';
                                                    echo '</tr>';
                                                }
                                            }
                                        } else {
                                            echo '<tr><td colspan="2">No line items found in ' . esc_html($category['name']) . '.</td></tr>';
                                        }
                                    }
                                } else {
                                    echo '<tr><td colspan="2">No categories or line items found.</td></tr>';
                                }
                                ?>
                            </tbody>


                        </table>
                    </div>

                    <!-- Financial Summary -->
                    <div class="financial-summary">
                        <hr />
                        <?php
                        // Retrieve subtotal from post meta
                        $subtotal = floatval(get_post_meta(get_the_ID(), 'subtotal', true));
                        ?>
                        <p><strong>Subtotal: </strong>$<?php echo number_format($subtotal, 2); ?></p>
                        <p><strong>Total (including applicable fees): </strong>$<?php echo number_format($subtotal, 2); ?></p>
                    </div>


                    <!-- Terms and Conditions -->
                    <div class="terms-and-conditions">
                        <h2>Terms and Conditions</h2>
                        <p>Your standard terms and conditions go here. You can dynamically load them or enter them as static text.</p>
                    </div>

                    <!-- Approval Section -->
                    <div class="approval-section">
                        <h2>Approval</h2>
                        <p>Please review the estimate and confirm your approval.</p>
                        <button class="accept-btn">Accept</button>
                        <button class="decline-btn">Decline</button>
                    </div>
                </div>
        <?php endwhile;
endif; ?>
            </div>
        </article>
        </div>
        <?php get_footer(); ?>