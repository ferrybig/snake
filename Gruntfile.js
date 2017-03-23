'use strict';
module.exports = function (grunt) {
	require('load-grunt-tasks')(grunt);
 
    //loads the various task configuration files 
    var configs = require('load-grunt-configs')(grunt);
    grunt.initConfig(configs);
 
 
 
    grunt.registerTask('javascript', ['concat_sourcemap:js', 'uglify:js']);
    grunt.registerTask('styles', ['sass:sass']);
    grunt.registerTask('build', ['javascript', 'sass']);
    grunt.registerTask('default', ['build', 'watch']);
};
