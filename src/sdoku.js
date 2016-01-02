(function(window, $) {
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


		var mask = {};
		mask["A"] = [ [ 0, 1, 2 ], [ 3, 4, 5 ], [ 6, 7, 8 ] ];
		mask["B"] = [ [ 1, 2, 0 ], [ 4, 5, 3 ], [ 7, 8, 6 ] ];
		mask["C"] = [ [ 2, 0, 1 ], [ 5, 3, 4 ], [ 8, 6, 7 ] ];
		mask["D"] = [ [ 3, 4, 5 ], [ 6, 7, 8 ], [ 0, 1, 2 ] ];
		mask["E"] = [ [ 4, 5, 3 ], [ 7, 8, 6 ], [ 1, 2, 0 ] ];
		mask["F"] = [ [ 5, 3, 4 ], [ 8, 6, 7 ], [ 2, 0, 1 ] ];
		mask["G"] = [ [ 6, 7, 8 ], [ 0, 1, 2 ], [ 3, 4, 5 ] ];
		mask["H"] = [ [ 7, 8, 6 ], [ 1, 2, 0 ], [ 4, 5, 3 ] ];
		mask["I"] = [ [ 8, 6, 7 ], [ 2, 0, 1 ], [ 5, 3, 4 ] ];
		mask["J"] = [ [ 8, 7, 6 ], [ 2, 1, 0 ], [ 5, 4, 3 ] ];
		mask["K"] = [ [ 4, 3, 5 ], [ 7, 6, 8 ], [ 1, 0, 2 ] ];
		mask["L"] = [ [ 6, 8, 7 ], [ 0, 2, 1 ], [ 3, 5, 4 ] ];
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

		my.getGameData = function() {
			initRndNum();
			var number = Math.floor((Math.random() * gameType.length));
			var type = gameType[number];
			var game_data = [];

			type.forEach(function (data, index) {
				game_data.push(moveCard(_target, mask[data]));
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

		// 00 10 20
		// 01 11 21
		// 02 12 22
		// 30 40 50
		// 31 41 51
		// 32 42 52
		// 60 70 80
		// 61 71 81
		// 62 72 82
		// var gameData = setGameData();

		/*
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
		*/
		
		
		return my;
	})();

	window.sdm = sdm;

})(window, jQuery);