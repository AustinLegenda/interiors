<?php
/*
Plugin Name: Penta Portfolio Grid
Description: A dynamic and responsive grid for your posts.
Version: 1.0
Author: Legenda Co
Author URI: https://legenda.co
*/

if (!defined('ABSPATH')) exit; // Prevent direct access

class PentaPortfolioGrid
{

    // Initialize plugin hooks
    public static function init()
    {
        add_action('init', [__CLASS__, 'registerBlocks']);
    }

    // Register custom Gutenberg blocks
    public static function registerBlocks()
    {
        // Define block configurations
        $blocks = [
            'ppg' => [
                'script' => 'ppg.js',
                'style' => 'style-index.css', // Front-end and editor style
                'render_callback' => true, // Dynamic block rendering
            ],
        ];

        // Register each block with its script, style, and render callback
        foreach ($blocks as $name => $block) {
            $script_handle = "pentaportfoliogrid/{$name}";
            $style_handle = "pentaportfoliogrid/{$name}-style";

            // Register block editor script
            wp_register_script(
                $script_handle,
                plugins_url("build/{$block['script']}", __FILE__),
                ['wp-blocks', 'wp-editor', 'wp-element', 'wp-components', 'wp-i18n'], // WP core dependencies
                filemtime(plugin_dir_path(__FILE__) . "build/{$block['script']}")
            );

            // Register block styles for both editor and front-end
            if (isset($block['style'])) {
                wp_register_style(
                    $style_handle,
                    plugins_url("build/{$block['style']}", __FILE__),
                    [],
                    filemtime(plugin_dir_path(__FILE__) . "build/{$block['style']}")
                );
            }

            // Block registration arguments
            $args = [
                'editor_script' => $script_handle,
                'style'         => isset($block['style']) ? $style_handle : null,
            ];

            // Set render callback for dynamic blocks
            if ($block['render_callback']) {
                $args['render_callback'] = [__CLASS__, 'renderPPGBlock'];
            }

            // Register the block type
            register_block_type("pentaportfoliogrid/{$name}", $args);
        }
    }

    // Callback function to render dynamic blocks
    public static function renderPPGBlock($attributes, $content) {
        // No need to use wp_unslash or json_decode if objectPositions is already an array
        $objectPositions      = $attributes['objectPositions']     ?? [];
        $paddingLeftRight     = esc_attr( $attributes['paddingLeftRight'] ?? '30px' );
        $paddingTop           = esc_attr( $attributes['paddingTop']       ?? '75px' );
        $paddingBottom        = esc_attr( $attributes['paddingBottom']    ?? '0px' );
        $selectedCategories   = $attributes['selectedCategories']   ?? [];
        $numberOfItems        = intval( $attributes['numberOfItems']    ?? 5 );
        $order                = $attributes['order']                ?? 'DESC';
        $orderBy              = $attributes['orderBy']              ?? 'date';
        $tagName              = esc_html( $attributes['tagName']        ?? 'h4' );
        $textColor            = esc_attr( $attributes['textColor']      ?? '#222' );
    
        // Log the attributes to ensure the data is being passed
        error_log('Attributes: ' . print_r($attributes, true));
    
        ob_start();
        require plugin_dir_path(__FILE__) . '/block/ppg.php'; // Include the block template
        return ob_get_clean();
    }
}    
// Initialize the plugin
PentaPortfolioGrid::init();

require_once plugin_dir_path(__FILE__) . 'js/folio-filter.php';

/**  
 * Enqueue filter-script.js if file scripts.js exists

*/

function load_scripts() {
    // Correctly point to your plugin’s JS file
    wp_enqueue_script(
        'filter-script',
        plugins_url( 'js/filter-script.js', __FILE__ ), // plugin path
        [ 'jquery' ],
        THEME_VERSION, // or null
        true
    );
    wp_localize_script(
        'filter-script', 'ppgAjax', 
        array('ajaxUrl' => admin_url('admin-ajax.php'))
    );

    wp_enqueue_script(
        'ppg-functions',
        plugins_url( 'js/ppg-functions.js', __FILE__ ), // plugin path
        [ 'jquery' ],
        THEME_VERSION, // or null
        true
    );

  
}
add_action( 'wp_enqueue_scripts', 'load_scripts' );

/**
 * Register custom Navigation
 *
 * https://developer.wordpress.org/themes/functionality/navigation-menus/
 */
function register_folio_menu() {
    register_nav_menus(
      array(
        'folioFilter' => __( 'Folio/Work Menu Location' ),
       )
     );
   }
   add_action( 'init', 'register_folio_menu' );


   /**
 * rest API for menus
 * */


 add_action( 'rest_api_init', function () {
    register_rest_route(
        'mytheme/v1',
        '/menu-items/(?P<location>[a-zA-Z0-9_-]+)',
        [
            'methods'             => 'GET',
            'callback'            => 'get_ppgMenu_items',
            'permission_callback' => '__return_true',
            'args'                => [
                'location' => [
                    'required'          => true,
                    'validate_callback' => function( $param ) {
                        return is_string( $param ) && preg_match( '/^[a-zA-Z0-9_-]+$/', $param );
                    },
                ],
            ],
        ]
    );
} );

function get_ppgMenu_items( \WP_REST_Request $request ) {
    $location = $request->get_param( 'location' );

    // Get all menu locations and find the requested one
    $locations = get_nav_menu_locations();
    if ( empty( $locations ) || ! isset( $locations[ $location ] ) ) {
        return new WP_Error(
            'no_menu_location',
            sprintf( 'No menu is registered at location "%s".', esc_html( $location ) ),
            [ 'status' => 404 ]
        );
    }

    $menu_id  = $locations[ $location ];
    $menu_obj = wp_get_nav_menu_object( $menu_id );
    if ( ! $menu_obj || is_wp_error( $menu_obj ) ) {
        return new WP_Error(
            'invalid_menu',
            sprintf( 'Invalid menu object for location "%s".', esc_html( $location ) ),
            [ 'status' => 404 ]
        );
    }

    $items = wp_get_nav_menu_items( $menu_obj->term_id );
    if ( is_wp_error( $items ) ) {
        return new WP_Error(
            'menu_items_error',
            'Error retrieving menu items.',
            [ 'status' => 500 ]
        );
    }

    // If no items, return an empty array
    if ( empty( $items ) ) {
        return rest_ensure_response( [] );
    }

    // Simplify and return the items
    $response = array_map( function( $item ) {
        return [
            'ID'               => $item->ID,
            'title'            => $item->title,
            'url'              => $item->url,
            'object'           => $item->object,
            'object_id'        => intval( $item->object_id ),
            'menu_item_parent' => intval( $item->menu_item_parent ),
        ];
    }, $items );

    return rest_ensure_response( $response );
}


