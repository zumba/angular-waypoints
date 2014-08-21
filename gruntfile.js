/*global module:false*/

var _ = require('lodash');

module.exports = function(grunt) {
    "use strict";
    var gruntConfig = { pkg : grunt.file.readJSON('package.json') };

    grunt.file.recurse('grunt/config', function(config) {
        _.merge(gruntConfig, grunt.file.readJSON(config));
    });

    gruntConfig.wrap.files.options.wrapper = grunt.file.read('src/umd.js').split('/** src files **/');

    // Project configuration.
    grunt.initConfig(gruntConfig);
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-wrap');
    grunt.registerTask('default', ['concat', 'wrap', 'jshint', 'jasmine']);
    grunt.registerTask('test', ['concat', 'wrap', 'jshint', 'jasmine']);
};