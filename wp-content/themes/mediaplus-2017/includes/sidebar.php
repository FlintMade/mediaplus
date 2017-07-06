<nav class="site-sidebar">
  <div class="site-sidebar__content">
    <?php
      $args = array(
        'post_type' => 'expertise',
        'post_status' => 'publish',
        'posts_per_page' => -1,
        'order' => 'menu_order',
      );
      $items = get_posts($args);
    ?>
    <ul class="case-study-list">
      <?php foreach ($items as $item): ?>
        <li>
          <a href="<?php echo get_permalink($item->ID); ?>">
            <?php echo get_the_title($item->ID); ?>
          </a>
        </li>
      <?php endforeach; ?>
    </ul>
  </div>
</nav>