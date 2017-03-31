/* global Board, Controller, Ai, Gameloop */

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

	var update = function () {
		var input = Controller.getArrowDirection({x: x * Board.getScale(), y: y * Board.getScale()});
		if (!Ai.isEnabled()) {
			if (input.length > 0) {
				self[input[1]]();
				self[input[0]]();
			}
		}
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
			if (xDir === 0 && yDir === 0) {
				return;
			}
		}
		snakePieces.unshift({
			x: x,
			y: y,
			xDir: 0,
			yDir: 0,
			xDirLast: xDir,
			yDirLast: yDir
		});

		if (Board.getTile(x, y) === 'snake') {
			//length = 1;
			length -= 3;
			// TODO: die
			Gameloop.pause();
			return;
		}
		Board.setTile(x, y, 'snake');
		xDirLast = xDir;
		yDirLast = yDir;
		while (snakePieces.length > length) {
			var piece = snakePieces.pop();
			Board.setTile(piece.x, piece.y, 'empty');
		}
		var piece = snakePieces.pop();
		piece.xDirLast = 0;
		piece.yDirLast = 0;
		snakePieces.push(piece);
	};
	var draw = function (graphics) {
		for (var i = 0; i < snakePieces.length; i++) {
			var piece = snakePieces[i];
			if (i === 0) {
				graphics.fillStyle = "#99FF99";
			} else {
				graphics.fillStyle = "yellow";
			}
			graphics.strokeStyle = "black";
			graphics.lineCap = "round";
			graphics.lineJoin = "round";
			//graphics.fillRect(piece.x * Board.getScale(), piece.y * Board.getScale(), Board.getScale(), Board.getScale());
			var baseX = piece.x * Board.getScale() + Board.getScale() / 2 + 1;
			var baseY = piece.y * Board.getScale() + Board.getScale() / 2 + 1;
			var size = Math.sin((i) / 10) / 2 + 4;
			var sizeNext = Math.sin((i + 1) / 10) / 2 + 4;
			graphics.beginPath();
			if (piece.xDir === piece.xDirLast && piece.yDir === piece.yDirLast) {
				graphics.moveTo(
						baseX + -piece.yDir * size + piece.xDir * 10,
						baseY + piece.yDir * 10 + -piece.xDir * size
						);
				graphics.lineTo(
						baseX + -piece.yDirLast * sizeNext + -piece.xDirLast * 10,
						baseY + -piece.yDirLast * 10 + -piece.xDirLast * sizeNext
						);
				graphics.lineTo(
						baseX + piece.yDirLast * sizeNext + -piece.xDirLast * 10,
						baseY + -piece.yDirLast * 10 + piece.xDirLast * sizeNext
						);
				graphics.lineTo(
						baseX + piece.yDir * size + piece.xDir * 10,
						baseY + piece.yDir * 10 + piece.xDir * size
						);
			} else {
				graphics.moveTo(
						baseX + -piece.yDir * size + piece.xDir * 10,
						baseY + piece.yDir * 10 + -piece.xDir * size
						);
				graphics.quadraticCurveTo(
						baseX,
						baseY,

						baseX + piece.yDirLast * sizeNext + -piece.xDirLast * 10,
						baseY + -piece.yDirLast * 10 + piece.xDirLast * sizeNext
						);
				graphics.lineTo(
						baseX + -piece.yDirLast * sizeNext + -piece.xDirLast * 10,
						baseY + -piece.yDirLast * 10 + -piece.xDirLast * sizeNext
						);
				graphics.quadraticCurveTo(
						baseX,
						baseY,

						baseX + piece.yDir * size + piece.xDir * 10,
						baseY + piece.yDir * 10 + piece.xDir * size
						);
			}
			graphics.closePath();
			graphics.stroke();
			graphics.fill();
			if (i === 0) {
				graphics.fillStyle = "green";
				graphics.arc(baseX, baseY, 6, 0, 2 * Math.PI);
				graphics.arc(baseX + 1, baseY, 6, 0, 2 * Math.PI);
				graphics.arc(baseX, baseY + 1, 6, 0, 2 * Math.PI);
				graphics.arc(baseX + 1, baseY + 1, 6, 0, 2 * Math.PI);
				graphics.fillStyle = "gray";
				graphics.lineWidth = 2;
				graphics.fill();
				graphics.closePath();
			}
		}
	};
	var getLength = function() {
		return length;
	}
	var increaseLength = function () {
		length++;
	};
	var isMaxLength = function() {
		return length >= Math.pow(Board.getSize(), 2) + 1;
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
	var getX = function () {
		return x;
	};
	var getY = function () {
		return y;
	};

	var self = {
		left: left,
		up: up,
		down: down,
		rigth: rigth,
		update: update,
		draw: draw,
		getDirection: getDirection,
		increaseLength: increaseLength,
		getX: getX,
		getY: getY,
		isMaxLength: isMaxLength,
		getLength: getLength
	};
	return self;
})();
