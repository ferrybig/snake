'use strict';
module.exports = {
	target: {
		files: [
			{
				expand: true,
				cwd: 'public/css',
				src: ['style.css'],
				dest: 'public/css',
				ext: '.min.css'
			}
		]
	}
};
