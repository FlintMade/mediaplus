<?php get_header(); ?>

<?php
  $args = array(
    'post_type' => 'process',
    'post_status' => 'publish',
    'posts_per_page' => -1,
    'order' => 'ASC',
  );
  $items = get_posts($args);
  $itemCount = count($items);
  $i = 0;
?>
<div class="home-intro">
  <div class="timeline-process">
    <ul id="homeText">
      <?php foreach ($items as $item): $i++; ?>
        <li class="timeline-process__item">
          <?php
            $itemText = get_the_title($item->ID);
            echo str_replace(' +', '&nbsp;<svg class="process__icon process__plus" role="none"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="' . get_template_directory_uri() . '/assets/images/sprite.svg#plusBig"></use></svg>', $itemText);
          ?>
          <?php if ($i < $itemCount): ?>
            <svg class="process__icon process__arrow" role="none"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="<?php echo get_template_directory_uri(); ?>/assets/images/sprite.svg#arrowBig"></use></svg>
          <?php endif; ?>
        </li>
      <?php endforeach; ?>
    </ul>
  </div>
  <a class="scroll-home" id="scroll-home" aria-label="View case studies" href="<?php echo get_post_type_archive_link('expertise'); ?>">
    <span>Learn more</span>
    <svg class="arrow" role="none"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/wp-content/themes/mediaplus-2017/assets/images/sprite.svg#arrow"></use></svg>
  </a>
</div>
<div class="case-studies" id="flow">
  <?php
    $args = array(
      'posts_per_page' => 1,
      'post_type' => 'expertise'
    );
    $posts = get_posts($args);
    foreach($posts as $post):
    setup_postdata($post);
  ?>
    <?php include('case-study-contents.php'); ?>
  <?php wp_reset_postdata(); endforeach; ?>
  <span class="status-bar" role="none">
    <span class="status-bar__value" id="loader-value" role="none"></span>
  </span>
</div>

<?php get_footer(); ?>