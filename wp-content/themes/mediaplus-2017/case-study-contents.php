<article class="case-study case-study--expertise case-study--current case-study--new" id="cs-<?php echo $post->ID; ?>" data-fullurl="<?php echo get_permalink($post->ID); ?>">
  <div class="row case-study__title">
    <h1><?php the_title(); ?></h1>
  </div>

  <!-- INTRO -->
  <?php
    $page_headline = get_field('page_headline');
    $page_intro = get_field('page_intro');
  ?>
  <section class="row row--intro page-section">
    <div class="grid-col">
      <?php if ($page_headline): ?>
        <h2 class="case-study__headline"><?php echo $page_headline; ?></h2>
      <?php endif; ?>
      <?php echo $page_intro; ?>
    </div>
  </section>

  <!-- CASE STUDY SECTIONS -->
  <?php
    if (have_rows('page_sections')):
    $sectionIndex = 0;
    while (have_rows('page_sections')):
    the_row();
  ?>
    
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
      $i = 1;
    ?>

      <!-- GALLERY SECTION -->
      <section class="row row--gallery page-section">
        <div class="gallery initial">
          <ul class="slides">
            <?php foreach ($images as $image):
              $small = $image['sizes']['mediaplus-gallery-s'];
              $medium = $image['sizes']['mediaplus-gallery-m'];
              $large = $image['sizes']['mediaplus-gallery-l'];
              $xl = $image['sizes']['mediaplus-gallery-xl'];
              $xxl = $image['sizes']['mediaplus-gallery-xxl'];
              if ($image['description']) {
                $image_text = $image['description'];
              } else {
                $image_text = $image['alt'];
              }
            ?>
              <li class="slide <?php if ($i == 1): ?>current<?php endif; ?>" data-slideIndex="<?php echo str_pad($i, 2, '0', STR_PAD_LEFT); ?>" <?php if ($i > 1): ?>aria-hidden="true"<?php endif; ?>>
                <picture>
                  <?php if ($xxl): ?>
                    <source media="(min-width: 1200px)" srcset="<?php echo $xxl; ?>">
                  <?php endif; ?>
                  <?php if ($xl): ?>
                    <source media="(min-width: 1024px)" srcset="<?php echo $xl; ?>">
                  <?php endif; ?>
                  <source media="(min-width: 900px)" srcset="<?php echo $large; ?>">
                  <source media="(min-width: 600px)" srcset="<?php echo $medium; ?>">
                  <source media="(min-width: 0)" srcset="<?php echo $small; ?>">
                  <img src="<?php echo $large; ?>" alt="<?php echo $image_text; ?>" />
                </picture>
              </li>
            <?php $i++; endforeach; ?>
          </ul>
          <?php if ($imageCount > 1): ?>
            <p class="gallery__label">Gallery <span class="gallery__index">01</span> / <?php echo str_pad($imageCount, 2, '0', STR_PAD_LEFT); ?></p>
          <?php endif; ?>
          <button class="gallery__prev" title="Previous image" aria-hidden="true" tabindex="-1">
            <?php include('svgs/arrow-prev.svg'); ?>
          </button>
          <button class="gallery__next" title="Next image" aria-hidden="true" tabindex="-1">
            <?php include('svgs/arrow.svg'); ?>
          </button>
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
      ?>

      <!-- IMAGE SECTION -->
      <section class="row row--image page-section">
        <div class="grid-col <?php if ($alignment == 'Right'): ?>grid-col--right<?php endif; ?>">
          <picture>
            <source media="(min-width: 900px)" srcset="<?php echo $large; ?>">
            <source media="(min-width: 0)" srcset="<?php echo $medium; ?>">
            <?php if ($large): ?>
              <img src="<?php echo $large; ?>" alt="<?php echo $image['alt']; ?>" />
            <?php else: ?>
              <img src="<?php echo $medium; ?>" alt="<?php echo $image['alt']; ?>" />
            <?php endif; ?>
          </picture>
        </div>
      </section>

      <?php
        elseif (get_row_layout() == 'colorful_block_section'):
        $section_headline = get_sub_field('block_headline');
        $section_subheadline = get_sub_field('block_sub_headline');
        $alignment = get_sub_field('block_alignment');
        $data_value = get_sub_field('data_value');
        $block_image = get_sub_field('transparent_image')['sizes']['large'];
      ?>

        <!-- COLORFUL BLOCK SECTION -->
        <section class="row row--color-block page-section">
          <div class="grid-col <?php if ($alignment == 'Right'): ?>grid-col--right<?php endif; ?> color-block <?php if ($data_value): ?>color-block--data<?php endif; ?>">
            <div class="color-block__text">
              <?php if ($section_headline): ?>
                <h3 class="color-block__heading"><?php echo $section_headline; ?></h3>
              <?php endif; ?>
              <?php if ($section_subheadline): ?>
                <p class="h4-variant color-block__subheading"><?php echo $section_subheadline; ?></p>
              <?php endif; ?>
            </div>
            <?php if ($data_value): ?>
              <p class="data color-block__feature">
                <span class="data__<?php echo strlen($data_value); ?>"><?php echo $data_value; ?></span>
              </p>
            <?php endif; ?>
            <?php if ($block_image): ?>
              <img src="<?php echo $block_image; ?>" alt="" role="none presentation" />
            <?php endif; ?>
          </div>
        </section>

      <?php
        elseif (get_row_layout() == 'lists_section'):
        $list_1_headline = get_sub_field('list_1_headline');
        $list_1 = get_sub_field('list_1');
        $list_2_headline = get_sub_field('list_2_headline');
        $list_2 = get_sub_field('list_2');
      ?>

        <!-- LISTS SECTION -->
        <section class="row row--lists page-section">
          <div class="lists-wrapper expanded" id="lists-<?php echo $sectionIndex; ?>" aria-hidden="true">
            <?php if ($list_1): ?>
              <div class="case-study__list">
                <h3><?php echo $list_1_headline; ?></h3>
                <?php echo $list_1; ?>
              </div>
            <?php endif; ?>
            <?php if ($list_2): ?>
              <div class="case-study__list">
                <h3><?php echo $list_2_headline; ?></h3>
                <?php echo $list_2; ?>
              </div>
            <?php endif; ?>
          </div>
          <button class="toggle-lists" aria-hidden="true" aria-controls="lists-<?php echo $sectionIndex; ?>" aria-expanded="false">View all+</button>
        </section>

      <?php
        elseif (get_row_layout() == 'cta_section'):
        $cta_text = get_sub_field('cta_text');
        $cta_link = get_sub_field('cta_link');
      ?>

        <!-- CTA SECTION -->
        <section class="row row--cta page-section">
          <?php if ($cta_text && $cta_link): ?>
            <a class="cta-link" href="<?php echo $cta_link; ?>">
              <span class="cta-link__text"><?php echo $cta_text; ?></span>
              <?php include('svgs/arrow.svg'); ?>
            </a>
          <?php endif; ?>
        </section>

    <?php endif; ?>

  <?php $sectionIndex++; endwhile; endif; ?>

</article>

<!-- LINK TO NEXT CASE STUDY -->
<?php do_action('next_case_study'); ?>