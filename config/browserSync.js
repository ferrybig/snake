'use strict';
module.exports = {
	dev: {
		bsFiles: {
			src: [
				'public/css/style.css',
				'public/js/output.js',
				'public/index.html'
			]
		},
		options: {
			server: {
				baseDir: 'public'
			},
			watchTask: true
		}
	}
};
