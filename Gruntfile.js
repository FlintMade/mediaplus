module.exports = function(grunt) {

	// Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'wp-content/themes/mediaplus-2017/assets/css/compiled/about.css': 'wp-content/themes/mediaplus-2017/assets/css/pages/about.scss',
					'wp-content/themes/mediaplus-2017/assets/css/compiled/casestudy.css': 'wp-content/themes/mediaplus-2017/assets/css/pages/casestudy.scss',
					'wp-content/themes/mediaplus-2017/assets/css/compiled/clients.css': 'wp-content/themes/mediaplus-2017/assets/css/pages/clients.scss',
					'wp-content/themes/mediaplus-2017/assets/css/compiled/contact.css': 'wp-content/themes/mediaplus-2017/assets/css/pages/contact.scss',
					'wp-content/themes/mediaplus-2017/assets/css/compiled/errors.css': 'wp-content/themes/mediaplus-2017/assets/css/pages/errors.scss',
					'wp-content/themes/mediaplus-2017/assets/css/compiled/home.css': 'wp-content/themes/mediaplus-2017/assets/css/pages/home.scss',
					'wp-content/themes/mediaplus-2017/assets/css/compiled/journal.css': 'wp-content/themes/mediaplus-2017/assets/css/pages/journal.scss'
				}
			}
		},
		uglify: {
			options: {
				mangle: false,
				sourceMap: true,
			},
			my_target: {
				files: {
					'wp-content/themes/mediaplus-2017/assets/js/compiled/scripts.min.js': ['wp-content/themes/mediaplus-2017/assets/js/scripts.js'],
					'wp-content/themes/mediaplus-2017/assets/js/compiled/about.min.js': ['wp-content/themes/mediaplus-2017/assets/js/scripts.js', 'wp-content/themes/mediaplus-2017/assets/js/about.js'],
					'wp-content/themes/mediaplus-2017/assets/js/compiled/casestudy.min.js': ['wp-content/themes/mediaplus-2017/assets/js/scripts.js', 'wp-content/themes/mediaplus-2017/assets/js/casestudy.js'],
					'wp-content/themes/mediaplus-2017/assets/js/compiled/clients.min.js': ['wp-content/themes/mediaplus-2017/assets/js/scripts.js', 'wp-content/themes/mediaplus-2017/assets/js/clients.js'],
					'wp-content/themes/mediaplus-2017/assets/js/compiled/home.min.js': ['wp-content/themes/mediaplus-2017/assets/js/scripts.js', 'wp-content/themes/mediaplus-2017/assets/js/casestudy.js', 'wp-content/themes/mediaplus-2017/assets/js/home.js'],
					'wp-content/themes/mediaplus-2017/assets/js/compiled/journal-index.min.js': ['wp-content/themes/mediaplus-2017/assets/js/scripts.js', 'wp-content/themes/mediaplus-2017/assets/js/journal-index.js']
				}
			}
		},
		watch: {
			css: {
				files: ['**/*.scss', '**/*.js'],
				tasks: ['sass', 'uglify']
			},
		},
	});

	// Load tasks
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Register tasks
	grunt.registerTask('default', ['sass']);
	grunt.registerTask('default', ['uglify']);

};