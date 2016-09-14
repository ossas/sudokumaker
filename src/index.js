'use strict';

import { TilePattern, GamePattern } from './Pattern';
import { PlayTypes } from './Constants';

export default class sudokuMaker {
	constructor() {
		this.gameType = 'random';
	}	

	initRndNum() {
		let baseData = [];
		const number = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
		for ( let i = 0; i < 3; i++) {
			for ( let j = 0; j < 3; j++) {
				if(!baseData[j]) {
					baseData[j] = [];
				}
				baseData[j][i] = [];
				baseData[j][i] = (number.splice(Math.floor(Math.random() * number.length), 1))[0];
			}
		}
		return baseData;
	}

	init() {
		// this.initRndNum();
	}

	createGame() {
		const baseData = this.initRndNum();
		let number = Math.floor((Math.random() * GamePattern.length));
		let type = GamePattern[number];
		let gameData = [];

		gameData = type.map((data, index) => {
			return moveCard(baseData, TilePattern[data]);
		});

		if(this.gameType === 'random') {
			var randomGamePattern = objectClone(gameData);
			var value = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80']
			var end = 40;
			var start = 25;
			var pick_cnt = Math.floor((Math.random() * (end-start+1)) + start);

			for(var i = 0; i < pick_cnt; i++) {
				var pick_idx = Math.floor(Math.random() * value.length);
				var coord = getCoordByCount(value[pick_idx]);
				randomGamePattern[coord.i][coord.j][coord.k] = undefined;
				value.splice(pick_idx, 1);
			}

			gameData = {
				org : gameData,
				data: randomGamePattern
			}
		}

		return gameData;
	}


	gameDataCheck(gameData) {
		const checkData = {
			state: PlayTypes.COMPLETE,
			box: {},
			rows: {},
			cols: {}
		};

		var isSolving = false;
		var isFail = false;

		for(var i = 0; i < 9; i++) {
			var duplicate = [];
			gameData[i].forEach(function (items, _j) {
				items.forEach(function (item, _k) {
					var prev_item_idx = duplicate.indexOf(item);
					if(prev_item_idx >= 0 && item) {
						isFail = true;
						var key = '' + i + _j + _k;
						checkData.box[key] = {
							_i : i,
							_j : _j,
							_k : _k
						};

						var p_j = Math.floor(prev_item_idx / 3);
						var p_k = prev_item_idx % 3;
						var prev_key = '' + i + p_j + p_k;

						checkData.box[prev_key] = {
							_i : i,
							_j : p_j,
							_k : p_k
						};
					} else if(!item){
						isSolving = true;
					}
					duplicate.push(item);
				});
			});
		}

		for(var i = 0; i < 9; i=i+3) {
			for(var j = 0; j < 3; j++) {
				var duplicate = [];
				var rows = gameData[i][j].concat(gameData[i+1][j], gameData[i+2][j]);
				rows.forEach(function (item, idx) {
					var _i = i + Math.floor(idx / 3);
					var _k = idx % 3;
					var prev_item_idx = duplicate.indexOf(item);
					if(prev_item_idx >= 0 && item) {
						isFail = true;
						var key = '' + _i + j + _k;
						checkData.rows[key] = {
							_i : _i,
							_j : j,
							_k : _k
						};

						var p_i = i + Math.floor(prev_item_idx / 3);							
						var p_k = prev_item_idx % 3;							

						var prev_key = '' + p_i + j + p_k;

						checkData.rows[prev_key] = {
							_i : p_i,
							_j : j,
							_k : p_k
						};
					} else if(!item){
						isSolving = true;
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

				cols.push(gameData[i][j][k]);
				cols.push(gameData[i][j+1][k]);
				cols.push(gameData[i][j+2][k]);
				cols.push(gameData[i+3][j][k]);
				cols.push(gameData[i+3][j+1][k]);
				cols.push(gameData[i+3][j+2][k]);
				cols.push(gameData[i+6][j][k]);
				cols.push(gameData[i+6][j+1][k]);
				cols.push(gameData[i+6][j+2][k]);

				cols.forEach(function (item, idx) {
					var _i = (Math.floor(idx/3) * 3) + i;
					var _j = idx % 3;
					var prev_item_idx = duplicate.indexOf(item);
					if(prev_item_idx >= 0 && item) {
						isFail = true;
						var key = '' + _i + _j + k;
						checkData.cols[key] = {
							_i : _i,
							_j : _j,
							_k : k
						};

						var p_i = (Math.floor(prev_item_idx/3) * 3) + i;
						var p_j = prev_item_idx % 3;
						var prev_key = '' + p_i + p_j + k;
						checkData.cols[prev_key] = {
							_i : p_i,
							_j : p_j,
							_k : k
						};
					} else if(!item){
						isSolving = true;
					}
					duplicate.push(item);
				});
			}
		}

		if(isFail) {
			checkData.state = PlayTypes.FAIL;
		} else if(isSolving) {
			checkData.state = PlayTypes.SOLVING;
		}

		return checkData;
	}
}

function searchXY(data, value) {
	var temp = [];
	for ( var i = 0; i < 3; i++) {
		temp = temp.concat(data[i]);
	}
	return temp[value]
}

function moveCard(data, pattern) {
	var result = [ [ 0, 0, 0 ], [ 0, 0, 0 ], [ 0, 0, 0 ] ];
	var getTable = [];
	for ( var i = 0; i < 3; i++) {
		for ( var j = 0; j < 3; j++) {
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
	var _j = Math.floor((count % 9) / 3);
	var _k = Math.floor((count % 9) % 3);

	return {
		i: _i,
		j: _j,
		k: _k
	}
}

if(window) {
	window.SudokuMaker = sudokuMaker;
}