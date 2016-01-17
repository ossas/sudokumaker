'use strict';

(function(window) {
	var sdm  = (function () {
		var my = {};

		let a = 1;
		const b = 1;

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

		my.getGameData = function(game_type) {
			initRndNum();
			var number = Math.floor((Math.random() * _GAME.length));
			var type = _GAME[number];
			var game_data = [];

			type.forEach(function (data, index) {
				game_data.push(moveCard(_target, _PATTERN[data]));
			});

			if(game_type === 'random') {
				var random_game = game_data;
				var value = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80']
				var end = 30;
				var start = 15;
				var pick_cnt = Math.floor((Math.random() * (end-start+1)) + start);

				for(var i = 0; i < pick_cnt; i++) {
					var pick_idx = Math.floor(Math.random() * value.length);
					var coord = getCoordByCount(value[pick_idx]);
					try{

					random_game[coord.i][coord.j][coord.k] = undefined;
					} catch(e) {
						console.error(coord);
						console.error(value[pick_idx]);
					}
					value.splice(pick_idx, pick_idx++);
				}


				game_data = {
					org : game_data,
					data: random_game
				}
			}

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

		var getCoordByCount = function (count) {
			var _i = Math.floor((count - 1) / 9);
			var _j = Math.floor((count % 9) / 3);
			var _k = Math.floor((count % 9) % 3);

			return {
				i: _i,
				j: _j,
				k: _k
			}
		}
		
		return my;
	})();

	window.sdm = sdm;

})(window);