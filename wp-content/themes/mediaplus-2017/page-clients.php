<?php get_header(); ?>
<?php
  while (have_posts()): the_post(); global $post;
  $inpage_title = get_field('in-page_title');
  $offerings_title = get_field('offerings_title');
  $process_title = get_field('process_title');
  $expertise_title = get_field('expertise_title');
?>
<div class="contain">
  <div class="page-section--feature row row--third-two-thirds">
    <div class="grid-col">
      <h1 class="h2"><?php echo $inpage_title; ?></h1>
    </div>
    <div class="grid-col row row--flush row--thirds biz-attributes">

      <!-- OFFERINGS -->
      <section class="grid-col">
        <?php
          $args = array(
            'post_type' => 'offerings',
            'post_status' => 'publish',
            'posts_per_page' => -1,
            'order' => 'menu_order',
          );
          $items = get_posts($args);
        ?>
        <h2 class="h3"><?php echo $offerings_title; ?></h2>
        <ul class="meta-items">
          <?php foreach ($items as $item): ?>
            <li><?php echo get_the_title($item->ID); ?></li>
          <?php endforeach; ?>
        </ul>
      </section>

      <!-- PROCESS ITEMS -->
      <section class="grid-col">
        <?php
          $args = array(
            'post_type' => 'process',
            'post_status' => 'publish',
            'posts_per_page' => -1,
            'order' => 'menu_order',
          );
          $items = get_posts($args);
        ?>
        <h2 class="h3"><?php echo $process_title; ?></h2>
        <ul class="meta-items">
          <?php foreach ($items as $item): ?>
            <li data-attr-slug="<?php echo strtolower(str_replace(' ', '-', str_replace(' + ', '-', get_the_title($item->ID)))); ?>"><?php echo get_the_title($item->ID); ?></li>
          <?php endforeach; ?>
        </ul>
      </section>

      <!-- EXPERTISE ITEMS -->
      <section class="grid-col">
        <?php
          $args = array(
            'post_type' => 'expertise',
            'post_status' => 'publish',
            'posts_per_page' => -1,
            'order' => 'menu_order',
          );
          $items = get_posts($args);
        ?>
        <h2 class="h3"><?php echo $expertise_title; ?></h2>
        <ul class="meta-items">
          <?php foreach ($items as $item): ?>
            <li data-attr-slug="<?php echo strtolower(str_replace(' ', '-', str_replace(' + ', '-', get_the_title($item->ID)))); ?>"><?php echo get_the_title($item->ID); ?></li>
          <?php endforeach; ?>
        </ul>
      </section>
    </div>
  </div>
<?php endwhile;?>

<section class="page-section" aria-label="Client list">
  <?php
    $args = array(
      'post_type' => 'clientele',
      'post_status' => 'publish',
      'posts_per_page' => -1,
      'order' => 'menu_order',
    );
    $items = get_posts($args);
  ?>
  <ul class="meta-items clients">
    <?php foreach ($items as $item): ?>
      <li class="row row--third-two-thirds client">
        <div class="grid-col client__header">
          <?php echo get_the_title($item->ID); ?>
          <button class="row-toggle" aria-label="Expand client details" aria-expanded="false" aria-controls="details-<?php echo $item->post_name; ?>">
            <svg class="row-toggle__expand" role="img" title="Media plus"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="<?php echo get_template_directory_uri(); ?>/assets/images/sprite.svg#expand"></use></svg>
            <svg class="row-toggle__collapse" role="img" title="Media plus"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="<?php echo get_template_directory_uri(); ?>/assets/images/sprite.svg#collapse"></use></svg>
          </button>
        </div>

        <div id="details-<?php echo $item->post_name; ?>" class="grid-col row row--flush row--thirds">

          <!-- CLIENT DATES -->
          <div class="grid-col client__dates">
            <?php echo get_field('dates_of_service', $item->ID); ?>
          </div>

          <!-- CLIENT PROCESS ITEMS -->
          <?php 
            $posts = get_field('process_items', $item->ID);
            if($posts):
          ?>
            <ul class="grid-col client__details-list" data-clientAttr="<?php foreach($posts as $post){echo $post->post_name . ' ';} ?>">
              <?php foreach($posts as $post): ?>
                <?php setup_postdata($post); ?>
                <li><?php the_title(); ?></li>
              <?php endforeach; ?>
            </ul>
            <?php wp_reset_postdata(); ?>
          <?php endif; ?>

          <!-- CLIENT EXPERTISE AREAS -->
          <?php 
            $posts = get_field('relevant_expertise', $item->ID);
            if($posts):
          ?>
            <ul class="grid-col client__details-list" data-clientAttr="<?php foreach($posts as $post){echo $post->post_name . ' ';} ?>">
              <?php foreach($posts as $post): ?>
                <?php setup_postdata($post); ?>
                <li><?php the_title(); ?></li>
              <?php endforeach; ?>
            </ul>
            <?php wp_reset_postdata(); ?>
          <?php endif; ?>
        </div>
      </li>
    <?php endforeach; ?>
  </ul>
</div>
</section>

<?php get_footer(); ?>