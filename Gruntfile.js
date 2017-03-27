'use strict';
module.exports = function (grunt) {
	require('load-grunt-tasks')(grunt);
 
    //loads the various task configuration files 
    var configs = require('load-grunt-configs')(grunt);
    grunt.initConfig(configs);
 
 
 
    grunt.registerTask('javascript', ['concat_sourcemap:js', 'uglify:js']);
    grunt.registerTask('styles', ['sass:sass', 'cssmin']);
    grunt.registerTask('build:dev', ['javascript', 'styles', 'replace:dev']);
    grunt.registerTask('build:prod', ['javascript', 'styles', 'replace:production']);
    grunt.registerTask('default', ['build:dev', 'browserSync:dev', 'watch']);
    grunt.registerTask('production', ['build:prod']);
};
