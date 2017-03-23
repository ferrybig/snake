/* global Board, Snake */

'use strict';
var Food = (function(){
	var x = undefined, y = undefined;
	
	var getX = function() {
		return x;
	};
	var getY = function() {
		return y;
	};
	var update = function() {
		if(x !== undefined && Board.getTile(x, y) !== "food") {
			Snake.increaseLength();
			x = undefined;
		}
		if(x === undefined) {
			var random = Board.selectRandomTile();
			x = random.x;
			y = random.y;
			console.log(x, y);
			Board.setTile(x, y, "food");
		}
	};
	var draw = function(graphics) {
		graphics.fillStyle = "red";
		graphics.beginPath();
		graphics.fillRect(x * Board.getScale(), y * Board.getScale(), Board.getScale(), Board.getScale());
		graphics.closePath();
	};
	var isEnabled = function() {
		return false;
	};
	
	var self = {
		update: update,
		draw: draw,
		isEnabled: isEnabled,
		getX: getX,
		getY: getY
	};
	return self;
})();
