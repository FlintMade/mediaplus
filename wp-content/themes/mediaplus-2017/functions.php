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

	add_image_size('mediaplus-m', 480, false);
	
	add_image_size('mediaplus-xl', 1200, false);
	add_image_size('mediaplus-xxl', 1600, false);
	add_image_size('mediaplus-xxxl', 2048, false);

	add_image_size('mediaplus-gallery-s', 480, 270, true);
	add_image_size('mediaplus-gallery-m', 600, 337, true);
	add_image_size('mediaplus-gallery-l', 900, 506, true);
	add_image_size('mediaplus-gallery-xl', 1200, 675, true);
	add_image_size('mediaplus-gallery-xxl', 1600, 900, true);

	add_image_size('mediaplus-person-xl', 1000, false);

	add_image_size('mediaplus-thumb-l', 900, 530, true);
	add_image_size('mediaplus-thumb-m', 600, 353, true);

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
}
add_action( 'after_setup_theme', 'mediaplus_setup' );

/*
 *	SCRIPTS AND STYLES
 *	---------------------------------------------
 */

// Remove WP jQuery
function wpdocs_dequeue_script() {
	wp_dequeue_script('jquery-ui-core');
	wp_dequeue_script('jquery');
}
add_action('wp_print_scripts', 'wpdocs_dequeue_script', 100);

function mediaplus_scripts() {

	// Cache busting for all scripts that have or will change
	$versionString = '07.13.17.04';

	// Remove silly WP stuff
	remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
	remove_action( 'wp_print_styles', 'print_emoji_styles' );

	// Theme stylesheets
	wp_enqueue_style('mediaplus-style', get_stylesheet_uri(), array(), $versionString);

	// Load the html5 shiv.
	wp_enqueue_script('html5', get_theme_file_uri('/assets/js/html5.js'), array(), false, false);
	wp_script_add_data('html5', 'conditional', 'lt IE 9');

	// Load theme scripts
	wp_enqueue_script('scripts', get_theme_file_uri('/assets/js/scripts.js'), array(), $versionString, true);

	// Load page-specific scripts
	if (is_front_page() || is_singular('expertise') || is_home()) {
		wp_enqueue_script('mediaPlusjQuery', get_theme_file_uri('/assets/js/jquery-3.2.1.min.js'), array(), false, true);
	}

	if (is_front_page() || is_singular('expertise')) {
		wp_enqueue_script('caseStudyScripts', get_theme_file_uri('/assets/js/casestudy.js'), array('scripts', 'mediaPlusjQuery'), $versionString, true);
	}

	if (is_front_page()) {
		wp_enqueue_script('homeScripts', get_theme_file_uri('/assets/js/home.js'), array('scripts', 'mediaPlusjQuery', 'caseStudyScripts'), $versionString, true);
	}

	if (is_page(7)) {
		wp_enqueue_script('aboutScripts', get_theme_file_uri('/assets/js/about.js'), array('scripts'), $versionString, true);
	}

	if (is_page(11)) {
		wp_enqueue_script('clientScripts', get_theme_file_uri('/assets/js/clients.js'), array('scripts'), $versionString, true);
	}

	if (is_home()) {
		wp_enqueue_script('journalIndexScripts', get_theme_file_uri('/assets/js/journal-index.js'), array('scripts', 'mediaPlusjQuery'), $versionString, true);
	}

	if (is_singular('post')) {
		wp_enqueue_script('fluidVids', get_theme_file_uri('/assets/js/fluidvids.js'), array(), false, true);
	}

	// Set up loading next case study
	global $wp_query;
	wp_localize_script('homeScripts', 'firstCaseStudy', array(
		'ajaxurl' => admin_url('admin-ajax.php')
	));

	wp_localize_script('caseStudyScripts', 'loadNextCaseStudy', array(
		'ajaxurl' => admin_url('admin-ajax.php')
	));

	// Set up journal pagination
	wp_localize_script('journalIndexScripts', 'ajaxpagination', array(
		'ajaxurl' => admin_url('admin-ajax.php'),
		'query_vars' => json_encode($wp_query->query)
	));
}
add_action( 'wp_enqueue_scripts', 'mediaplus_scripts' );

/*
 *	LOAD FIRST CASE STUDY
 *	For background: https://www.smashingmagazine.com/2011/10/how-to-use-ajax-in-wordpress/
 *	https://codex.wordpress.org/AJAX_in_Plugins#Ajax_on_the_Viewer-Facing_Side
 *	--------------------------------------------------------------------------------------
 */

