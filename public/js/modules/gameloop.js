/* global Ai, Controller, Snake, Board, Score */

'use strict';
var Gameloop = (function() {
	
	var lastFrameTime = undefined;
	var thisFrameTime = 0;
	var targetPhysicsRate = 1000 / 60; // Run physics at 60 TPS
	var targetFrameRate = 1000 / 60; // Run frames at 60 FPS
	var paused = false;
	var canvas = undefined;
	var graphics = undefined;
	
	var _update = function() {
		if(!paused) {
			Ai.update();
			Controller.update();
			Snake.update();
			Board.update();
			Score.update();
		}
	};
	
	var _draw = function() {
		graphics.clearRect(0,0,800,800);
		Ai.draw(graphics);
		Controller.draw(graphics);
		Snake.draw(graphics);
		Board.draw(graphics);
		Score.draw(graphics);
	};
	
	var _loop = function() {
		var timeInMs = Date.now();
		if (lastFrameTime === undefined || timeInMs - lastFrameTime > 400) {
			// Either missed to many frames, or we are first starting
			// Adjust the frames by a few MS to prevent clock skew from messing with the time
			lastFrameTime = timeInMs - targetPhysicsRate / 10;
			_update();
		} else {
			while (timeInMs - lastFrameTime > targetPhysicsRate) {
				_update();
				lastFrameTime += targetPhysicsRate;
			}
		}
		_draw();
		_requestAnimFrame(_loop);
	};
	
	var init = function(canvasElm) {
		canvas = canvasElm;
		graphics = canvas.getContext('2d');
		_requestAnimFrame(_loop);
	};
	
	/**
	 * Using requestAnimationFrame instead of a simple `setTimeout` allows us to
	 *  get higher performance, by not blocking the browser when its trying to
	 *  render a frame
	 */
	var _requestAnimFrame = window.requestAnimationFrame
			|| window.webkitRequestAnimationFrame
			|| window.mozRequestAnimationFrame
			|| function (callback) {
				window.setTimeout(callback, targetFrameRate);
			};
		
	var self = {
		init: init
	};
	return self;
})();
