<?php get_header(); ?>
<?php while (have_posts()): the_post(); global $post; ?>

  <!-- BANNER IMAGE -->
  <?php
    $banner_image = get_field('top_banner_image');
    $small = $banner_image['sizes']['mediaplus-s'];
    $medium = $banner_image['sizes']['medium'];
    $large = $banner_image['sizes']['large'];
    $xl = $banner_image['sizes']['mediaplus-xl'];
    $xxl = $banner_image['sizes']['mediaplus-xxl'];
    $offerings_title = get_field('offerings_title');
    $process_title = get_field('process_title');
  ?>
  <div class="page-banner">
    <picture>
      <?php if ($xxl): ?>
        <source media="(min-width: 1200px)" srcset="<?php echo $xxl; ?>">
      <?php endif; ?>
      <?php if ($xl): ?>
        <source media="(min-width: 800px)" srcset="<?php echo $xl; ?>">
      <?php endif; ?>
      <?php if ($large): ?>
        <source media="(min-width: 640px)" srcset="<?php echo $large; ?>">
      <?php endif; ?>
      <source media="(min-width: 480px)" srcset="<?php echo $medium; ?>">
      <source media="(min-width: 0)" srcset="<?php echo $small; ?>">
      <img src="<?php echo $large; ?>" alt="" role="none" />
    </picture>
  </div>

  <div class="contain">
    <div class="row row--halves">
      <div class="grid-col row row--flush row--thirds">

        <!-- OFFERINGS -->
        <?php
          $args = array(
            'post_type' => 'offerings',
            'post_status' => 'publish',
            'posts_per_page' => -1,
            'order' => 'menu_order',
          );
          $items = get_posts($args);
        ?>
        <div class="grid-col">
          <h3><?php echo $offerings_title; ?></h3>
          <ul class="meta-items">
            <?php foreach ($items as $item): ?>
              <li><?php echo get_the_title($item->ID); ?></li>
            <?php endforeach; ?>
          </ul>
        </div>

        <!-- PROCESS ITEMS -->
        <?php
          $args = array(
            'post_type' => 'process',
            'post_status' => 'publish',
            'posts_per_page' => -1,
            'order' => 'menu_order',
          );
          $items = get_posts($args);
        ?>
        <div class="grid-col">
          <h3><?php echo $process_title; ?></h3>
          <ul class="meta-items">
            <?php foreach ($items as $item): ?>
              <li><?php echo get_the_title($item->ID); ?></li>
            <?php endforeach; ?>
          </ul>
        </div>
      </div>

      <!-- PAGE DESCRIPTION -->
      <section class="grid-col">
        <?php the_content(); ?>
      </section>

    </div>
  <?php endwhile;?>

  <!-- TEAM MEMBERS -->
  <section class="row row--flush row--halves team" aria-label="The team">
    <?php
      $args = array(
        'post_type' => 'people',
        'post_status' => 'publish',
        'posts_per_page' => -1,
        'order' => 'menu_order',
      );
      $items = get_posts($args);
      foreach ($items as $item):
    ?>
      <div class="person grid-col">
        <h3><?php echo $item->post_title; ?></h3>
        <p><?php echo get_field('person_title', $item->ID) ?></p>
        <div class="person__bio">
          <?php echo wpautop($item->post_content); ?>
        </div>
      </div>
    <?php endforeach; ?>
  </div>

</section>
<?php get_footer(); ?>