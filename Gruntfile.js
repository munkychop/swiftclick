module.exports = function (grunt) {

    'use strict';

    var jsSrcDir = 'src/';
    var jsSrcFile = 'swiftclick.js';
    var jsDistDir = 'dist/';
    var jsDistFile = 'swiftclick.min.js';
    var jsExampleLibsDir = 'example/js/libs/';

    grunt.initConfig({

        watch: {
            js: {
                files: [jsSrcDir + jsSrcFile],
                tasks: ['dist']
            }
        },

        uglify: {
            options: {
                compress: {
                    drop_console: true
                },
                mangle: true,
                beautify: false,
                preserveComments: false
            },
            dist: {
                src: jsSrcDir + jsSrcFile,
                dest: jsDistDir + jsDistFile
            }
        },

        copy : {
            dist : {
                src : jsSrcDir + jsSrcFile,
                dest : jsDistDir + jsSrcFile // copy with unminified file name
            },
            example : {
                src : jsSrcDir + jsSrcFile,
                dest : jsExampleLibsDir + jsSrcFile // copy with unminified file name
            }
        }
    });

    require('load-grunt-tasks')(grunt, {pattern: ['grunt-*']});

    grunt.registerTask('default', ['uglify:dist', 'copy', 'watch']);
    grunt.registerTask('dist', ['uglify:dist', 'copy']);
};
