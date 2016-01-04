"use strict";

(function(window) {
	var sdm  = (function () {
		var my = {};

		var master_count = 0;

		var _target = [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ];

		var initRndNum = function() {
			var number = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
			for ( var i = 0; i < 3; i++) {
				for ( var j = 0; j < 3; j++) {
					_target[j][i] = [];
					_target[j][i] = (number.splice(Math.floor(Math.random() * number.length), 1))[0];
				}
			}
		};

		

		my.init = function () {
			initRndNum();
		}

		my.getGameData = function() {
			initRndNum();
			var number = Math.floor((Math.random() * _GAME.length));
			var type = _GAME[number];
			var game_data = [];

			type.forEach(function (data, index) {
				game_data.push(moveCard(_target, _PATTERN[data]));
			});

			return game_data;
		}

		var searchXY = function(data, value) {
			var temp = [];
			for ( var i = 0; i < 3; i++) {
				temp = temp.concat(data[i]);
			}
			return temp[value]
		}

		var moveCard = function(data, pattern) {
			var result = [ [ 0, 0, 0 ], [ 0, 0, 0 ], [ 0, 0, 0 ] ];
			var getTable = [];
			for ( var i = 0; i < 3; i++) {
				for ( var j = 0; j < 3; j++) {
					result[i][j] = searchXY(data, pattern[i][j]);
				}
			}
			return result;
		};
		
		return my;
	})();

	window.sdm = sdm;

})(window);