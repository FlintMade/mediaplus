<nav class="site-sidebar closed" id="sidebar-nav" aria-hidden="true">
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
          <a href="<?php echo get_permalink($item->ID); ?>" id="link-<?php echo $item->ID; ?>">
            <?php echo get_the_title($item->ID); ?>
          </a>
        </li>
      <?php endforeach; ?>
    </ul>
    <ul class="case-study-sections">
      <li>
        <a class="sections__expertise" href="<?php echo get_post_type_archive_link('expertise'); ?>">Expertise</a>
      </li>
      <li>
        <a class="sections__home" href="<?php echo get_bloginfo('url'); ?>">Intro</a>
      </li>
    </ul>
  </div>
</nav>