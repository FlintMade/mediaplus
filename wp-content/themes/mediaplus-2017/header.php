<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">
<head>
  <meta charset="<?php bloginfo( 'charset' ); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=Edge">
  <link rel="profile" href="http://gmpg.org/xfn/11">
  <meta name="format-detection" content="telephone=no">
  <?php while (have_posts()): the_post(); ?>
    <meta name="description" content="<?php echo wp_strip_all_tags(get_the_excerpt());?>" />
    <?php include('includes/social-media.php'); ?>
  <?php endwhile; ?>

  <link rel="icon" href="<?php echo get_template_directory_uri(); ?>/assets/images/favicon-16.png" sizes="16x16" type="image/png">
  <link rel="icon" href="<?php echo get_template_directory_uri(); ?>/assets/images/favicon-32.png" sizes="32x32" type="image/png">
  <link rel="icon" href="<?php echo get_template_directory_uri(); ?>/assets/images/favicon-48.png" sizes="48x48" type="image/png">
  <link rel="icon" href="<?php echo get_template_directory_uri(); ?>/assets/images/favicon-62.png" sizes="62x62" type="image/png">
  <link rel="icon" href="<?php echo get_template_directory_uri(); ?>/assets/images/favicon-192.png" sizes="192x192" type="image/png">
  <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
  <header role="banner" class="clear header">
    <div class="header__context">
      <a class="header__brand" href="<?php echo get_site_url(); ?>" title="Media plus">
        <?php if (is_post_type_archive('expertise') || is_singular('expertise') || is_post_type_archive('offerings') || is_singular('offerings')): ?>
          <svg class="m-plus" role="none" title="Media plus">
            <use xlink:href="<?php echo get_template_directory_uri(); ?>/assets/images/sprite.svg#mplus"/>
          </svg>
        <?php else: ?>
          <svg class="full-logo" role="none" >
            <use xlink:href="<?php echo get_template_directory_uri(); ?>/assets/images/sprite.svg#mediaplus"/>
          </svg>
          <svg class="m-plus hidden" role="none" title="Media plus">
            <use xlink:href="<?php echo get_template_directory_uri(); ?>/assets/images/sprite.svg#mplus"/>
          </svg>
        <?php endif; ?>
      </a>
    </div>

    <div class="header__tray">
      <div class="header__tray-content">
        <nav id="js-menu" class="header__menu" role="navigation">
          <?php wp_nav_menu(array('theme_location' => 'header-menu', 'container_id' => 'js-menu-contents')); ?>
        </nav>

        <div class="header__contact" aria-hidden="true">
          <?php
            $footer_phone_email_title = get_field('footer_phone_email_title', 13);
            $phone_number = get_field('phone_number', 13);
            $email_address = get_field('email_address', 13);
          ?>
          <h2><?php echo $footer_phone_email_title; ?></h2>
          <p>
            <?php echo $phone_number; ?><br />
            <a href="mailto:<?php echo $email_address; ?>"><?php echo $email_address; ?></a>
          </p>
        </div>
      </div>
    </div>
  </header>
  <main role="main" class="page-content <?php if (is_front_page()): ?>main--home<?php endif; ?>">