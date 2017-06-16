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
  <header role="banner" class="site-header">
    <?php wp_nav_menu( array( 'theme_location' => 'header-menu', 'container_class' => 'site-header__menu', 'container_id' => 'header-menu' ) ); ?>
  </header>
  <main role="main">