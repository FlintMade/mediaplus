<!-- OpenGraph docs: https://developers.facebook.com/docs/sharing/webmasters | Cache bust: https://developers.facebook.com/tools/debug/ -->
<meta property="og:url" content="<?php echo the_permalink(); ?>">
<meta property="og:type" content="website">
<meta property="og:title" content="<?php echo the_title(); ?> | <?php echo get_bloginfo('name'); ?>">
<meta property="og:description" content="<?php echo wp_strip_all_tags(get_the_excerpt());?>">
<meta property="og:site_name" content="<?php echo get_bloginfo('name'); ?>">
<meta property="og:locale" content="en_US">

<!-- Twitter card docs: https://dev.twitter.com/cards/overview | Cache bust: https://cards-dev.twitter.com/validator -->
<meta name="twitter:card" content="summary">
<meta name="twitter:site" content="http://mediaplussea.com">
<meta name="twitter:url" content="<?php echo the_permalink(); ?>">
<meta name="twitter:title" content="<?php echo the_title(); ?> | <?php echo get_bloginfo('name'); ?>">

<?php
  $currentID = get_the_ID();
  $thumb_override = get_field('thumbnail_override', $currentID);
  $thumb = get_the_post_thumbnail_url($currentID, 'mediaplus-thumb-m');
  $banner = get_field('top_banner_image');
?>

<!-- IMAGES -->
<?php if ($thumb_override): ?>
  <meta property="og:image" content="<?php echo $thumb_override['sizes']['mediaplus-thumb-m']; ?>">
  <meta name="twitter:image" content="<?php echo $thumb_override['sizes']['mediaplus-thumb-m']; ?>>
<?php elseif ($thumb): ?>
  <meta property="og:image" content="<?php echo $thumb; ?>">
  <meta name="twitter:image" content="<?php echo $thumb; ?>>
<?php elseif ($banner): ?>
  <meta property="og:image" content="<?php echo $banner['sizes']['mediaplus-thumb-m']; ?>">
  <meta name="twitter:image" content="<?php echo $banner['sizes']['mediaplus-thumb-m']; ?>>
<?php else: ?>
  <meta property="og:image" content="<?php echo get_template_directory_uri(); ?>/assets/images/post-placeholder.png">
  <meta name="twitter:image" content="<?php echo get_template_directory_uri(); ?>/assets/images/post-placeholder.png">
<?php endif; ?>