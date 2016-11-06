<?php
/**
 * Solar Bundeena Maianbar functions and definitions.
 *
 * @link https://codex.wordpress.org/Functions_File_Explained
 *
 * @package SBM
 */
if (!function_exists('sbm_setup')) :
    /**
     * Sets up theme defaults and registers support for various WordPress features.
     *
     * Note that this function is hooked into the after_setup_theme hook, which
     * runs before the init hook. The init hook is too late for some features, such
     * as indicating support for post thumbnails.
     */
    function sbm_setup()
    {
        /*
        * Enable support for Post Thumbnails on posts and pages.
         *
         * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
         */
        add_theme_support('post-thumbnails');
        set_post_thumbnail_size(900, 675, true);
        add_theme_support( 'html5', array( 'gallery', 'caption' ) );
        $GLOBALS['content_width'] = 1100;
        remove_action('wp_head', 'wp_generator');
        remove_action('wp_head', 'dns-prefetch');
        add_filter('emoji_svg_url', '__return_false');
        remove_action('wp_head', 'wlwmanifest_link');
        remove_action('wp_head', 'rsd_link');
        remove_action('wp_head', 'wp_shortlink_wp_head');
        remove_action('set_comment_cookies', 'wp_set_comment_cookies');
        remove_action('wp_head', 'adjacent_posts_rel_link_wp_head', 10);
        add_filter('the_generator', '__return_false');
        add_filter('show_admin_bar', '__return_false');
        add_filter('embed_oembed_html', 'oembed_html', 9999, 4);
        remove_action('wp_head', 'print_emoji_detection_script', 7);
        remove_action('wp_print_styles', 'print_emoji_styles');
        remove_filter('oembed_dataparse', 'wp_filter_oembed_result', 10);
        remove_action('wp_head', 'wp_oembed_add_discovery_links');
        remove_action('wp_head', 'wp_oembed_add_host_js');

        if (isset($_GET['activated']) && is_admin()) {
            // Code that runs when activated
        }
    }
endif; // sbm_setup
add_action('after_setup_theme', 'sbm_setup');

function theme_menu() {
    register_nav_menu( 'primary', 'Main Navigation Menu' );
}
add_action( 'init', 'theme_menu' );

/**
 * Enqueue scripts and styles.
 */
function sbm_scripts()
{
    wp_enqueue_style('sbm-style', get_stylesheet_uri());
    wp_enqueue_style('sbm-css', get_template_directory_uri() . '/css/bundle.css');
    wp_enqueue_script('sbm-main', get_template_directory_uri() . '/js/bundle.js', array(), '', true);
}
add_action('wp_enqueue_scripts', 'sbm_scripts');

function js_vars() {
    ?>
    <script>
        var themeSettings = {
            themeUri: '<?php echo get_template_directory_uri(); ?>',
            siteURL: '<?php echo get_site_url(); ?>',
            siteTitle: '<?php echo get_bloginfo('name') ?>',
            siteTagLine: '<?php echo get_bloginfo('description'); ?>',
        };
    </script>
<?php }
add_action( 'wp_footer', 'js_vars', 10 );
