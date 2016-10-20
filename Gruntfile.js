module.exports = function (grunt) {

    'use strict';

    var sourceDir = 'js/';
    var distDir = 'js/dist/';
    var jsDistFile = 'swiftclick.min.js';

    var jsFilesArray = [sourceDir + 'libs/swiftclick.js'];

    // ====================
    // ====================

    // Project configuration.
    grunt.initConfig({
        watch: {
            js: {
                files: [
                    'Gruntfile.js',
                    'js/app/app.js',
                    'js/libs/swiftclick.js'
                ],

                tasks: ['deploy']
            }
        },

        copy: {
            deploy: {
                files: [
                    {
                        expand: true,
                        cwd: 'js/libs/',
                        src: ['swiftclick.js'],
                        dest: 'js/dist/',
                        filter: 'isFile'
                    }
                ]
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
                    report: 'gzip'
                },

                src: jsFilesArray,
                dest: distDir + jsDistFile
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // A task for deployment
    grunt.registerTask('deploy', ['copy:deploy', 'uglify:deploy']);
    grunt.registerTask('default', ['deploy']);
};
