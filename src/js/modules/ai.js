/* global Snake, Food, Board */

'use strict';
var Ai = (function () {
	var top, rigth, bottom, left;

	var update = function () {
		top =
				Math.max(0, Math.min(-(Food.getY() - Snake.getY()) / 8, 3))
				*((Snake.getX() % 2 === 0) ? 2 : 0)
				+ ((Board.getTile(Snake.getX(), Snake.getY() - 1) !== "snake") ? 4 : 0);
		bottom =
				Math.max(0, Math.min((Food.getY() - Snake.getY()) / 8, 3))
				*((Snake.getX() % 2 === 1) ? 2 : 0)
				+ ((Board.getTile(Snake.getX(), Snake.getY() + 1) !== "snake") ? 4 : 0);
		left =
				Math.max(0, Math.min(-(Food.getX() - Snake.getX()) / 8, 3))
				*((Snake.getY() % 2 === 1) ? 2 : 0)
				+ ((Board.getTile(Snake.getX() - 1, Snake.getY()) !== "snake") ? 4 : 0);
		rigth =
				Math.max(0, Math.min((Food.getX() - Snake.getX()) / 8, 3))
				*((Snake.getY() % 2 === 0) ? 2 : 0)
				+ ((Board.getTile(Snake.getX() + 1, Snake.getY()) !== "snake") ? 4 : 0);
		var max = Math.max(top, rigth, bottom, left);
		if (top === max) {
			Snake.up();
		}
		if (left === max) {
			Snake.left();
		}
		if (bottom === max) {
			Snake.down();
		}
		if (rigth === max) {
			Snake.rigth();
		}
	};
	var draw = function (graphics) {
		var max = Math.max(top, rigth, bottom, left);
		
		graphics.strokeStyle = "red";
		var baseX = Snake.getX() * Board.getScale() + Board.getScale() / 2;
		var baseY = Snake.getY() * Board.getScale() + Board.getScale() / 2;
		graphics.beginPath();
		
		graphics.moveTo(baseX, baseY);
		graphics.lineTo(baseX + rigth * Board.getScale(), baseY);
		graphics.lineWidth = rigth === max ? 6 : 2;
		graphics.stroke();
		
		graphics.moveTo(baseX, baseY);
		graphics.lineTo(baseX - left * Board.getScale(), baseY);
		graphics.lineWidth = left === max ? 6 : 2;
		graphics.stroke();
		
		graphics.moveTo(baseX, baseY);
		graphics.lineTo(baseX, baseY + bottom * Board.getScale());
		graphics.lineWidth = bottom === max ? 6 : 2;
		graphics.stroke();
		
		graphics.moveTo(baseX, baseY);
		graphics.lineTo(baseX, baseY - top * Board.getScale());
		graphics.lineWidth = top === max ? 6 : 2;
		graphics.stroke();
		
		graphics.closePath();
	};
	var isEnabled = function () {
		return false;
	};

	var self = {
		update: update,
		draw: draw,
		isEnabled: isEnabled
	};
	return self;
})();
