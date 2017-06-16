<!-- OpenGraph docs: https://developers.facebook.com/docs/sharing/webmasters | Cache bust: https://developers.facebook.com/tools/debug/ -->
<meta property="og:url" content="<?php echo the_permalink(); ?>">
<meta property="og:type" content="website">
<meta property="og:title" content="<?php echo the_title(); ?> | <?php echo get_bloginfo('name'); ?>">
<meta property="og:image" content="">
<meta property="og:description" content="<?php echo wp_strip_all_tags(get_the_excerpt());?>">
<meta property="og:site_name" content="<?php echo get_bloginfo('name'); ?>">
<meta property="og:locale" content="en_US">

<!-- Twitter card docs: https://dev.twitter.com/cards/overview | Cache bust: https://cards-dev.twitter.com/validator -->
<meta name="twitter:card" content="summary">
<meta name="twitter:site" content="">
<meta name="twitter:url" content="<?php echo the_permalink(); ?>">
<meta name="twitter:title" content="<?php echo the_title(); ?> | <?php echo get_bloginfo('name'); ?>">
<meta name="twitter:image" content="">