module.exports = function (grunt) {

	'use strict';

	var sourceDir = 'js/';
	var jsFile = 'swiftclick.min.js';

	var jsFilesArray = [sourceDir + 'libs/swiftclick.js'];

	// ====================
	// ====================

	// Project configuration.
	grunt.initConfig({
		pkg: require('./package'),

		watch: {

			js: {
				files: [
					'Gruntfile.js',
					'js/app/app.js',
					'js/libs/swiftclick.js'
				],

				tasks: ['uglify:deploy', 'copy:testLibs']
			}
		},

		uglify: {

			deploy: {
				options: {

					compress: true,

					// mangle: Turn on or off mangling
					mangle: true,

					// beautify: beautify your code for debugging/troubleshooting purposes
					beautify: false,

					// report: Show file size report
					report: 'gzip',
				},

				files: {
					'js/dist/swiftclick.min.js' : jsFilesArray
				}
			}
		},

		copy: {

			testLibs: {
				src: 'js/libs/swiftclick.js',
				dest: 'tests/browser/js/libs/swiftclick.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-devtools');

	// =============
	// === Tasks ===
	// =============

	// A task for deployment
	grunt.registerTask('deploy', ['uglify:deploy']);
};
