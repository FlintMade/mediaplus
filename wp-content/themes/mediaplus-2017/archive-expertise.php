<?php
  $args = array(
    'posts_per_page' => 1,
    'post_type' => 'expertise'
  );
  $posts = get_posts($args);
  $redirect_url = get_permalink($posts[0]->ID);
  wp_redirect($redirect_url);
  exit;
?>