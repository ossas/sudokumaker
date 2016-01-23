'use strict';

(function(window) {
	var sdm  = (function () {
		var my = {};

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
				var random_game = objectClone(game_data);
				var value = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80']
				var end = 40;
				var start = 25;
				var pick_cnt = Math.floor((Math.random() * (end-start+1)) + start);

				for(var i = 0; i < pick_cnt; i++) {
					var pick_idx = Math.floor(Math.random() * value.length);
					var coord = getCoordByCount(value[pick_idx]);
					random_game[coord.i][coord.j][coord.k] = undefined;
					value.splice(pick_idx, 1);
				}

				game_data = {
					org : game_data,
					data: random_game
				}
			}

			return game_data;
		}

		my.gameDataCheck = function (game_data) {
			var check_data = {
				box: {},
				rows: {},
				cols: {}
			};

			for(var i = 0; i < 9; i++) {
				var duplicate = [];
				game_data[i].forEach(function (items, _j) {
					items.forEach(function (item, _k) {
						var prev_item_idx = duplicate.indexOf(item);
						if(prev_item_idx >= 0 && item !== undefined) {
							var key = '' + i + _j + _k;
							check_data.box[key] = {
								_i : i,
								_j : _j,
								_k : _k
							};

							var p_j = Math.floor(prev_item_idx / 3);
							var p_k = prev_item_idx % 3;
							var prev_key = '' + i + p_j + p_k;

							check_data.box[prev_key] = {
								_i : i,
								_j : p_j,
								_k : p_k
							};
						}
						duplicate.push(item);
					});
				});
			}

			for(var i = 0; i < 9; i=i+3) {
				for(var j = 0; j < 3; j++) {
					var duplicate = [];
					var rows = game_data[i][j].concat(game_data[i+1][j], game_data[i+2][j]);
					rows.forEach(function (item, idx) {
						var _i = i + (i % 3);
						var _k = idx % 3;
						var prev_item_idx = duplicate.indexOf(item);
						if(prev_item_idx >= 0 && item !== undefined) {
							var key = '' + _i + j + _k;
							check_data.rows[key] = {
								_i : _i,
								_j : j,
								_k : _k
							};

							var p_i = i + (prev_item_idx % 3);							
							var p_k = prev_item_idx % 3;							

							var prev_key = '' + p_i + j + p_k;

							check_data.rows[prev_key] = {
								_i : p_i,
								_j : j,
								_k : p_k
							};
						}
						duplicate.push(item);
					});
				}
			}

			for(var i = 0; i < 3; i++) {
				for(var k = 0; k < 3; k++) {
					var duplicate = [];
					var j = 0;

					var cols = [];

					cols.push(game_data[i][j][k]);
					cols.push(game_data[i][j+1][k]);
					cols.push(game_data[i][j+2][k]);
					cols.push(game_data[i+3][j][k]);
					cols.push(game_data[i+3][j+1][k]);
					cols.push(game_data[i+3][j+2][k]);
					cols.push(game_data[i+6][j][k]);
					cols.push(game_data[i+6][j+1][k]);
					cols.push(game_data[i+6][j+2][k]);

					cols.forEach(function (item, idx) {
						var _i = (Math.floor(idx/3) * 3) + i;
						var _j = idx % 3;
						var prev_item_idx = duplicate.indexOf(item);
						if(prev_item_idx >= 0 && item !== undefined) {
							var key = '' + _i + _j + k;
							check_data.cols[key] = {
								_i : _i,
								_j : _j,
								_k : k
							};

							var p_i = (Math.floor(prev_item_idx/3) * 3) + i;
							var p_j = prev_item_idx % 3;
							var prev_key = '' + p_i + p_j + k;
							check_data.cols[prev_key] = {
								_i : p_i,
								_j : p_j,
								_k : k
							};
						}
						duplicate.push(item);
					});
				}
			}

			return check_data;
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
		}

		var objectClone = function (object) {
			return JSON.parse(JSON.stringify(object));
		}

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