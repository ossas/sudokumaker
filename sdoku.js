$(function() {
	var target = [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ]

	var setting = function() {
		var number = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
		for ( var i = 0; i < 3; i++) {
			for ( var j = 0; j < 3; j++) {
				target[j][i] = [];
				target[j][i] = (number.splice(Math.floor(Math.random() * number.length), 1))[0];
			}
		}
	}();
	var mask = {};
	mask["M"] = [ [ 4, 8, 1 ], [ 7, 5, 6 ], [ 2, 0, 3 ] ];
	mask["N"] = [ [ 8, 2, 4 ], [ 5, 6, 7 ], [ 1, 3, 0 ] ];
	mask["O"] = [ [ 6, 5, 8 ], [ 0, 7, 2 ], [ 3, 4, 1 ] ];
	mask["P"] = [ [ 7, 2, 6 ], [ 4, 3, 0 ], [ 8, 1, 5 ] ];
	mask["Q"] = [ [ 5, 6, 7 ], [ 1, 0, 3 ], [ 2, 8, 4 ] ];
	mask["R"] = [ [ 7, 4, 3 ], [ 6, 1, 8 ], [ 0, 5, 2 ] ];
	mask["S"] = [ [ 3, 0, 5 ], [ 2, 8, 1 ], [ 4, 6, 7 ] ];
	mask["T"] = [ [ 1, 3, 0 ], [ 8, 2, 4 ], [ 5, 7, 6 ] ];
	mask["U"] = [ [ 4, 2, 0 ], [ 5, 3, 1 ], [ 8, 6, 7 ] ];
	mask["V"] = [ [ 7, 5, 4 ], [ 1, 8, 3 ], [ 2, 0, 6 ] ];
	mask["W"] = [ [ 8, 5, 3 ], [ 7, 0, 6 ], [ 2, 4, 1 ] ];
	mask["X"] = [ [ 6, 1, 7 ], [ 0, 2, 8 ], [ 4, 3, 5 ] ];
	mask["Y"] = [ [ 1, 8, 2 ], [ 5, 6, 0 ], [ 3, 7, 4 ] ];
	mask["Z"] = [ [ 6, 4, 7 ], [ 2, 1, 8 ], [ 0, 3, 5 ] ];
	mask["AA"] = [ [ 5, 8, 3 ], [ 7, 6, 4 ], [ 1, 2, 0 ] ];
	mask["AB"] = [ [ 3, 0, 6 ], [ 4, 7, 2 ], [ 8, 5, 1 ] ];

	var matrix = {};
	matrix["m1"] = [ [ 1, 0, 0 ], [ 0, 1, 0 ], [ 0, 0, 1 ] ];
	matrix["m2"] = [ [ 1, 0, 0 ], [ 0, 0, 1 ], [ 0, 1, 0 ] ];
	matrix["m3"] = [ [ 0, 1, 0 ], [ 1, 0, 0 ], [ 0, 0, 1 ] ];
	matrix["m4"] = [ [ 0, 1, 0 ], [ 0, 0, 1 ], [ 1, 0, 0 ] ];
	matrix["m5"] = [ [ 0, 0, 1 ], [ 1, 0, 0 ], [ 0, 1, 0 ] ];
	matrix["m6"] = [ [ 0, 0, 1 ], [ 0, 1, 0 ], [ 1, 0, 0 ] ];

	var pattern = {};
	pattern["A"] = function() {
		return multi(target, matrix["m1"]);
	};
	pattern["B"] = function() {
		return multi(target, matrix["m5"]);
	};
	pattern["C"] = function() {
		return multi(target, matrix["m4"]);
	};
	pattern["D"] = function() {
		return multi(matrix["m4"], target);
	};
	pattern["E"] = function() {
		return multi(multi(matrix["m4"], target), matrix["m5"]);
	};
	pattern["F"] = function() {
		return multi(multi(matrix["m4"], target), matrix["m4"]);
	};
	pattern["G"] = function() {
		return multi(matrix["m5"], target);
	};
	pattern["H"] = function() {
		return multi(multi(matrix["m5"], target), matrix["m5"]);
	};
	pattern["I"] = function() {
		return multi(multi(matrix["m5"], target), matrix["m4"]);
	};
	pattern["J"] = function() {
		return multi(multi(matrix["m5"], target), matrix["m6"]);
	};
	pattern["K"] = function() {
		return multi(multi(matrix["m4"], target), matrix["m3"]);
	};
	pattern["L"] = function() {
		return multi(multi(matrix["m5"], target), matrix["m2"]);
	};
	pattern["ALL"] = function(mask_name) {
		return moveCard(target, mask[mask_name]);
	};

	var gameType = [];
	gameType[0] = [ "A", "D", "G", "B", "E", "H", "C", "F", "I" ];
	gameType[1] = [ "A", "G", "D", "B", "H", "E", "C", "I", "F" ];
	gameType[2] = [ "A", "G", "D", "C", "I", "F", "B", "H", "E" ];
	gameType[3] = [ "A", "J", "F", "I", "K", "A", "B", "L", "E" ];
	gameType[4] = [ "A", "G", "D", "F", "C", "I", "E", "B", "H" ];
	gameType[5] = [ "A", "O", "R", "M", "P", "S", "N", "Q", "T" ];
	gameType[6] = [ "A", "R", "O", "M", "S", "P", "N", "T", "Q" ];
	gameType[7] = [ "A", "R", "O", "N", "T", "Q", "M", "S", "P" ];
	gameType[8] = [ "A", "O", "R", "N", "Q", "T", "M", "P", "S" ];
	gameType[9] = [ "A", "W", "Z", "U", "X", "AA", "V", "Y", "AB" ];
	gameType[10] = [ "A", "Z", "W", "U", "AA", "X", "V", "AB", "Y" ];
	gameType[11] = [ "A", "Z", "W", "V", "AB", "Y", "U", "AA", "X" ];
	gameType[12] = [ "A", "W", "Z", "V", "Y", "AB", "U", "X", "AA" ];

	var setGameData = function() {
		var number = Math.floor((Math.random() * gameType.length));
		var type = gameType[number];
		var game_data = [];
		$.each(type, function(index, data) {
			var patt = /[a-lA-L]/gi;
			console.log(data);
			if (patt.test(data) && data.length === 1) {
				game_data.push(pattern[data]());
			} else {
				game_data.push(pattern["ALL"](data));
			}
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

	var moveCard = function(data, mask) {
		var result = [ [ 0, 0, 0 ], [ 0, 0, 0 ], [ 0, 0, 0 ] ];
		var getTable = [];
		for ( var i = 0; i < 3; i++) {
			for ( var j = 0; j < 3; j++) {
				result[i][j] = searchXY(data, mask[i][j]);
			}
		}
		return result;
	};

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
	// 00 10 20
	// 01 11 21
	// 02 12 22
	// 30 40 50
	// 31 41 51
	// 32 42 52
	// 60 70 80
	// 61 71 81
	// 62 72 82
	var gameData = setGameData();
	var str = [];
	for ( var i = 0; i < 3; i++) {
		str.push("<div class='outter_field'>");
		for ( var j = 0; j < 3; j++) {
			for ( var k = 0; k < 3; k++) {
				str.push("<div class='middle_field'><div class='inner_field'>" + gameData[j][i][k] + "</div></div>");
			}
		}
		$("#sdoku_body").append(str.join(" "));
		$("#sdoku_body").append("</div>");
		str = [];
	}
	for ( var i = 0; i < 3; i++) {
		str.push("<div class='outter_field'>");
		for ( var j = 3; j < 6; j++) {
			for ( var k = 0; k < 3; k++) {
				str.push("<div class='middle_field'><div class='inner_field'>" + gameData[j][i][k] + "</div></div>");
			}
		}
		$("#sdoku_body").append(str.join(" "));
		$("#sdoku_body").append("</div>");
		str = [];
	}
	for ( var i = 0; i < 3; i++) {
		str.push("<div class='outter_field'>");
		for ( var j = 6; j < 9; j++) {
			for ( var k = 0; k < 3; k++) {
				str.push("<div class='middle_field'><div class='inner_field'>" + gameData[j][i][k] + "</div></div>");
			}
		}
		$("#sdoku_body").append(str.join(" "));
		$("#sdoku_body").append("</div>");
		str = [];
	}

	var visible_count = Math.floor(Math.random() * 30) + 35;

	var visible = function() {
		var number = [];
		for ( var i = 0; i < 81; i++) {
			number[i] = i;
		}
		for ( var i = 0; i < visible_count; i++) {
			var cnt = number.splice(Math.floor(Math.random() * number.length), 1)[0];
			console.log($(".inner_field:eq(" + cnt + ")"));
			$(".inner_field:eq(" + cnt + ")").css("visibility", "visible");
		}
	}
	visible();

	console.log(JSON.stringify(pattern["ALL"]("M")));
});