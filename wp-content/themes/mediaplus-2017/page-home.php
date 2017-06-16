<?php get_header(); ?>

<?php
  $args = array(
    'post_type' => 'process',
    'post_status' => 'publish',
    'posts_per_page' => -1,
    'order' => 'menu_order',
  );
  $items = get_posts($args);
?>
<ul class="timeline-process">
  <?php foreach ($items as $item): ?>
    <li><?php echo get_the_title($item->ID); ?></li>
  <?php endforeach; ?>
</ul>

<?php get_footer(); ?>