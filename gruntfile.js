/*global module:false*/

var _ = require('lodash');

module.exports = function(grunt) {
	"use strict";
	var gruntConfig = { pkg : grunt.file.readJSON('package.json') };

	grunt.file.recurse('grunt/config', function(config) {
		_.merge(gruntConfig, grunt.file.readJSON(config));
	});

	gruntConfig.wrap.files.options.wrapper = grunt.file.read('src/umd.js').split('/** src files **/');

	var rename = function(dest, src) {
		return dest + src.replace('.js', '.min.js');
	};
	_.each(gruntConfig.uglify, function(obj) {
		if (obj.files) {
			obj.files[0].rename = rename;
		}
	});

	// Project configuration.
	grunt.initConfig(gruntConfig);
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-wrap');

	grunt.registerTask('build-src', ['clean', 'concat:dist', 'wrap']);
	grunt.registerTask('build-dist', ['jshint', 'uglify', 'concat:dependencies', 'concat:dependencies-min']);
	grunt.registerTask('test', ['build-src', 'build-dist', 'jasmine']);
	grunt.registerTask('default', ['test']);
};
