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
        $objectPositions = $attributes['objectPositions'] ?? [];
    
        // Log the attributes to ensure the data is being passed
        error_log('Attributes: ' . print_r($attributes, true));
        error_log('Object Positions: ' . print_r($objectPositions, true));
    
        ob_start();
        require plugin_dir_path(__FILE__) . '/block/ppg.php'; // Include the block template
        return ob_get_clean();
    }
}    
// Initialize the plugin
PentaPortfolioGrid::init();

/**
 * Register custom REST API endpoint to fetch all public post types with optional filters.
 */
/*
add_action('rest_api_init', 'custom_api_get_all_posts');

function custom_api_get_all_posts()
{
    // Register a custom REST route
    register_rest_route('custom/v1', '/all-posts', [
        'methods' => 'GET',
        'callback' => 'custom_api_get_all_posts_callback',
        'permission_callback' => '__return_true', // Allow public access
        'args' => [
            'categories' => [
                'required' => false,
                'validate_callback' => 'is_valid_category_ids',
            ],
            'per_page' => [
                'required' => false,
                'validate_callback' => fn($param) => is_numeric($param),
                'default' => 10,
            ],
            'orderby' => [
                'required' => false,
                'default' => 'date',
                'validate_callback' => fn($param) => in_array($param, ['date', 'title', 'name', 'modified', 'rand']),
            ],
            'order' => [
                'required' => false,
                'default' => 'desc',
                'validate_callback' => fn($param) => in_array(strtolower($param), ['asc', 'desc']),
            ],
            'page' => [
                'required' => false,
                'validate_callback' => fn($param) => is_numeric($param),
                'default' => 1,
            ],
        ],
    ]);
}

// Validate category IDs passed to the REST API
function is_valid_category_ids($param)
{
    $category_ids = explode(',', $param);
    foreach ($category_ids as $cat_id) {
        if (!is_numeric($cat_id) || !term_exists((int) $cat_id, 'category')) {
            return false;
        }
    }
    return true;
}

// Callback to fetch posts data for the custom REST API endpoint
function custom_api_get_all_posts_callback($request)
{
    $posts_data = [];
    $paged = (int) $request->get_param('page') ?? 1;
    $categories = $request->get_param('categories');
    $per_page = (int) $request->get_param('per_page');
    $orderby = $request->get_param('orderby');
    $order = $request->get_param('order');

    // Fetch all public post types excluding attachments
    $post_types = get_post_types(['public' => true, 'exclude_from_search' => false], 'names');
    unset($post_types['attachment']);

    // Query arguments for fetching posts
    $args = [
        'paged'          => $paged,
        'posts_per_page' => $per_page,
        'post__not_in'   => get_option('sticky_posts'),
        'post_type'      => array_values($post_types),
        'orderby'        => $orderby,
        'order'          => $order,
    ];

    // Filter by categories if provided
    if (!empty($categories)) {
        $args['category__in'] = array_map('intval', explode(',', $categories));
    }

    // Fetch posts using WP_Query
    $posts = get_posts($args);

    // Format post data for the REST response
    foreach ($posts as $post) {
        $posts_data[] = [
            'id'              => $post->ID,
            'slug'            => $post->post_name,
            'type'            => $post->post_type,
            'title'           => $post->post_title,
            'featured_img_src' => has_post_thumbnail($post->ID) ? get_the_post_thumbnail_url($post->ID) : null,
        ];
    }

    // Return the response
    return rest_ensure_response($posts_data);
}
*/