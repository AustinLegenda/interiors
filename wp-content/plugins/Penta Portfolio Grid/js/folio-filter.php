<?php
add_action('wp_ajax_nopriv_filter_folio', 'filter_folio');
add_action('wp_ajax_filter_folio', 'filter_folio');

function filter_folio()
{
    error_log('filter_folio called; category = ' . print_r($_POST['category'], true));

  $category = $_POST['category'];

  $args = array(
    'post_type' => 'any',
                'order' => 'DESC',
                'posts_per_page' => -1
  );

  if (!empty($category) && $category !== 'all') {
    $args['cat'] = (int) $category;
  }

  $query = new WP_Query($args);

  ob_start();
  if ($query->have_posts()) {
    $x = 0;

 
    echo '<div class="folio-container nav-toggle">';
    while ($query->have_posts()) {
      $query->the_post();
      $x++;
      echo '<div class="item-folio">';
      require(get_template_directory() . '/inc/snippet-folio.php');
      echo '</div>';
      if ($x % 5 === 0) {
        echo '</div><div class="folio-container nav-toggle">';
      }
    }
    echo '</div>';
  
  }
  $content = ob_get_clean();
  echo $content;
  wp_reset_postdata();
  wp_die();
}
