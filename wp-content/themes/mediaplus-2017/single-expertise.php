<?php get_header(); ?>
<?php include('includes/sidebar.php'); ?>
<?php while (have_posts()): the_post(); global $post; ?>
  <article class="case-study">

    <!-- INTRO -->
    <?php
      $page_headline = get_field('page_headline');
      $page_intro = get_field('page_intro');
    ?>
    <section class="row row--intro page-section">
      <div class="grid-col">
        <?php if ($page_headline): ?>
          <h1><?php echo $page_headline; ?></h1>
        <?php endif; ?>
        <?php echo $page_intro; ?>
      </div>
    </section>

    <!-- CASE STUDY SECTIONS -->
    <?php if (have_rows('page_sections')): while (have_rows('page_sections')): the_row(); ?>
      
      <?php
        if (get_row_layout() == 'text_section'):
        $section_headline = get_sub_field('section_headline');
        $section_text = get_sub_field('section_text');
      ?>

        <!-- TEXT SECTION -->
        <section class="row row--text page-section">
          <?php if ($section_headline): ?>
            <h2 class="grid-col"><?php echo $section_headline; ?></h2>
          <?php endif; ?>
          <?php if ($section_text): ?>
            <div class="grid-col">
              <?php echo $section_text; ?>
            </div>
          <?php endif; ?>
        </section>

      <?php
        elseif (get_row_layout() == 'pull_quote_section'):
        $pull_quote = get_sub_field('pull_quote');
      ?>

        <!-- PULL QUOTE SECTION -->
        <section class="row row--pull-quote page-section">
          <div class="grid-col">
            <blockquote>
              <?php echo $pull_quote; ?>
            </blockquote>
          </div>
        </section>

      <?php
        elseif (get_row_layout() == 'gallery_section'):
        $images = get_sub_field('images_gallery');
        if ($images):
        $imageCount = count($images);
      ?>

        <!-- GALLERY SECTION -->
        <section class="row row--gallery page-section">
          <div class="gallery">
            <ul class="slides">
              <?php foreach ($images as $image):
                $small = $image['sizes']['mediaplus-gallery-s'];
                $medium = $image['sizes']['mediaplus-gallery-m'];
                $large = $image['sizes']['mediaplus-gallery-l'];
                $xl = $image['sizes']['mediaplus-gallery-xl'];
                $xxl = $image['sizes']['mediaplus-gallery-xxl'];
              ?>
                <li class="slide">
                  <picture>
                    <?php if ($xxl): ?>
                      <source media="(min-width: 1200px)" srcset="<?php echo $xxl; ?>">
                    <?php endif; ?>
                    <?php if ($xl): ?>
                      <source media="(min-width: 800px)" srcset="<?php echo $xl; ?>">
                    <?php endif; ?>
                    <source media="(min-width: 576)" srcset="<?php echo $medium; ?>">
                    <source media="(min-width: 0)" srcset="<?php echo $small; ?>">
                    <img src="<?php echo $medium; ?>" alt="<?php echo $image['alt']; ?>" />
                  </picture>
                </li>
              <?php endforeach; ?>
            </ul>
            <button class="gallery__prev" title="Previous image"></button>
            <button class="gallery__next" title="Next image"></button>
            <p class="gallery__label">Gallery <span class="gallery__index">01</span> / 0<?php echo str_pad($imageCount, 1, '0', STR_PAD_LEFT); ?></p>
          </div>
        </section>
        <?php endif; ?>

        <?php
          elseif (get_row_layout() == 'image_section'):
          $image = get_sub_field('the_image');
          $medium = $image['sizes']['mediaplus-m'];
          $large = $image['sizes']['large'];
          $xl = $image['sizes']['mediaplus-xl'];
          $xxl = $image['sizes']['mediaplus-xxl'];
          $alignment = get_sub_field('image_alignment');
          $alignmentVal = $alignment['value'];
        ?>

        <!-- IMAGE SECTION -->
        <section class="row row--image page-section">
          <div class="grid-col <?php if ($alignmentVal == 'R'): ?>grid-col--right<?php endif; ?>">
            <picture>
              <?php if ($xxl): ?>
                <source media="(min-width: 1200px)" srcset="<?php echo $xxl; ?>">
              <?php endif; ?>
              <?php if ($xl): ?>
                <source media="(min-width: 800px)" srcset="<?php echo $xl; ?>">
              <?php endif; ?>
              <source media="(min-width: 576px)" srcset="<?php echo $large; ?>">
              <source media="(min-width: 0)" srcset="<?php echo $small; ?>">
              <img src="<?php echo $medium; ?>" alt="<?php echo $image['alt']; ?>" />
            </picture>
          </div>
        </section>

        <?php
          elseif (get_row_layout() == 'colorful_block_section'):
          $section_headline = get_sub_field('block_headline');
          $section_subheadline = get_sub_field('block_sub_headline');
          $data_value = get_sub_field('data_value');
          $alignment = get_sub_field('block_alignment');
          $alignmentVal = $alignment['value'];
        ?>

          <!-- COLORFUL BLOCK SECTION -->
          <section class="row row--color-block page-section">
            <div class="grid-col <?php if ($alignmentVal == 'R'): ?>grid-col--right<?php endif; ?> color-block">
              <div class="color-block__text">
                <?php if ($section_headline): ?>
                  <h3 class="color-block__heading"><?php echo $section_headline; ?></h3>
                <?php endif; ?>
                <?php if ($section_subheadline): ?>
                  <p class="h4-variant"><?php echo $section_subheadline; ?></p>
                <?php endif; ?>
              </div>
              <?php if ($data_value): ?>
                <p class="data color-block__feature"><?php echo $section_subheadline; ?></p>
              <?php endif; ?>
            </div>
          </section>

      <?php endif; ?>

    <?php endwhile; endif; ?>

  </article>
<?php endwhile;?>
<?php get_footer(); ?>