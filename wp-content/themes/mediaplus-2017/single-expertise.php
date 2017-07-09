<?php get_header(); ?>
<div class="case-studies" id="flow">
  <?php while (have_posts()): the_post(); global $post; ?>
    <?php include('case-study-contents.php'); ?>
  <?php endwhile;?>
</div>
<?php get_footer(); ?>