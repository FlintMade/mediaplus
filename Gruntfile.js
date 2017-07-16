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
					'wp-content/themes/mediaplus-2017/assets/css/about.css': 'wp-content/themes/mediaplus-2017/assets/css/pages/about.scss',
					'wp-content/themes/mediaplus-2017/assets/css/casestudy.css': 'wp-content/themes/mediaplus-2017/assets/css/pages/casestudy.scss',
					'wp-content/themes/mediaplus-2017/assets/css/clients.css': 'wp-content/themes/mediaplus-2017/assets/css/pages/clients.scss',
					'wp-content/themes/mediaplus-2017/assets/css/contact.css': 'wp-content/themes/mediaplus-2017/assets/css/pages/contact.scss',
					'wp-content/themes/mediaplus-2017/assets/css/errors.css': 'wp-content/themes/mediaplus-2017/assets/css/pages/errors.scss',
					'wp-content/themes/mediaplus-2017/assets/css/home.css': 'wp-content/themes/mediaplus-2017/assets/css/pages/home.scss',
					'wp-content/themes/mediaplus-2017/assets/css/journal.css': 'wp-content/themes/mediaplus-2017/assets/css/pages/journal.scss'
				}
			}
		},
		watch: {
			css: {
				files: '**/*.scss',
				tasks: ['sass']
			},
		},
	});

	// Load tasks
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Register tasks
	grunt.registerTask('default', ['sass']);

};