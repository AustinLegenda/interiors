<?php
function mytheme_get_patterns()
{
    return [
        [
            'name'        => 'pentablocktheme/penta-footer',
            'title'       => __('Penta Footer 1', 'text-domain'),
            'description' => __('A fullwidth two-section footer.', 'text-domain'),
            'categories'  => ['footers'],
            'keywords'    => ['footer', 'section'],
            'content'     => get_pattern_content(),
        ],
    ];
}

function get_pattern_content()
{
    ob_start(); // Start output buffering 
?>
    <!-- wp:pentablocktheme/penta-footer-block -->
    <footer class="wp-block-pentablocktheme-penta-footer-block">
        <div class="main-grid">
            <div class="main-grid-full grid-center"><!-- wp:group {"style":{"spacing":{"blockGap":"0"}},"layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"space-between"}} -->
                <div class="wp-block-group"><!-- wp:group {"style":{"spacing":{"blockGap":"16px"}},"layout":{"type":"flex","orientation":"vertical"}} -->
                    <div class="wp-block-group"><!-- wp:paragraph -->
                        <p>Contact information here.</p>
                        <!-- /wp:paragraph -->

                        <!-- wp:paragraph -->
                        <p>Copyright information here.</p>
                        <!-- /wp:paragraph -->
                    </div>
                    <!-- /wp:group -->

                    <!-- wp:group {"layout":{"type":"flex","flexWrap":"nowrap"}} -->
                    <div class="wp-block-group"><!-- wp:paragraph -->
                        <p>Facebook</p>
                        <!-- /wp:paragraph -->

                        <!-- wp:paragraph -->
                        <p>X</p>
                        <!-- /wp:paragraph -->

                        <!-- wp:paragraph -->
                        <p>Instagram</p>
                        <!-- /wp:paragraph -->
                    </div>
                    <!-- /wp:group -->
                </div>
                <!-- /wp:group -->
            </div>
        </div>
    </footer>
    <!-- /wp:pentablocktheme/penta-footer-block -->

<?php
    return ob_get_clean(); // Return the output buffer contents
}
?>