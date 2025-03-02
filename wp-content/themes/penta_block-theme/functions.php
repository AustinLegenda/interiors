<?php


define('__ROOT__', dirname(dirname(__FILE__)));
require_once(__ROOT__ . '/penta_block-theme/scripts/enqueue.php');
require_once(__ROOT__ . '/penta_block-theme/scripts/ajax/folio-filter.php');
require_once(__ROOT__ . '/penta_block-theme/scripts/register-custom.php');
require_once(__ROOT__ . '/penta_block-theme/scripts/legenda-nav-walker.php');

// Custom logo
function themename_custom_logo_setup()
{
    $defaults = array(
        'height' => 100,
        'width' => 400,
        'flex-height' => true,
        'flex-width' => true,
        'header-text' => array('site-title', 'site-description'),
        'unlink-homepage-logo' => true,
    );
    add_theme_support('custom-logo');
}
add_action('after_setup_theme', 'themename_custom_logo_setup');

// Custom header
function themename_custom_header_setup()
{
    $args = array(
        'default-image' => get_template_directory_uri() . 'img/default-image.jpg',
        'default-text-color' => '000',
        'width' => 1000,
        'height' => 250,
        'flex-width' => true,
        'flex-height' => true,
    );
    add_theme_support('custom-header');
}
add_action('after_setup_theme', 'themename_custom_header_setup');

// Images
add_action('after_setup_theme', 'imageSizes');
function imageSizes()
{
    add_image_size("16:9", 1400, 784, true);
    add_image_size("3:2", 1400, 924, true);
    add_image_size("3:4", 1400, 1050, true);
    add_image_size("s_sq_nc", 350, 350);
    add_image_size("L_sq_nc", 700, 700);
    add_image_size('hero_image', 2500, 1650);
    add_theme_support('post-thumbnails');
}

// Block theme customization
function pentaTheme_setup() {
    // Enable support for the block editor
    add_theme_support('editor-styles');
    add_theme_support('wp-block-styles'); // For default block styles
    add_theme_support('align-wide'); // Allow wide/full alignments in blocks
    add_theme_support('responsive-embeds'); // Responsive embeds in blocks

    // Load custom editor styles (optional)
    add_editor_style(array('build/style-index.css', 'build/index.css'));
}
add_action('after_setup_theme', 'pentaTheme_setup');

class JSXBlock
{
    function __construct($name, $renderCallback = null, $data = null)

    {
        $this->name = $name;
        $this->data = $data;
        $this->renderCallback = $renderCallback;
        add_action('init', [$this, 'onInit']);
    }

    function ourRenderCallback($attributes, $content)
    {
        ob_start();
        // Pass the content and attributes to the template
        require get_theme_file_path("/penta-blocks/{$this->name}.php");
        return ob_get_clean();
    }

    function onInit()
    {
        // Register the block script
        wp_register_script($this->name, get_stylesheet_directory_uri() . "/build/{$this->name}.js", array('wp-blocks', 'wp-editor'));

        // Optionally pass data to the block
        wp_localize_script($this->name, 'siteInfo', array(
            'blogName' => get_bloginfo('name'),
            'homeUrl'  => home_url(),
        ));

        // Enqueue the script
        wp_enqueue_script($this->name);

        // Arguments for registering the block
        $args = array(
            'editor_script' => $this->name
        );

        // Set the render callback if passed
        if ($this->renderCallback) {
            $args['render_callback'] = [$this, 'ourRenderCallback'];
        }

        // Register the block type with a unique name
        register_block_type("pentablocktheme/{$this->name}", $args);
    }
}
// Registering multiple blocks dynamically using JSXBlock
new JSXBlock('penta-header-hero', true);
new JSXBlock('penta-article-block', true);
new JSXBlock('penta-blog-block', true);
new JSXBlock('penta-work-block', true);
new JSXBlock('penta-footer-block');
new JSXBlock('penta-header-block');






//remove the P

remove_filter('the_excerpt', 'wpautop');
//remove_filter( 'the_content', 'wpautop' );



/**
 * rest API for menus
 * */


add_action('rest_api_init', function () {
    register_rest_route('mytheme/v1', '/menu-items/', array(
        'methods' => 'GET',
        'callback' => 'get_menu_items',
    ));
});

function get_menu_items() {
    // Replace 'mainNav' with your actual menu location
    $menu_items = wp_get_nav_menu_items('main-menu');

    // Debug output for checking menu items
    if (empty($menu_items)) {
        error_log('No menu items found for main-menu');
        return new WP_Error('no_menu_items', 'No menu items found', array('status' => 404));
    }

    error_log('Menu items found: ' . print_r($menu_items, true)); // Log the menu items for debugging
    return $menu_items; // Return the menu items
}



