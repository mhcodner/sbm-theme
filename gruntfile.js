module.exports = function (grunt) {
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        cssmin: {
            sitecss: {
                files: {
                    'css/bundle.css': [
                        'bower_components/materialize/bin/materialize.css',
                        'css/main.css'
                    ]
                }
            }
        },
        uglify: {
            options: {
                compress: true,
                mangle: false
            },
            applib: {
                src: [
                    'bower_components/jquery/dist/jquery.min.js',
                    'bower_components/angular/angular.min.js',
                    'bower_components/angular-route/angular-route.min.js',
                    'bower_components/materialize/bin/materialize.js',
                    'js/app.js'
                ],
                dest: 'js/bundle.js'
            }
        },
        watch: {
            scripts: {
                files: ['**/*.js', '**/*.css', '!css/bundle.css', '!js/bundle.js'],
                tasks: ['uglify', 'cssmin'],
                options: {
                    spawn: false
                }
            }
        },
        copy: {
            main: {
                expand: true,
                cwd: 'bower_components/materialize/fonts/',
                src: '**',
                dest: 'fonts/',
                filter: 'isFile'
            }
        }
    });
    // Default task.
    grunt.registerTask('default', ['uglify', 'cssmin']);
};
