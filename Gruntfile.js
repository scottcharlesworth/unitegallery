module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('bower.json'),
        app: grunt.file.readJSON('_config.json'),
        banner: '/**\n' + ' * <%= app.title %> v<%= pkg.version %>\n'
            + ' * Copyright 2014-<%= grunt.template.today("yyyy") %> \n'
            + ' * Licensed under: <%= pkg.license %>\n' + ' */',

        concat: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                files: [
                    {'dist/js/<%= pkg.name %>.js': '<%= app.js.scripts %>'}
                ]
            }
        },
        uglify: {
            dist: {
                options: {
                    banner: '<%= banner %>'
                },
                files: [
                    {
                        expand: true,
                        cwd: 'dist',
                        src: ['**/*.js', '!**/*.min.js'],
                        dest: 'dist',
                        ext: '.min.js'
                    }
                ]
            }
        },
        cssmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'dist',
                    src: ['**/*.css', '!**/*.min.css'],
                    dest: 'dist',
                    ext: '.min.css'
                }]
            }
        },
        clean: {
            package_ug: ['package/unitegallery']
        },
        copy: {
            assets: {
                files: [
                    {
                        expand: true,
                        nonull: true,
                        cwd: '<%= app.asset_source_dir %>',
                        src: ['**/*.png', '**/*.gif', '**/*.txt'],
                        dest: 'dist'
                    }

                ]
            },
            css: {
                files: [
                    {
                        expand: true,
                        nonull: true,
                        cwd: '<%= app.asset_source_dir %>',
                        src: ['**/*.css'],
                        dest: 'dist'
                    }
                ]
            },
            jquery: {
                files: [
                    {
                        nonull: true,
                        src: 'node_modules/jquery/dist/jquery.min.js',
                        dest: '<%= app.asset_source_dir %>js/jquery-11.0.min.js'
                    },
                    {
                        nonull: true,
                        src: '<%= app.asset_source_dir %>js/jquery-11.0.min.js',
                        dest: 'dist/js/jquery-11.0.min.js'
                    }
                ]
            },
            theme_js: {
                files: [
                    {
                        expand: true,
                        nonull: true,
                        cwd: '<%= app.asset_source_dir %>',
                        src: ['themes/**/*.js'],
                        dest: 'dist'
                    }
                ]
            },
            to_package: {
                files: [
                    {
                        expand: true,
                        cwd: 'dist',
                        src: '**',
                        dest: 'package/unitegallery'
                    }

                ]
            }
        }
    });

    grunt.registerTask('dist', ['concat:dist', 'copy:theme_js', 'copy:assets', 'uglify:dist', 'cssmin:dist']);
    grunt.registerTask('update_package', ['copy:to_package']);
    grunt.registerTask('update_jquery', ['copy:jquery']);
};