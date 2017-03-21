/* global Board, Controller, Ai */

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
		moveTick++;
		var input;
		if (!Ai.isEnabled()) {
			if(input.length > 0) {
				self[input[1]]();
				self[input[0]]();
			}
			if (moveTick < 12) {
				return;
			}
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
			if(xDir === 0 && yDir === 0) {
				return;
			}
		}
		snakePieces.unshift({
			x: x,
			y: y,
			xDir: 0,
			yDir: 0,
			xDirLast: xDirLast,
			yDirLast: yDirLast
		});
		
		if(Board.getTile(x, y) === 'snake') {
			length = 3;
			// TODO: die
		}
		Board.setTile(x, y, 'snake');
		xDirLast = xDir;
		yDirLast = yDir;
		if (snakePieces.length > length) {
			var piece = snakePieces.pop();
			Board.setTile(piece.x, piece.y, 'empty');
		}
	};
	var draw = function (graphics) {
		for (var i = 0; i < snakePieces.length; i++) {
			var piece = snakePieces[i];

			graphics.fillStyle = "yellow";
			graphics.fillRect(piece.x * Board.getScale(), piece.y * Board.getScale(), Board.getScale(), Board.getScale());
			graphics.fillStyle = "gray";
			graphics.beginPath();
			var baseX = piece.x * Board.getScale() + Board.getScale() / 2;
			var baseY = piece.y * Board.getScale() + Board.getScale() / 2;
			if (i === 0) {
				graphics.arc(baseX, baseY, 6, 0, 2 * Math.PI);
				graphics.arc(baseX + 1, baseY, 6, 0, 2 * Math.PI);
				graphics.arc(baseX, baseY + 1, 6, 0, 2 * Math.PI);
				graphics.arc(baseX + 1, baseY + 1, 6, 0, 2 * Math.PI);
			}
			graphics.fill();
			graphics.closePath();
		}
	};
	var increaseLength = function() {
		length++;
	};
	var getDirection = function () {
		return {
			x: xDir,
			y: yDir
		};
	};

	var left = function () {
		if (xDirLast === 1)
			return;
		xDir = -1;
		yDir = 0;
	};
	var up = function () {
		if (yDirLast === 1)
			return;
		yDir = -1;
		xDir = 0;
	};
	var down = function () {
		if (yDirLast === -1)
			return;
		yDir = 1;
		xDir = 0;
	};
	var rigth = function () {
		if (xDirLast === -1)
			return;
		xDir = 1;
		yDir = 0;
	};

	var self = {
		left: left,
		up: up,
		down: down,
		rigth: rigth,
		update: update,
		draw: draw,
		getDirection: getDirection,
		increaseLength: increaseLength
	};
	return self;
})();
