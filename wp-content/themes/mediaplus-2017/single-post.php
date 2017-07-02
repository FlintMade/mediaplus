<?php get_header(); ?>
<?php while (have_posts()): the_post(); global $post; ?>
  <div class="contain row">
    <article class="post-content">
      <h1 class="h2 post-content__title"><?php the_title(); ?></h1>
      <?php the_content(); ?>
    </article>
  </div>
<?php endwhile;?>
<?php get_footer(); ?>