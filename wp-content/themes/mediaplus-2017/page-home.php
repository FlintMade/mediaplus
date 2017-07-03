<?php get_header(); ?>

<?php
  $args = array(
    'post_type' => 'process',
    'post_status' => 'publish',
    'posts_per_page' => -1,
    'order' => 'ASC',
  );
  $items = get_posts($args);
?>
<ul class="h1">
  <?php foreach ($items as $item): ?>
    <li>
      <?php
        $itemText = get_the_title($item->ID);
        echo str_replace(' +', '&nbsp;<svg class="process__icon process__plus" role="none"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="' . get_template_directory_uri() . '/assets/images/sprite.svg#plusBig"></use></svg>', $itemText);
      ?>
      <svg class="process__icon process__arrow" role="none"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="<?php echo get_template_directory_uri(); ?>/assets/images/sprite.svg#arrowBig"></use></svg>
    </li>
  <?php endforeach; ?>
</ul>

<?php get_footer(); ?>