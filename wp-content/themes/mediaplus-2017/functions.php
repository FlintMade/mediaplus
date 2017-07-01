<?php
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function mediaplus_setup() {
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

	add_image_size('mediaplus-xl', 1200, false);
	add_image_size('mediaplus-xxl', 1600, false);

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
add_action( 'after_setup_theme', 'mediaplus_setup' );

/**
 * Enqueue scripts and styles.
 */
function mediaplus_scripts() {
	// Theme stylesheets
	wp_enqueue_style('mediaplus-style', get_stylesheet_uri(), array());

	// Load the html5 shiv.
	wp_enqueue_script('html5', get_theme_file_uri('/assets/js/html5.js'), array(), false, false);
	wp_script_add_data('html5', 'conditional', 'lt IE 9');

	// Load theme scripts
	wp_enqueue_script('scripts', get_theme_file_uri('/assets/js/scripts.js'), array(), false, true);

	// Load page-specific scripts
	if (is_page(11)) {
		wp_enqueue_script('clientScripts', get_theme_file_uri('/assets/js/clients.js'), array('scripts'), false, true);
	}

	// Remove silly WP stuff
	remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
	remove_action( 'wp_print_styles', 'print_emoji_styles' );
}
add_action( 'wp_enqueue_scripts', 'mediaplus_scripts' );

// Excerpt ellipsis
function new_excerpt_more($more) {
    return '&hellip;';
}
add_filter('excerpt_more', 'new_excerpt_more');