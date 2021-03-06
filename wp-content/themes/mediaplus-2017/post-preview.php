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
          $thumbnail_override = get_field('thumbnail_override', $item->ID);
          if ($thumbnail_override) {
            $large = $thumbnail_override['sizes']['mediaplus-thumb-l'];
            $medium = $thumbnail_override['sizes']['mediaplus-thumb-m'];
          } else {
            $large = get_the_post_thumbnail_url('', 'mediaplus-thumb-l');
            $medium = get_the_post_thumbnail_url('', 'mediaplus-thumb-m');
          }
          if ($medium):
        ?>
          <picture>
            <?php if ($large): ?>
              <source media="(min-width: 1500px)" srcset="<?php echo $large; ?>">
            <?php endif; ?>
            <img src="<?php echo $medium; ?>" alt="" role="none presentation" />
          </picture>
        <?php else: ?>
          <img class="post__placeholder" src="<?php echo get_template_directory_uri(); ?>/svgs/post-placeholder.svg" alt="" role="none presentation" />
        <?php endif; ?>
      </div>

    </div>
