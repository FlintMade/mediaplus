    <div class="row row--halves row-item post-preview">
      
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
          $thumbnail = wp_get_attachment_image_src(get_the_post_thumbnail($post_id));
          if ($thumbnail):
        ?>
          <?php echo $thumbnail; ?>
        <?php else: ?>
          <?php include('svgs/post-placeholder.svg'); ?>
        <?php endif; ?>
      </div>

    </div>
