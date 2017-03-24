/* global Snake, Food, Board */

'use strict';
var Ai = (function () {
	var debug = false;
	var enabled = true;
	var foodx;
	var foody;
	var directions = {
		up: {
			x: 0,
			y: -1,
			distance: 0
		},
		down: {
			x: 0,
			y: 1,
			distance: 0
		},
		left: {
			x: -1,
			y: 0,
			distance: 0
		},
		rigth: {
			x: 1,
			y: 0,
			distance: 0
		}
	};

	var _between = function (number, min, max) {
		if (number < min)
			return min;
		if (number > max)
			return max;
		return number;
	}

	var update = function () {
		if (!enabled) {
			return;
		}
		if (Food.getX() === undefined) {
			return;
		}
		foodx = _between(Food.getX() + ((Food.getY() % 2 === 0) ? -0.2 : 0.2), -0.1, Board.getSize() - 0.9);
		foody = _between(Food.getY() + ((Food.getX() % 2 === 0) ? 0.2 : -0.2), -0.1, Board.getSize() - 0.9);
		directions.up.distance =
				((Snake.getX() % 2 === 0) ? 1 : 0)
				+ (Board.isInBoard(Snake.getX(), Snake.getY() - 1) ? 2 : 0)
				+ ((Board.getTile(Snake.getX(), Snake.getY() - 1) !== "snake") ? 4 : 0);
		directions.down.distance =
				((Snake.getX() % 2 === 1) ? 1 : 0)
				+ (Board.isInBoard(Snake.getX(), Snake.getY() + 1) ? 2 : 0)
				+ ((Board.getTile(Snake.getX(), Snake.getY() + 1) !== "snake") ? 4 : 0);
		directions.left.distance =
				((Snake.getY() % 2 === 1) ? 1 : 0)
				+ (Board.isInBoard(Snake.getX() - 1, Snake.getY()) ? 2 : 0)
				+ ((Board.getTile(Snake.getX() - 1, Snake.getY()) !== "snake") ? 4 : 0);
		directions.rigth.distance =
				((Snake.getY() % 2 === 0) ? 1 : 0)
				+ (Board.isInBoard(Snake.getX() + 1, Snake.getY()) ? 2 : 0)
				+ ((Board.getTile(Snake.getX() + 1, Snake.getY()) !== "snake") ? 4 : 0);

		var max = Math.max.apply(Math, Object.keys(directions).map(function (key) {
			return directions[key].distance;
		}));
		var bestDirection = undefined;
		var lowestDistance = Number.MAX_SAFE_INTEGER;
		for (var dir in directions) {
			if (directions[dir].distance !== max) {
				continue;
			}
			var newLoc = {
				x: Snake.getX() + directions[dir].x,
				y: Snake.getY() + directions[dir].y
			};
			var distance = Math.pow(newLoc.x - foodx, 2) + Math.pow(newLoc.y - foody, 2);
			if (distance < lowestDistance) {
				lowestDistance = distance;
				bestDirection = dir;
			}
		}
		Snake[bestDirection]();
	};
	var draw = function (graphics) {
		if (!debug) {
			return;
		}
		var max = Math.max.apply(Math, Object.keys(directions).map(function (key) {
			return directions[key].distance;
		}));

		graphics.strokeStyle = "green";
		var baseX = Snake.getX() * Board.getScale() + Board.getScale() / 2;
		var baseY = Snake.getY() * Board.getScale() + Board.getScale() / 2;
		var baseFoodX = Food.getX() * Board.getScale() + Board.getScale() / 2;
		var baseFoodY = Food.getY() * Board.getScale() + Board.getScale() / 2;

		graphics.beginPath();

		graphics.moveTo(baseFoodX, baseFoodY);
		graphics.lineTo(
				foodx * Board.getScale() + Board.getScale() / 2,
				foody * Board.getScale() + Board.getScale() / 2);
		graphics.lineWidth = 2;
		graphics.stroke();

		graphics.closePath();

		for (var dir in directions) {
			graphics.beginPath();

			graphics.moveTo(baseX, baseY);
			graphics.lineTo(
					baseX + directions[dir].distance * directions[dir].x * Board.getScale(),
					baseY + directions[dir].distance * directions[dir].y * Board.getScale());
			graphics.lineWidth = directions[dir].distance === max ? 6 : 2;
			graphics.stroke();

			graphics.closePath();
		}
	};
	var isEnabled = function () {
		return enabled;
	};

	var self = {
		update: update,
		draw: draw,
		isEnabled: isEnabled
	};
	return self;
})();
