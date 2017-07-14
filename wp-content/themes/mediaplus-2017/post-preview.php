    <div class="row row--halves row-item post-preview buoyant-parent">
      
      <div class="grid-col post-preview__info">
        <h2 class="post__title">
          <a href="<?php the_permalink(); ?>">
            <?php the_title(); ?>
          </a>
        </h2>
        <?php the_excerpt(); ?>
        <p class="post__date"><?php the_date(); ?></p>
        <a class="more-link post__more" href="<?php the_permalink(); ?>">More info <?php include('svgs/arrow.svg'); ?></a>
      </div>

      <div class="grid-col post-preview__thumb">
        <?php
          $large = get_the_post_thumbnail_url('', 'mediaplus-thumb-l');
          $medium = get_the_post_thumbnail_url('', 'mediaplus-thumb-m');
          if ($medium):
        ?>
          <picture>
            <?php if ($large): ?>
              <source media="(min-width: 1000px)" srcset="<?php echo $large; ?>">
            <?php endif; ?>
            <img src="<?php echo $medium; ?>" alt="" role="none" />
          </picture>
        <?php else: ?>
          <img class="post__placeholder" src="<?php echo get_template_directory_uri(); ?>/svgs/post-placeholder.svg" alt="" role="none" />
        <?php endif; ?>
      </div>

    </div>
