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
	var tilesToErase = [];
	var newTiles = 0;

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
			x = Board.getSize() - 1;
		}
		if (y < 0) {
			y = Board.getSize() - 1;
		}
		if (x > Board.getSize()) {
			x = 0;
		}
		if (y > Board.getSize()) {
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
		newTiles+= 2;
		xDirLast = xDir;
		yDirLast = yDir;
		while (snakePieces.length > length) {
			var piece = snakePieces.pop();
			Board.setTile(piece.x, piece.y, 'empty');
			tilesToErase.push(piece);
		}
		var piece = snakePieces.pop();
		piece.xDirLast = 0;
		piece.yDirLast = 0;
		snakePieces.push(piece);
	};
	var draw = function (graphics) {
		graphics.fillStyle = "#FFFFFF";
		for (var j = 0; j < tilesToErase.length; j++) {
			var piece = tilesToErase[j];
			graphics.fillRect(piece.x * Board.getScale(), piece.y * Board.getScale(), Board.getScale(), Board.getScale());
		}
		newTiles = Math.max(2, newTiles);
		tilesToErase = [];
		var snakePiecesMinusOne = snakePieces.length - 1;
		graphics.lineWidth = 0;
		for (var i = 0; i < snakePieces.length; i++) {
			var piece = snakePieces[i];
			if(i > newTiles && i !== snakePiecesMinusOne && (piece.y !== 0 || piece.x > 5)) {
				continue;
			}
			graphics.fillStyle = "#FFFFFF";
			graphics.fillRect(piece.x * Board.getScale(), piece.y * Board.getScale(), Board.getScale(), Board.getScale());
			if (i === 0) {
				graphics.fillStyle = "#99FF99";
			} else {
				graphics.fillStyle = "yellow";
			}
			graphics.strokeStyle = "black";
			graphics.lineCap = "round";
			graphics.lineJoin = "round";
			var baseX = piece.x * Board.getScale() + Board.getScale() / 2 + 1;
			var baseY = piece.y * Board.getScale() + Board.getScale() / 2 + 1;
			var size = 3 / (10 / Board.getScale());
			var sizeNext = 3 / (10 / Board.getScale());
			graphics.beginPath();
			var renderSize = Board.getScale() / 2;
			if (piece.xDir === piece.xDirLast && piece.yDir === piece.yDirLast) {
				graphics.moveTo(
						baseX + -piece.yDir * size + piece.xDir * renderSize,
						baseY + piece.yDir * renderSize + -piece.xDir * size
						);
				graphics.lineTo(
						baseX + -piece.yDirLast * sizeNext + -piece.xDirLast * renderSize,
						baseY + -piece.yDirLast * renderSize + -piece.xDirLast * sizeNext
						);
				graphics.lineTo(
						baseX + piece.yDirLast * sizeNext + -piece.xDirLast * renderSize,
						baseY + -piece.yDirLast * renderSize + piece.xDirLast * sizeNext
						);
				graphics.lineTo(
						baseX + piece.yDir * size + piece.xDir * renderSize,
						baseY + piece.yDir * renderSize + piece.xDir * size
						);
			} else {
				graphics.moveTo(
						baseX + -piece.yDir * size + piece.xDir * renderSize,
						baseY + piece.yDir * renderSize + -piece.xDir * size
						);
				graphics.quadraticCurveTo(
						baseX,
						baseY,

						baseX + piece.yDirLast * sizeNext + -piece.xDirLast * renderSize,
						baseY + -piece.yDirLast * renderSize + piece.xDirLast * sizeNext
						);
				graphics.lineTo(
						baseX + -piece.yDirLast * sizeNext + -piece.xDirLast * renderSize,
						baseY + -piece.yDirLast * renderSize + -piece.xDirLast * sizeNext
						);
				graphics.quadraticCurveTo(
						baseX,
						baseY,

						baseX + piece.yDir * size + piece.xDir * renderSize,
						baseY + piece.yDir * renderSize + piece.xDir * size
						);
			}
			graphics.closePath();
			graphics.stroke();
			graphics.fill();
			if (i === 0) {
				graphics.fillStyle = "gray";
				graphics.arc(baseX, baseY, renderSize/3, 0, 2 * Math.PI);
				graphics.fillStyle = "gray";
				graphics.fill();
				graphics.closePath();
			}
		}
		newTiles = 0;
	};
	var getLength = function() {
		return length;
	}
	var increaseLength = function () {
		if(length === 6380) {
			Gameloop.setTargetPhysicsRate(1000/8);
		}
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
