'use strict';
module.exports = {
	sass: {
		files: ['src/sass/**/*.scss'],
		tasks: ['sass:sass']
	},
	js: {
		files: ['src/js/**/*.js'],
		tasks: ['concat_sourcemap', 'uglify:js']
	}
};
