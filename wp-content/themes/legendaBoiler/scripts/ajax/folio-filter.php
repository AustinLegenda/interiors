<?php
/**
 * For filtering posts by category 
 * credit: https://weichie.com/blog/wordpress-filter-posts-with-ajax/
**/ 

add_action('wp_ajax_nopriv_filter', 'filter');
add_action('wp_ajax_filter', 'filter');
function filter() 
{
    $category = $_POST['category'];

    $args = array(
    'posts_per_page' => -1
    );
    if (isset($category) ) {
        $args['category__in'] = array($category);
    }

    $query = new WP_Query($args);
    $response = ''; 

  if($query->have_posts()) {
    while($query->have_posts()) : $query->the_post();
      $response .= get_template_part('inc/snippet-post');
    endwhile;
  } else {
    $response = 'empty';
  }

  echo $response;
  exit;
}
