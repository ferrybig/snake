'use strict';
var Board = (function () {
	var grid = [];
	var sizeX = 20;
	var sizeY = 20;
	var scale = 20;

	var draw = function (graphics) {
	};

	var update = function () {
	};

	var initBoard = function () {
		for (var x = 0; x < sizeX; x++) {
			grid[x] = [];
			for (var y = 0; y < sizeY; y++) {
				grid[x][y] = 'empty';
			}
		}
	};

	var selectRandomTile = function () {
		var free = 0;
		for (var x = 0; x < sizeX; x++) {
			for (var y = 0; y < sizeY; y++) {
				if (grid[x][y] === 'empty') {
					free++;
				}
			}
		}
		var selected = Math.floor(free * Math.random());
		for (var x = 0; x < sizeX; x++) {
			for (var y = 0; y < sizeY; y++) {
				if (grid[x][y] === 'empty') {
					free--;
					if (free === selected) {
						return {x: x, y: y};
					}
				}
			}
		}
		throw "Should not reach here";
	};

	var setTile = function (x, y, tile) {
		grid[x][y] = tile;
	};

	var isInBoard = function (x, y) {
		if (x >= grid.length)
			return false;
		if (x < 0)
			return false;
		if (y >= grid.length)
			return false;
		if (y < 0)
			return false;
		return true;
	};

	var getTile = function (x, y) {
		if (x >= grid.length)
			x -= grid.length;
		if (x < 0)
			x += grid.length;
		if (y >= grid.length)
			y -= grid.length;
		if (y < 0)
			y += grid.length;
		return grid[x][y];
	};
	var getScale = function () {
		return scale;
	};
	var getSize = function () {
		return grid.length;
	};

	var self = {
		draw: draw,
		initBoard: initBoard,
		update: update,
		setTile: setTile,
		getTile: getTile,
		getScale: getScale,
		getSize: getSize,
		selectRandomTile: selectRandomTile,
		isInBoard: isInBoard
	};
	return self;
})();
