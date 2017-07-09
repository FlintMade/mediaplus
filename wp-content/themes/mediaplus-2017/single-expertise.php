<?php get_header(); ?>
<div class="case-studies" id="flow">
  <?php while (have_posts()): the_post(); global $post; ?>
    <?php include('case-study-contents.php'); ?>
  <?php endwhile;?>
  <span class="status-bar" role="none">
    <span class="status-bar__value" id="loader-value" role="none"></span>
  </span>
</div>
<?php get_footer(); ?>