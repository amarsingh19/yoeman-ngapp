/*jshint camelcase: false */
'use strict';

//This was edited by AJ
module.exports = function (grunt) {
    var config = {
        wiredep: {
            task: {
                // Point to the files that should be updated when
                // you run `grunt wiredep`
                src: [
                    'src/index.html'
                ],

                options: {
                    // See wiredep's configuration documentation for the options
                    // you may pass:
                    // https://github.com/taptapship/wiredep#configuration
                }
            }
        },
        injector: {
            options: {
                destFile: 'src/index.html',
                //ignorePath: 'src'
            },
            local_dependencies: {
                files: [{
                    'index.html': ['src/**/*.js', '!src/app.js', '!src/**/*.spec.js', 'src/**/*.css', 'tmp/**/*.css']
                }]
            }
        },
        less: {
            development: {
                files: [
                    {
                        expand: true,
                        cwd: 'src',
                        src: ['**/*.less'],
                        dest: 'tmp/styles/',
                        ext: '.css'
                    }
                ]
            }
        },
        jshint: {
            all: {
                src: ['src/**/*.js'],
                options: {
                    reporterOutput: ''
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },
            css: {
                files: '**/*.less',
                tasks: ['less'],
                options: {
                    livereload: {
                        port: 1337
                    }
                }
            },
            scripts: {
                files: 'src/**/*.js',
                tasks: ['jshint']
            },
            html: {
                files: 'src/**/*.html'
            }
        },
        open: {
            all: {
                path: 'http://localhost:9000/src'
            }
        },
        connect: {
            server: {
                options: {
                    hostname: 'localhost',
                    port: 9000,
                }
            }
        }
    };

    grunt.initConfig(config);


    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-injector');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.registerTask('server',
        ['wiredep', 'less', 'injector', 'jshint', 'connect', 'open', 'watch']);
};