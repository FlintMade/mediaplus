<?php get_header(); ?>
<div class="home-intro">
  <div class="home-intro__text fade" id="homeText">
    <?php if (have_rows('intro_lines')): while (have_rows('intro_lines')): the_row(); ?>
      <p>
        <span class="home-intro__line"><?php echo get_sub_field('intro_line'); ?></span>
        <span class="overlay" role="none presentation"></span>
      </p>
    <?php endwhile; endif; ?>
  </div>
  <a class="scroll-home" id="scroll-home" aria-label="View case studies" href="<?php echo get_post_type_archive_link('expertise'); ?>">
    <span>Learn more</span>
    <?php include('svgs/arrow.svg'); ?>
  </a>
</div>
<div class="case-studies" id="flow">
  <span class="status-bar" role="none presentation">
    <span class="status-bar__value" id="loader-value" role="none presentation"></span>
  </span>
</div>

<?php get_footer(); ?>