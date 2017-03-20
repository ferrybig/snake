'use strict';
var Board = (function(){
	var grid = [];
	var sizeX = 20;
	var sizeY = 20;
	
	var draw = function(graphics){
		graphics.fillStyle = "black";
		graphics.beginPath();
		for(var x = -1; x < sizeX; x++) {
			graphics.fillRect(x * 20, 0, 2, 20 * 20);
		}
		for(var y = -1; y < sizeY; y++) {
			graphics.fillRect(0, y * 20, 20 * 20, 2);
		}
		graphics.closePath();
	};
	
	var update = function(){
		
	};
	
	var initBoard = function() {
		for(var x = 0; x < sizeX; x++) {
			grid[x] = [];
			for(var y = 0; y < sizeY; y++) {
				grid[x][y] = 'empty';
			}
		}
	};
	
	var setTile = function(x, y, tile) {
		grid[x][y] = tile;
	};
	
	var getTile = function(x, y) {
		return grid[x][y];
	};
	
	var self = {
		draw: draw,
		initBoard: initBoard,
		update: update,
		setTile: setTile
	};
	return self;
})();