add_action( 'wp_ajax_nopriv_first_case_study', 'first_case_study');
add_action( 'wp_ajax_first_case_study', 'first_case_study');

function first_case_study() {
	$query_vars = json_decode(stripslashes( $_POST['query_vars'] ), true);
	$query_vars['post_type'] = 'expertise';
	$query_vars['posts_per_page'] = 1;
	$posts = new WP_Query($query_vars);
	$GLOBALS['wp_query'] = $posts;

	add_filter('editor_max_image_size', 'case_study_size_override');

	if ($posts->have_posts()) { 
		while ($posts->have_posts()) { 
			$posts->the_post();
			get_template_part('case-study-contents');
		}
	}

	remove_filter('editor_max_image_size', 'case_study_size_override');
	die();
}

function case_study_size_override() {
  return array(2048);
}

/*
 *	LOAD NEXT CASE STUDY
 *	For background: https://www.smashingmagazine.com/2011/10/how-to-use-ajax-in-wordpress/
 *	https://codex.wordpress.org/AJAX_in_Plugins#Ajax_on_the_Viewer-Facing_Side
 *	--------------------------------------------------------------------------------------
 */

add_action( 'wp_ajax_nopriv_next_case_study', 'next_case_study');
add_action( 'wp_ajax_next_case_study', 'next_case_study');

function next_case_study() {
	$query_vars = json_decode(stripslashes( $_POST['query_vars'] ), true);
	$query_vars['post_type'] = 'expertise';

	$query_vars['p'] = $_POST['p'];
	$posts = new WP_Query($query_vars);
	$GLOBALS['wp_query'] = $posts;

	add_filter('editor_max_image_size', 'case_study_size_override');

	if ($posts->have_posts()) { 
		while ($posts->have_posts()) { 
			$posts->the_post();
			get_template_part('case-study-contents');
		}
	}

	remove_filter('editor_max_image_size', 'case_study_size_override');
	die();
}

/*
 *	EXCERPTS
 *	---------------------------------------------
 */

// Excerpt ellipsis
function new_excerpt_more($more) {
    return '&hellip;';
}
add_filter('excerpt_more', 'new_excerpt_more');

/**
 * Filter the except length to 20 words.
 *
 * @param int $length Excerpt length.
 * @return int (Maybe) modified excerpt length.
 */
function new_excerpt_length($length) {
    return 42;
}
add_filter('excerpt_length', 'new_excerpt_length', 999);

/*
 *	LOAD MORE POSTS
 *	For background: https://premium.wpmudev.org/blog/load-posts-ajax/
 *	-----------------------------------------------------------------
 */

add_action('wp_ajax_nopriv_ajax_pagination', 'mediaplus_ajax_pagination');
add_action('wp_ajax_ajax_pagination', 'mediaplus_ajax_pagination');

function mediaplus_ajax_pagination() {
	$query_vars = json_decode(stripslashes( $_POST['query_vars'] ), true);
	$query_vars['paged'] = $_POST['page'];
	$query_vars['post_status'] = 'publish';
	$posts = new WP_Query($query_vars);
	$GLOBALS['wp_query'] = $posts;

	add_filter('editor_max_image_size', 'journal_size_override');

	if($posts->have_posts()) { 
		while ( $posts->have_posts() ) { 
			$posts->the_post();
			get_template_part('post-preview');
		}
	}
	remove_filter('editor_max_image_size', 'journal_size_override');

	die();
}

function journal_size_override() {
  return array(900, 530);
}

/*
 *	REMOVE PARAGRAPH TAGS FROM AROUND POST MEDIA
 *	-----------------------------------------------------------------
 */

function filter_ptags_on_images($content) {
  $content = preg_replace('/<p>\s*(<a .*>)?\s*(<img .* \/>)\s*(<\/a>)?\s*<\/p>/iU', '\1\2\3', $content);
  // $content = preg_replace('/<p>\s*(<script.*>*.<\/script>)\s*<\/p>/iU', '\1', $content);
  $content = preg_replace('/<p>\s*(<iframe.*>*.<\/iframe>)\s*<\/p>/iU', '\1', $content);
  return $content;
}
add_filter('the_content', 'filter_ptags_on_images');

/*
 *	FLUSH! THOSE! BUFFERS!
 *	And fix a PHP error
 *	-----------------------------------------------------------------
 */

remove_action('shutdown', 'wp_ob_end_flush_all', 1);

function flush_no_mediaplus() {
	$levels = ob_get_level();
	for ( $i = 0; $i < $levels - 1; $i++ )
		ob_end_flush();
}

add_action('shutdown', 'flush_no_mediaplus', 1, 0);