$(function() {

	// 배열 특정 인덱스 삭제
	window.arrayRemoveItem = function(data, field) {
		var data_length = data.length;
		var result = [];
		
		$.each(data, function (i, value) {
			if(field === data[i]) {
				result = data.slice(0, i);
				result = result.concat(data.slice(i + 1));
			}
		});
		if(result.length === 0) {
			result = data;
		}
		return result;
	};
	// 배열 특정 인덱스 삭제
	window.arrayAddItem = function(data, field) {
		var data_length = data.length;
		var result = [];
		
		$.each(data, function (i, value) {
			if(field === data[i]) {
				result.push(data[i]);
			}
		});

		return result;
	};

	var target = [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ];
	var target2 = [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ];
	var target3 = [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ];

	var gameData = [];
	var gameDummyData = [];

	var setting = function() {
		var number = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
		var number2 = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
		var number3 = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
		for ( var i = 0; i < 3; i++) {
			for ( var j = 0; j < 3; j++) {
				target[j][i] = [];
				target[j][i] = (number.splice(Math.floor(Math.random() * number.length), 1))[0];
				target2[j][i] = (number2.splice(Math.floor(Math.random() * number2.length), 1))[0];
				target3[j][i] = (number3.splice(Math.floor(Math.random() * number3.length), 1))[0];
			}
		}
	}();

	var multi = function(a, b) {
		var c = [];
		var d = [];
		for ( var i = 0; i < 3; i++) {
			for ( var j = 0; j < 3; j++) {
				d.push(a[i][0] * b[0][j] + a[i][1] * b[1][j] + a[i][2] * b[2][j]);
			}
			c.push(d);
			d = [];
		}
		return c;
	};

	// 01 02 03 04 05 06 07 08
	// 11 12 13 14 15 16 17 18
	// 21 22 23 24 25 26 27 28
	// 31 32 33 34 35 36 37 38
	// 41 42 43 44 45 46 47 48
	// 51 52 53 54 55 56 57 58
	// 61 62 63 64 65 66 67 68
	// 71 72 73 74 75 76 77 78
	// 81 82 83 84 85 86 87 88
	for ( var i = 0; i < 9; i++) {
		gameData[i] = [];
		gameDummyData[i] = [];
		for ( var j = 0; j < 9; j++) {
			gameData[i][j] = 0;
			gameDummyData[i][j] = 0;
		}
	}

	for ( var i = 0; i < 3; i++) {
		for ( var j = 0; j < 3; j++) {
			gameData[i][j] = target[i][j];
		}
	}

	for ( var i = 3; i < 6; i++) {
		for ( var j = 3; j < 6; j++) {
			gameData[i][j] = target2[i - 3][j - 3];
		}
	}

	for ( var i = 6; i < 9; i++) {
		for ( var j = 6; j < 9; j++) {
			gameData[i][j] = target3[i - 6][j - 6];
		}
	}

	for ( var i = 0; i < 9; i++) {
		console.log(JSON.stringify(gameData[i]));
	}

	var rowCheck = function() {
		var number = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
		var temp = [];
		var gameDummyData = []
		for ( var i = 0; i < 9; i++) {
			temp = number;
			for ( var j = 0; j < 9; j++) {
				if (gameData[i][j] > 0) {
					temp = arrayRemoveItem(temp, gameData[i][j]);
				}
			}
			for ( var j = 0; j < 9; j++) {
				if(!$.isArray(gameDummyData[i])){
					gameDummyData[i] = [];
				}
				if (gameData[i][j] === 0) {
					gameDummyData[i][j] = temp;
				}
				else {
					gameDummyData[i][j] = 0;
				}
			}
		}
		for ( var i = 0; i < 9; i++) {
//			console.log(JSON.stringify(gameDummyData[i]));
		}
		
		return gameDummyData;
	}
	
	var columnCheck = function() {
		var number = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
		var temp = [];
		var gameDummyData = []
		for ( var i = 0; i < 9; i++) {
			temp = number;
			for ( var j = 0; j < 9; j++) {
				if (gameData[j][i] > 0) {
					temp = arrayRemoveItem(temp, gameData[j][i]);
				}
			}
			for ( var j = 0; j < 9; j++) {
				if(!$.isArray(gameDummyData[j])){
					gameDummyData[j] = [];
				}
				if (gameData[j][i] === 0) {
					gameDummyData[j][i] = temp;
				}
				else {
					gameDummyData[j][i] = 0;
				}
			}
		}
		for ( var i = 0; i < 9; i++) {
//			console.log(JSON.stringify(gameDummyData[i]));
		}
		return gameDummyData;
	}
	var matrixCheck = function() {	
		
	}
	
	
	for(var T = 0; T < 81; T++){
		var rowTable = rowCheck();
		var columnTable = columnCheck();
		var clearTable = [];
		for(var i = 0; i < 9; i++) {
			for(var j = 0; j < 9; j++) {
				if(rowTable[i][j] !==0 && columnTable[i][j] !== 0) {
					clearTable = [];
					for(var value in rowTable[i][j]) {
						var temp = arrayAddItem(columnTable[i][j], rowTable[i][j][value])[0]
						if(temp){
							clearTable[clearTable.length] = temp;
						}
					}
					gameDummyData[i][j] = clearTable;
				}
			}
		}
		for ( var i = 0; i < 9; i++) {
			console.log(JSON.stringify(gameDummyData[i]));
		}
		
		break;
		var stop = false;
		for(var i = 0; i <9; i++ ) {
			for(var j = 0; j <9; j++ ) {
				if(gameData[i][j] === 0) {
					var number = gameDummyData[i][j];
					console.log(number);
					console.log((number.splice(Math.floor(Math.random() * number.length), 1))[0]);
					gameData[i][j] = (number.splice(Math.floor(Math.random() * number.length), 1))[0];
					stop = true;
					break;
				}
			}
			if(stop) {
				break;
			}
		}
	}
	
	console.log("");
	for ( var i = 0; i < 9; i++) {
		console.log(JSON.stringify(gameData[i]));
	}
});