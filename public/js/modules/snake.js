/* global Board */

'use strict';
var Snake = (function () {
	var length = 3;
	var snakePieces = [];
	var x = 14;
	var y = 14;
	var xDir = 0;
	var yDir = 0;
	var xDirLast = 0;
	var yDirLast = 0;
	var moveTick = 0;

	var update = function () {
		if(moveTick++ < 20) {
			return;
		}
		moveTick = 0;
		x += xDir;
		y += yDir;
		if (x < 0) {
			x = 19;
		}
		if (y < 0) {
			y = 19;
		}
		if (x > 19) {
			x = 0;
		}
		if (y > 19) {
			y = 0;
		}
		if (snakePieces.length > 0) {
			snakePieces[0].xDir = xDir;
			snakePieces[0].yDir = yDir;
		}
		snakePieces.unshift({
			x: x,
			y: y,
			xDir: 0,
			yDir: 0,
			xDirLast: xDirLast,
			yDirLast: yDirLast,
			last: false
		});
		Board.setTile(x, y, 'snake');
		xDirLast = xDir;
		yDirLast = yDir;
		if (snakePieces.length > length) {
			var piece = snakePieces.pop();
			Board.setTile(piece.x, piece.y, 'empty');
		}
		snakePieces[0].last = true;
	};
	var draw = function (graphics) {
		for (var i = 0; i < snakePieces.length; i++) {
			var piece = snakePieces[i];
			
			graphics.fillStyle = "yellow";
			graphics.fillRect(piece.x * 20, piece.y * 20, 20, 20);
			graphics.fillStyle = "gray";
			graphics.beginPath();
			var baseX = piece.x * 20 + 10;
			var baseY = piece.y * 20 + 10;
			if (i === 0) {
				graphics.arc(baseX, baseY, 6.5, 0, 2 * Math.PI);
			}
			graphics.fill();
			graphics.closePath();
		}
	};
	var getDirection = function() {
		return {
			x: xDir,
			y: yDir
		};
	};

	var left = function () {
		if (xDirLast !== 0)
			return;
		xDir = -1;
		yDir = 0;
	};
	var top = function () {
		if (yDirLast !== 0)
			return;
		yDir = -1;
		xDir = 0;
	};
	var bottom = function () {
		if (yDirLast !== 0)
			return;
		yDir = -1;
		xDir = 0;
	};
	var rigth = function () {
		if (xDirLast !== 0)
			return;
		xDir = 1;
		yDir = 0;
	};
	
	var self = {
		left: left,
		top: top,
		bottom: bottom,
		rigth: rigth,
		update: update,
		draw: draw,
		getDirection: getDirection
	};
	return self;
})();
