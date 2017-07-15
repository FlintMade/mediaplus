<?php get_header(); ?>
<?php while (have_posts()): the_post(); global $post; ?>

  <!-- BANNER IMAGE -->
  <?php
    $large = get_the_post_thumbnail_url('', 'large');
    $xl = get_the_post_thumbnail_url('', 'mediaplus-xl');
    $xxl = get_the_post_thumbnail_url('', 'mediaplus-xxl');
    $xxxl = get_the_post_thumbnail_url('', 'mediaplus-xxxl');

    if ($large):
    // 2 nested divs needed to prevent horizontal overflow
  ?>
    <div class="page-section page-banner">
      <div class="page-banner__media">
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
    </div>
  <?php endif; ?>

  <!-- POST CONTENT -->
  <article class="page-section contain row post-content">
    <h1 class="h2 post-content__title"><?php the_title(); ?></h1>
    <?php the_content(); ?>
  </article>
<?php endwhile;?>
<?php get_footer(); ?>