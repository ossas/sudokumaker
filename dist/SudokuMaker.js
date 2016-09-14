var SudokuMaker =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Pattern = __webpack_require__(2);

	var _Constants = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var sudokuMaker = function () {
		function sudokuMaker() {
			_classCallCheck(this, sudokuMaker);

			this.gameType = 'random';
		}

		_createClass(sudokuMaker, [{
			key: 'initRndNum',
			value: function initRndNum() {
				var baseData = [];
				var number = [1, 2, 3, 4, 5, 6, 7, 8, 9];
				for (var i = 0; i < 3; i++) {
					for (var j = 0; j < 3; j++) {
						if (!baseData[j]) {
							baseData[j] = [];
						}
						baseData[j][i] = [];
						baseData[j][i] = number.splice(Math.floor(Math.random() * number.length), 1)[0];
					}
				}
				return baseData;
			}
		}, {
			key: 'init',
			value: function init() {
				// this.initRndNum();
			}
		}, {
			key: 'createGame',
			value: function createGame() {
				var baseData = this.initRndNum();
				var number = Math.floor(Math.random() * _Pattern.GamePattern.length);
				var type = _Pattern.GamePattern[number];
				var gameData = [];

				gameData = type.map(function (data, index) {
					return moveCard(baseData, _Pattern.TilePattern[data]);
				});

				if (this.gameType === 'random') {
					var randomGamePattern = objectClone(gameData);
					var value = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80'];
					var end = 40;
					var start = 25;
					var pick_cnt = Math.floor(Math.random() * (end - start + 1) + start);

					for (var i = 0; i < pick_cnt; i++) {
						var pick_idx = Math.floor(Math.random() * value.length);
						var coord = getCoordByCount(value[pick_idx]);
						randomGamePattern[coord.i][coord.j][coord.k] = undefined;
						value.splice(pick_idx, 1);
					}

					gameData = {
						org: gameData,
						data: randomGamePattern
					};
				}

				return gameData;
			}
		}, {
			key: 'gameDataCheck',
			value: function gameDataCheck(gameData) {
				var checkData = {
					state: _Constants.PlayTypes.COMPLETE,
					box: {},
					rows: {},
					cols: {}
				};

				var isSolving = false;
				var isFail = false;

				for (var i = 0; i < 9; i++) {
					var duplicate = [];
					gameData[i].forEach(function (items, _j) {
						items.forEach(function (item, _k) {
							var prev_item_idx = duplicate.indexOf(item);
							if (prev_item_idx >= 0 && item) {
								isFail = true;
								var key = '' + i + _j + _k;
								checkData.box[key] = {
									_i: i,
									_j: _j,
									_k: _k
								};

								var p_j = Math.floor(prev_item_idx / 3);
								var p_k = prev_item_idx % 3;
								var prev_key = '' + i + p_j + p_k;

								checkData.box[prev_key] = {
									_i: i,
									_j: p_j,
									_k: p_k
								};
							} else if (!item) {
								isSolving = true;
							}
							duplicate.push(item);
						});
					});
				}

				for (var i = 0; i < 9; i = i + 3) {
					for (var j = 0; j < 3; j++) {
						var duplicate = [];
						var rows = gameData[i][j].concat(gameData[i + 1][j], gameData[i + 2][j]);
						rows.forEach(function (item, idx) {
							var _i = i + Math.floor(idx / 3);
							var _k = idx % 3;
							var prev_item_idx = duplicate.indexOf(item);
							if (prev_item_idx >= 0 && item) {
								isFail = true;
								var key = '' + _i + j + _k;
								checkData.rows[key] = {
									_i: _i,
									_j: j,
									_k: _k
								};

								var p_i = i + Math.floor(prev_item_idx / 3);
								var p_k = prev_item_idx % 3;

								var prev_key = '' + p_i + j + p_k;

								checkData.rows[prev_key] = {
									_i: p_i,
									_j: j,
									_k: p_k
								};
							} else if (!item) {
								isSolving = true;
							}
							duplicate.push(item);
						});
					}
				}

				for (var i = 0; i < 3; i++) {
					for (var k = 0; k < 3; k++) {
						var duplicate = [];
						var j = 0;

						var cols = [];

						cols.push(gameData[i][j][k]);
						cols.push(gameData[i][j + 1][k]);
						cols.push(gameData[i][j + 2][k]);
						cols.push(gameData[i + 3][j][k]);
						cols.push(gameData[i + 3][j + 1][k]);
						cols.push(gameData[i + 3][j + 2][k]);
						cols.push(gameData[i + 6][j][k]);
						cols.push(gameData[i + 6][j + 1][k]);
						cols.push(gameData[i + 6][j + 2][k]);

						cols.forEach(function (item, idx) {
							var _i = Math.floor(idx / 3) * 3 + i;
							var _j = idx % 3;
							var prev_item_idx = duplicate.indexOf(item);
							if (prev_item_idx >= 0 && item) {
								isFail = true;
								var key = '' + _i + _j + k;
								checkData.cols[key] = {
									_i: _i,
									_j: _j,
									_k: k
								};

								var p_i = Math.floor(prev_item_idx / 3) * 3 + i;
								var p_j = prev_item_idx % 3;
								var prev_key = '' + p_i + p_j + k;
								checkData.cols[prev_key] = {
									_i: p_i,
									_j: p_j,
									_k: k
								};
							} else if (!item) {
								isSolving = true;
							}
							duplicate.push(item);
						});
					}
				}

				if (isFail) {
					checkData.state = _Constants.PlayTypes.FAIL;
				} else if (isSolving) {
					checkData.state = _Constants.PlayTypes.SOLVING;
				}

				return checkData;
			}
		}]);

		return sudokuMaker;
	}();

	exports.default = sudokuMaker;


	function searchXY(data, value) {
		var temp = [];
		for (var i = 0; i < 3; i++) {
			temp = temp.concat(data[i]);
		}
		return temp[value];
	}

	function moveCard(data, pattern) {
		var result = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
		var getTable = [];
		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 3; j++) {
				result[i][j] = searchXY(data, pattern[i][j]);
			}
		}
		return result;
	}

	function objectClone(object) {
		return JSON.parse(JSON.stringify(object));
	}

	function getCoordByCount(count) {
		var _i = Math.floor((count - 1) / 9);
		var _j = Math.floor(count % 9 / 3);
		var _k = Math.floor(count % 9 % 3);

		return {
			i: _i,
			j: _j,
			k: _k
		};
	}

	if (window) {
		window.SudokuMaker = sudokuMaker;
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	'use strict;';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var TilePattern = {};
	TilePattern["A"] = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
	TilePattern["B"] = [[1, 2, 0], [4, 5, 3], [7, 8, 6]];
	TilePattern["C"] = [[2, 0, 1], [5, 3, 4], [8, 6, 7]];
	TilePattern["D"] = [[3, 4, 5], [6, 7, 8], [0, 1, 2]];
	TilePattern["E"] = [[4, 5, 3], [7, 8, 6], [1, 2, 0]];
	TilePattern["F"] = [[5, 3, 4], [8, 6, 7], [2, 0, 1]];
	TilePattern["G"] = [[6, 7, 8], [0, 1, 2], [3, 4, 5]];
	TilePattern["H"] = [[7, 8, 6], [1, 2, 0], [4, 5, 3]];
	TilePattern["I"] = [[8, 6, 7], [2, 0, 1], [5, 3, 4]];
	TilePattern["J"] = [[8, 7, 6], [2, 1, 0], [5, 4, 3]];
	TilePattern["K"] = [[4, 3, 5], [7, 6, 8], [1, 0, 2]];
	TilePattern["L"] = [[6, 8, 7], [0, 2, 1], [3, 5, 4]];
	TilePattern["M"] = [[4, 8, 1], [7, 5, 6], [2, 0, 3]];
	TilePattern["N"] = [[8, 2, 4], [5, 6, 7], [1, 3, 0]];
	TilePattern["O"] = [[6, 5, 8], [0, 7, 2], [3, 4, 1]];
	TilePattern["P"] = [[7, 2, 6], [4, 3, 0], [8, 1, 5]];
	TilePattern["Q"] = [[5, 6, 7], [1, 0, 3], [2, 8, 4]];
	TilePattern["R"] = [[7, 4, 3], [6, 1, 8], [0, 5, 2]];
	TilePattern["S"] = [[3, 0, 5], [2, 8, 1], [4, 6, 7]];
	TilePattern["T"] = [[1, 3, 0], [8, 2, 4], [5, 7, 6]];
	TilePattern["U"] = [[4, 2, 0], [5, 3, 1], [8, 6, 7]];
	TilePattern["V"] = [[7, 5, 4], [1, 8, 3], [2, 0, 6]];
	TilePattern["W"] = [[8, 5, 3], [7, 0, 6], [2, 4, 1]];
	TilePattern["X"] = [[6, 1, 7], [0, 2, 8], [4, 3, 5]];
	TilePattern["Y"] = [[1, 8, 2], [5, 6, 0], [3, 7, 4]];
	TilePattern["Z"] = [[6, 4, 7], [2, 1, 8], [0, 3, 5]];
	TilePattern["AA"] = [[5, 8, 3], [7, 6, 4], [1, 2, 0]];
	TilePattern["AB"] = [[3, 0, 6], [4, 7, 2], [8, 5, 1]];

	var GamePattern = [];
	GamePattern[0] = ["A", "D", "G", "B", "E", "H", "C", "F", "I"];
	GamePattern[1] = ["A", "G", "D", "B", "H", "E", "C", "I", "F"];
	GamePattern[2] = ["A", "G", "D", "C", "I", "F", "B", "H", "E"];
	GamePattern[3] = ["A", "J", "F", "I", "K", "A", "B", "L", "E"];
	GamePattern[4] = ["A", "G", "D", "F", "C", "I", "E", "B", "H"];
	GamePattern[5] = ["A", "O", "R", "M", "P", "S", "N", "Q", "T"];
	GamePattern[6] = ["A", "R", "O", "M", "S", "P", "N", "T", "Q"];
	GamePattern[7] = ["A", "R", "O", "N", "T", "Q", "M", "S", "P"];
	GamePattern[8] = ["A", "O", "R", "N", "Q", "T", "M", "P", "S"];
	GamePattern[9] = ["A", "W", "Z", "U", "X", "AA", "V", "Y", "AB"];
	GamePattern[10] = ["A", "Z", "W", "U", "AA", "X", "V", "AB", "Y"];
	GamePattern[11] = ["A", "Z", "W", "V", "AB", "Y", "U", "AA", "X"];
	GamePattern[12] = ["A", "W", "Z", "V", "Y", "AB", "U", "X", "AA"];

	console.log(GamePattern);

	exports.TilePattern = TilePattern;
	exports.GamePattern = GamePattern;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	'use strict;';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var PlayTypes = {
		SUCCESS: 'SUCCESS',
		FAIL: 'FAIL',
		SOLVING: 'SOLVING'
	};

	exports.PlayTypes = PlayTypes;

/***/ }
/******/ ]);