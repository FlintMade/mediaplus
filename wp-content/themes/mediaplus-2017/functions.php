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
 *	Files must also be registered in Grunt build
 *	process via Gruntfile.js in the root of the
 *	project
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
	$versionString = '07.15.17.07';

	// Remove silly WP stuff
	remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
	remove_action( 'wp_print_styles', 'print_emoji_styles' );

	// Load the html5 shiv.
	wp_enqueue_script('html5', get_theme_file_uri('/assets/js/html5.js'), array(), false, false);
	wp_script_add_data('html5', 'conditional', 'lt IE 9');

	// Load theme scripts on pages w/o page-specific scripts
	if (is_page(13) || is_404() || is_singular('post')) {
		wp_enqueue_script('scripts', get_theme_file_uri('/assets/js/compiled/scripts.min.js'), array(), $versionString, true);
	}

	// Load jQuery when needed
	if (is_front_page() || is_singular('expertise') || is_home()) {
		wp_enqueue_script('mediaPlusjQuery', get_theme_file_uri('/assets/js/jquery-3.2.1.min.js'), array(), false, true);
	}

	// Load page specific scripts and styles
	if (is_front_page()) {
		wp_enqueue_style('homeStyles', get_theme_file_uri('/assets/css/home.css'), array(), $versionString);
		wp_enqueue_script('homeScripts', get_theme_file_uri('/assets/js/compiled/home.min.js'), array('mediaPlusjQuery'), $versionString, true);
	}

	if (is_singular('expertise')) {
		wp_enqueue_style('casestudyStyles', get_theme_file_uri('/assets/css/casestudy.css'), array(), $versionString);
		wp_enqueue_script('casestudyScripts', get_theme_file_uri('/assets/js/compiled/casestudy.min.js'), array('mediaPlusjQuery'), $versionString, true);
	}

	if (is_page(7)) {
		wp_enqueue_style('aboutStyles', get_theme_file_uri('/assets/css/about.css'), array(), $versionString);
		wp_enqueue_script('aboutScripts', get_theme_file_uri('/assets/js/compiled/about.min.js'), array(), $versionString, true);
	}

	if (is_page(11)) {
		wp_enqueue_style('clientStyles', get_theme_file_uri('/assets/css/clients.css'), array(), $versionString);
		wp_enqueue_script('clientScripts', get_theme_file_uri('/assets/js/compiled/clients.min.js'), array(), $versionString, true);
	}

	if (is_page(13)) {
		wp_enqueue_style('contactStyles', get_theme_file_uri('/assets/css/contact.css'), array(), $versionString);
	}

	if (is_home()) {
		wp_enqueue_style('journalStyles', get_theme_file_uri('/assets/css/journal.css'), array(), $versionString);
		wp_enqueue_script('journalIndexScripts', get_theme_file_uri('/assets/js/compiled/journal-index.min.js'), array('mediaPlusjQuery'), $versionString, true);
	}

	if (is_singular('post')) {
		wp_enqueue_style('journalStyles', get_theme_file_uri('/assets/css/journal.css'), array(), $versionString);
		wp_enqueue_script('fluidVids', get_theme_file_uri('/assets/js/fluidvids.js'), array(), false, true);
	}

	if (is_404()) {
		wp_enqueue_style('errorStyles', get_theme_file_uri('/assets/css/errors.css'), array(), $versionString);
	}

	// Set up loading next case study
	global $wp_query;
	wp_localize_script('homeScripts', 'firstCaseStudy', array(
		'ajaxurl' => admin_url('admin-ajax.php')
	));

	wp_localize_script('homeScripts', 'loadNextCaseStudy', array(
		'ajaxurl' => admin_url('admin-ajax.php')
	));

	wp_localize_script('casestudyScripts', 'loadNextCaseStudy', array(
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
 *	SET POST MEDIA IMAGE DEFAULTS
 *	-----------------------------------------------------------------
 */

function mediaplus_image_defaults() {
	update_option('image_default_link_type', 'none');
	update_option('image_default_size', 'large');
}
add_action('after_setup_theme', 'mediaplus_image_defaults');

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
 *	SET UP OWN POST GALLERY MARKUP
 *	-----------------------------------------------------------------
 */

remove_shortcode('gallery', 'gallery_shortcode');

function mediaplus_gallery_shortcode($attr) {
	$post = get_post();

	static $instance = 0;
	$instance++;

	if ( ! empty( $attr['ids'] ) ) {
			// 'ids' is explicitly ordered, unless you specify otherwise.
			if ( empty( $attr['orderby'] ) ) {
					$attr['orderby'] = 'post__in';
			}
			$attr['include'] = $attr['ids'];
	}

	/**
		* Filters the default gallery shortcode output.
		*
		* If the filtered output isn't empty, it will be used instead of generating
		* the default gallery template.
		*
		* @since 2.5.0
		* @since 4.2.0 The `$instance` parameter was added.
		*
		* @see gallery_shortcode()
		*
		* @param string $output   The gallery output. Default empty.
		* @param array  $attr     Attributes of the gallery shortcode.
		* @param int    $instance Unique numeric ID of this gallery shortcode instance.
		*/
	$output = apply_filters( 'post_gallery', '', $attr, $instance );
	if ( $output != '' ) {
			return $output;
	}

	$html5 = current_theme_supports( 'html5', 'gallery' );
	$atts = shortcode_atts( array(
			'order'      => 'ASC',
			'orderby'    => 'menu_order ID',
			'id'         => $post ? $post->ID : 0,
			'include'    => '',
			'exclude'    => '',
			'link'       => ''
	), $attr, 'gallery' );

	$id = intval( $atts['id'] );

	if ( ! empty( $atts['include'] ) ) {
			$_attachments = get_posts( array( 'include' => $atts['include'], 'post_status' => 'inherit', 'post_type' => 'attachment', 'post_mime_type' => 'image', 'order' => $atts['order'], 'orderby' => $atts['orderby'] ) );

			$attachments = array();
			foreach ( $_attachments as $key => $val ) {
					$attachments[$val->ID] = $_attachments[$key];
			}
	} elseif ( ! empty( $atts['exclude'] ) ) {
			$attachments = get_children( array( 'post_parent' => $id, 'exclude' => $atts['exclude'], 'post_status' => 'inherit', 'post_type' => 'attachment', 'post_mime_type' => 'image', 'order' => $atts['order'], 'orderby' => $atts['orderby'] ) );
	} else {
			$attachments = get_children( array( 'post_parent' => $id, 'post_status' => 'inherit', 'post_type' => 'attachment', 'post_mime_type' => 'image', 'order' => $atts['order'], 'orderby' => $atts['orderby'] ) );
	}

	if ( empty( $attachments ) ) {
			return '';
	}

	$selector = "gallery-{$instance}";
	$gallery_div = "<div id='$selector' class='post__gallery'>";

	/**
		* Filters the default gallery shortcode CSS styles.
		*
		* @since 2.5.0
		*
		* @param string $gallery_style Default CSS styles and opening HTML div container
		*                              for the gallery shortcode output.
		*/
	$output = apply_filters( 'gallery_style', $gallery_style . $gallery_div );

	$i = 0;
	foreach ( $attachments as $id => $attachment ) {
			$image_output = wp_get_attachment_image( $id, $atts['size'], false, $attr );
			$image_meta  = wp_get_attachment_metadata( $id );

			$orientation = '';
			if ( isset( $image_meta['height'], $image_meta['width'] ) ) {
					$orientation = ( $image_meta['height'] > $image_meta['width'] ) ? 'portrait' : 'landscape';
			}
			$output .= "<div class='gallery-item'>";
			$output .= "$image_output";
			if (trim($attachment->post_excerpt) ) {
					$output .= "
							<p class='wp-caption-text gallery-caption' id='$selector-$id'>
							" . wptexturize($attachment->post_excerpt) . "
							</p>";
			}
			$output .= "</div>";
	}

	$output .= "
			</div>\n";

	return $output;
}

add_shortcode('gallery', 'mediaplus_gallery_shortcode');

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