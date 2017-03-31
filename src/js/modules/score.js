/* global Snake */

'use strict';
var Score = (function(){
	var update = function() {
		
	};
	var draw = function(graphics) {
		var score = Snake.getLength();
		graphics.beginPath();
		graphics.fillStyle = "#FFFF00";
		graphics.strokeStyle = "#000000";
		graphics.font = "12px serif";
		graphics.textAlign = "left";
		graphics.textBaseline = "middle";
		graphics.strokeText('Length: ' + score, 5, 5);
		graphics.fillText('Length: ' + score, 5, 5);
		graphics.closePath();
	};
	
	var self = {
		update: update,
		draw: draw
	};
	return self;
})();
