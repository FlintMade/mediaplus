<?php get_header(); ?>
<?php while (have_posts()): the_post(); global $post; ?>

  <!-- BANNER IMAGE -->
  <?php
    $banner_image = get_field('top_banner_image');
    $large = $banner_image['sizes']['large'];
    $xl = $banner_image['sizes']['mediaplus-xl'];
    $xxl = $banner_image['sizes']['mediaplus-xxl'];
    $xxxl = $banner_image['sizes']['mediaplus-xxxl'];
    $offerings_title = get_field('offerings_title');
    $process_title = get_field('process_title');
  ?>
  <div class="page-section page-banner">
    <picture>
      <?php if ($xxl): ?>
        <source media="(min-width: 1200px)" srcset="<?php echo $xxl; ?>">
      <?php endif; ?>
      <?php if ($xl): ?>
        <source media="(min-width: 800px)" srcset="<?php echo $xl; ?>">
      <?php endif; ?>
      <img src="<?php echo $large; ?>" alt="" role="none" />
    </picture>
  </div>

  <div class="contain page-section">
    <div class="page-section row row--halves">
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
  <section class="page-section row row--flush row--halves team" aria-label="The team">
    <?php
      $args = array(
        'post_type' => 'people',
        'post_status' => 'publish',
        'posts_per_page' => -1,
        'order' => 'menu_order',
      );
      $items = get_posts($args);
      foreach ($items as $item):
      $person_image = get_field('person_image', $item->ID);
      $xl = $person_image['sizes']['mediaplus-person-xl'];
      $large = $person_image['sizes']['large'];
      $email = get_field('person_email', $item->ID);
      $phone = get_field('person_number', $item->ID);
    ?>
      <div class="person grid-col" <?php if ($large){echo 'style="background-image: url(\'' . $large . '\')"';} ?>>
        <div class="person__initial">
          <h3><?php echo $item->post_title; ?></h3>
          <p class="meta"><?php echo get_field('person_title', $item->ID) ?></p>
        </div>

        <button class="meta person__toggle" aria-expanded="false" aria-controls="bio-<?php echo $item->post_name; ?>" data-name="<?php echo $item->post_title; ?>">
          <span aria-label="View more info about <?php echo $item->post_name; ?>">More Info+</span>
        </button>

        <div class="person__more" id="bio-<?php echo $item->post_name; ?>">
          <?php echo wpautop($item->post_content); ?>
          <div class="meta person__bio-meta">
            <?php if ($email): ?>
              <dd class="person__meta-label">Email</dd>
              <dt class="person__meta-value"><?php echo $email; ?></dt>
            <?php endif; ?>
            <?php if ($phone): ?>
              <dd class="person__meta-label">Phone</dd>
              <dt class="person__meta-value"><?php echo $phone; ?></dt>
            <?php endif; ?>
          </div>
        </div>
      </div>
    <?php endforeach; ?>
  </div>

</section>
<?php get_footer(); ?>