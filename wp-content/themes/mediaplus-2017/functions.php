<?php
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function chdogs_setup() {
	/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support( 'title-tag' );

	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
	 */
	add_theme_support( 'post-thumbnails' );

	add_image_size('chdogs-xl', 1200, false);
	add_image_size('chdogs-xxl', 1600, false);

	// Enable shortcodes
	//add_filter('widget_text', 'do_shortcode');

	// This theme uses wp_nav_menu()
function register_my_menu() {
  register_nav_menu('header-menu',__( 'Header Menu' ));
}
add_action( 'init', 'register_my_menu' );

// Add search form support
function wpdocs_after_setup_theme() {
    add_theme_support( 'html5', array( 'search-form' ) );
}
add_action( 'after_setup_theme', 'wpdocs_after_setup_theme' );

	/*
	 * Enable support for Post Formats.
	 *
	 * See: https://codex.wordpress.org/Post_Formats
	 */
	add_theme_support( 'post-formats', array(
		'aside',
		'image',
		'video',
		'quote',
		'link',
		'gallery',
		'audio',
	) );

	// Add theme support for Custom Logo.
	add_theme_support( 'custom-logo', array(
		'width'       => 250,
		'height'      => 250,
		'flex-width'  => true,
	) );

	// Add theme support for selective refresh for widgets.
	add_theme_support( 'customize-selective-refresh-widgets' );

}
add_action( 'after_setup_theme', 'chdogs_setup' );

/**
 * Enqueue scripts and styles.
 */
function chdogs_scripts() {
	// Theme stylesheets
	wp_enqueue_style('chdogs-fonts', 'https://fonts.googleapis.com/css?family=PT+Sans:400,400i,700|Yrsa:500');
	wp_enqueue_style('chdogs-style', get_stylesheet_uri(), array(), '02.17.17.02');
	wp_enqueue_style('chdogs-print', get_theme_file_uri('/assets/css/print.css'), array(), false, 'print');

	// Old IE overrides
	wp_enqueue_style('chdogs-ie', get_theme_file_uri('/assets/css/old-ie.css'));
	wp_style_add_data('chdogs-ie', 'conditional', 'lt IE 9');

	// Load the html5 shiv.
	wp_enqueue_script('html5', get_theme_file_uri( '/assets/js/html5.js' ), array(), false, false);
	wp_script_add_data('html5', 'conditional', 'lt IE 9');

	// Theme scripts
	// wp_enqueue_script('chdogs-scripts', get_theme_file_uri( '/assets/js/scripts.js' ), array(), false, true);
	wp_enqueue_script('chdogs-scripts', get_theme_file_uri( '/assets/js/scripts.min.js' ), array(), false, true);

	// Fluid videos
	if (!is_page(array(2, 17, 76, 79))) {
		wp_enqueue_script('chdogs-fluidvideos', get_theme_file_uri( '/assets/js/fluidvids.js' ), array(), false, true);
	}

	// Remove silly WP stuff
	remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
	remove_action( 'wp_print_styles', 'print_emoji_styles' );
}
add_action( 'wp_enqueue_scripts', 'chdogs_scripts' );

// Excerpt ellipsis
function new_excerpt_more($more) {
    return '&hellip;';
}
add_filter('excerpt_more', 'new_excerpt_more');