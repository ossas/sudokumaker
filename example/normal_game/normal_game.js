(function () {
	var gameData = sdm.getGameData();
	var gameBody = document.getElementById('sdoku_body');
	var str = [];
	for ( var i = 0; i < 3; i++) {
		str.push("<div class='outter_field'>");
		for ( var j = 0; j < 3; j++) {
			for ( var k = 0; k < 3; k++) {
				str.push("<div class='middle_field'><div class='inner_field'>" + gameData[j][i][k] + "</div></div>");
			}
		}
		gameBody.innerHTML += str.join(' ') + '</div>';
		str = [];
	}
	for ( var i = 0; i < 3; i++) {
		str.push("<div class='outter_field'>");
		for ( var j = 3; j < 6; j++) {
			for ( var k = 0; k < 3; k++) {
				str.push("<div class='middle_field'><div class='inner_field'>" + gameData[j][i][k] + "</div></div>");
			}
		}
		gameBody.innerHTML += str.join(' ') + '</div>';
		str = [];
	}
	for ( var i = 0; i < 3; i++) {
		str.push("<div class='outter_field'>");
		for ( var j = 6; j < 9; j++) {
			for ( var k = 0; k < 3; k++) {
				str.push("<div class='middle_field'><div class='inner_field'>" + gameData[j][i][k] + "</div></div>");
			}
		}
		gameBody.innerHTML += str.join(' ') + '</div>';
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
			document.getElementsByClassName('inner_field')[cnt].style['visibility'] = 'visible';
		}
	}
	visible();
})();
