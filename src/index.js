'use strict';

import { TilePattern, GamePattern } from './pattern';
import { PlayTypes, CreateTypes } from './constants';

class sudokuMaker {
	constructor() {
		this.createType = CreateTypes.RANDOM;
	}	

	setType(type) {
		this.createType = type || CreateTypes.RANDOM;
	}

	getType() {
		const createType = this.createType || CreateTypes.RANDOM;
		return createType;
	}

	createGame() {
		const baseData = initRndNum();
		let number = Math.floor((Math.random() * GamePattern.length));
		let type = GamePattern[number];
		let gameData = [];

		gameData = type.map((data, index) => {
			return moveCard(baseData, TilePattern[data]);
		});

		if(this.createType === CreateTypes.RANDOM) {
			const end = 40;
			const start = 25;
			const pick_cnt = Math.floor((Math.random() * (end-start+1)) + start);
			let randomGamePattern = objectClone(gameData);
			let value = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80']

			for(let i = 0; i < pick_cnt; i++) {
				const pick_idx = Math.floor(Math.random() * value.length);
				const coord = getCoordByCount(value[pick_idx]);
				randomGamePattern[coord.i][coord.j][coord.k] = undefined;
				value.splice(pick_idx, 1);
			}

			gameData = {
				correctData : gameData,
				data: randomGamePattern
			}
		}

		return gameData;
	}


	gameDataCheck(gameData) {
		const checkData = {
			state: PlayTypes.SUCCESS,
			box: {},
			rows: {},
			cols: {}
		};

		let isSolving = false;
		let isFail = false;

		for(let i = 0; i < 9; i++) {
			const duplicate = [];
			gameData[i].forEach(function (items, _j) {
				items.forEach(function (item, _k) {
					let prev_item_idx = duplicate.indexOf(item);
					if(prev_item_idx >= 0 && item) {
						isFail = true;
						let key = '' + i + _j + _k;
						checkData.box[key] = {
							_i : i,
							_j : _j,
							_k : _k
						};

						let p_j = Math.floor(prev_item_idx / 3);
						let p_k = prev_item_idx % 3;
						let prev_key = '' + i + p_j + p_k;

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

		for(let i = 0; i < 9; i=i+3) {
			for(let j = 0; j < 3; j++) {
				let duplicate = [];
				let rows = gameData[i][j].concat(gameData[i+1][j], gameData[i+2][j]);
				rows.forEach(function (item, idx) {
					let _i = i + Math.floor(idx / 3);
					let _k = idx % 3;
					let prev_item_idx = duplicate.indexOf(item);
					if(prev_item_idx >= 0 && item) {
						isFail = true;
						let key = '' + _i + j + _k;
						checkData.rows[key] = {
							_i : _i,
							_j : j,
							_k : _k
						};

						let p_i = i + Math.floor(prev_item_idx / 3);							
						let p_k = prev_item_idx % 3;							

						let prev_key = '' + p_i + j + p_k;

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

		for(let i = 0; i < 3; i++) {
			for(let k = 0; k < 3; k++) {
				let duplicate = [];
				let j = 0;

				let cols = [];

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
					let _i = (Math.floor(idx/3) * 3) + i;
					let _j = idx % 3;
					let prev_item_idx = duplicate.indexOf(item);
					if(prev_item_idx >= 0 && item) {
						isFail = true;
						let key = '' + _i + _j + k;
						checkData.cols[key] = {
							_i : _i,
							_j : _j,
							_k : k
						};

						let p_i = (Math.floor(prev_item_idx/3) * 3) + i;
						let p_j = prev_item_idx % 3;
						let prev_key = '' + p_i + p_j + k;
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
		} else {
			PlayTypes.state = PlayTypes.SUCCESS;
		}

		return checkData;
	}
}

function initRndNum() {
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

function searchXY(data, value) {
	let temp = [];
	for ( let i = 0; i < 3; i++) {
		temp = temp.concat(data[i]);
	}
	return temp[value]
}

function moveCard(data, pattern) {
	let result = [ [ 0, 0, 0 ], [ 0, 0, 0 ], [ 0, 0, 0 ] ];
	let getTable = [];
	for ( let i = 0; i < 3; i++) {
		for ( let j = 0; j < 3; j++) {
			result[i][j] = searchXY(data, pattern[i][j]);
		}
	}
	return result;
}

function objectClone(object) {
	return JSON.parse(JSON.stringify(object));
}

function getCoordByCount(count) {
	let _i = Math.floor((count - 1) / 9);
	let _j = Math.floor((count % 9) / 3);
	let _k = Math.floor((count % 9) % 3);

	return {
		i: _i,
		j: _j,
		k: _k
	}
}

export default new sudokuMaker;