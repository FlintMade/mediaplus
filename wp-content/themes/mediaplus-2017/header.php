<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">
<head>
  <meta charset="<?php bloginfo( 'charset' ); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=Edge">
  <link rel="profile" href="http://gmpg.org/xfn/11">
  <meta name="format-detection" content="telephone=no">
  <?php include('includes/social-media.php'); ?>

  <link rel="icon" href="<?php echo get_template_directory_uri(); ?>/assets/images/favicon-16.png" sizes="16x16" type="image/png">
  <link rel="icon" href="<?php echo get_template_directory_uri(); ?>/assets/images/favicon-32.png" sizes="32x32" type="image/png">
  <link rel="icon" href="<?php echo get_template_directory_uri(); ?>/assets/images/favicon-48.png" sizes="48x48" type="image/png">
  <link rel="icon" href="<?php echo get_template_directory_uri(); ?>/assets/images/favicon-62.png" sizes="62x62" type="image/png">
  <link rel="icon" href="<?php echo get_template_directory_uri(); ?>/assets/images/favicon-192.png" sizes="192x192" type="image/png">
  <?php wp_head(); ?>
</head>

<?php if (is_singular('expertise') || is_singular('offerings')): ?>
  <body <?php body_class('flow single-case-study'); ?>>
<?php elseif (is_front_page()): ?>
  <body <?php body_class('flow'); ?>>
<?php else: ?>
  <body <?php body_class(); ?>>
<?php endif; ?>
  <header role="banner" class="clear header">
    <div class="header__context">
      <a class="header__brand" href="<?php echo get_site_url(); ?>" title="Media plus show case studies" id="logo-btn">
        <span class="logo__text-wrap <?php if (is_singular('expertise') || is_singular('offerings')): ?>abbreviated<?php endif; ?>">
          <svg class="logo__text">
            <use xlink:href="<?php echo get_template_directory_uri(); ?>/assets/images/sprite.svg#media"/>
          </svg>
        </span>
        <svg class="logo__plus">
          <use xlink:href="<?php echo get_template_directory_uri(); ?>/assets/images/sprite.svg#plusBig"/>
        </svg>
        <span class="teaser" role="none presentation"></span>
      </a>
    </div>

    <div class="header__tray">
      <div class="header__tray-content">
        <nav id="js-menu" class="header__menu" role="navigation" aria-hidden="true">
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
  <?php if (is_front_page() || is_singular('expertise') || is_singular('offerings')): ?>
    <?php include('includes/sidebar.php'); ?>
  <?php endif; ?>
  <main role="main" class="page-content <?php if (is_front_page()): ?>main--home<?php endif; ?>">