'use strict';
module.exports = {
	production: {
		options: {
			patterns: [
				{
					match: 'jsfile',
					replacement: 'js/output.min.js'
				},
				{
					match: 'cssfile',
					replacement: 'css/style.min.css'
				}
			]
		},
		files: [
			{
				expand: true,
				flatten: true,
				src: ['src/index.html'],
				dest: 'public/'
			}
		]
	},
	dev: {
		options: {
			patterns: [
				{
					match: 'jsfile',
					replacement: 'js/output.js'
				},
				{
					match: 'cssfile',
					replacement: 'css/style.css'
				}
			]
		},
		files: [
			{
				expand: true,
				flatten: true,
				src: ['src/index.html'],
				dest: 'public/'
			}
		]
	}
};
