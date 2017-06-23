<?php get_header(); ?>
<?php
  while (have_posts()): the_post(); global $post;
  $inpage_title = get_field('in-page_title');
  $offerings_title = get_field('offerings_title');
  $process_title = get_field('process_title');
  $expertise_title = get_field('expertise_title');
?>
<div class="contain">
  <div class="row row--third-two-thirds">
    <div class="grid-col">
      <h1><?php echo $inpage_title; ?></h1>
    </div>
    <div class="grid-col">

      <!-- OFFERINGS -->
      <section>
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
      <section>
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
            <li><?php echo get_the_title($item->ID); ?></li>
          <?php endforeach; ?>
        </ul>
      </section>

      <!-- EXPERTISE ITEMS -->
      <section>
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
            <li><?php echo get_the_title($item->ID); ?></li>
          <?php endforeach; ?>
        </ul>
      </section>
    </div>
  </div>
<?php endwhile;?>

<section aria-label="Client list">
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
        <div class="grid-col">
          <?php echo get_the_title($item->ID); ?>
          <button>Expand details</button>
          <?php echo get_field('dates_of_service', $item->ID); ?>
        </div>
        <div class="grid-col">
          <?php 
            $posts = get_field('process_items', $item->ID);
            if($posts):
          ?>
            <ul>
              <?php foreach($posts as $post): ?>
                <?php setup_postdata($post); ?>
                <li><?php the_title(); ?></li>
              <?php endforeach; ?>
            </ul>
            <?php wp_reset_postdata(); ?>
          <?php endif; ?>

          <?php 
            $posts = get_field('relevant_expertise', $item->ID);
            if($posts):
          ?>
            <ul>
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