'use strict;'

const TilePattern = {};
TilePattern["A"] = [ [ 0, 1, 2 ], [ 3, 4, 5 ], [ 6, 7, 8 ] ];
TilePattern["B"] = [ [ 1, 2, 0 ], [ 4, 5, 3 ], [ 7, 8, 6 ] ];
TilePattern["C"] = [ [ 2, 0, 1 ], [ 5, 3, 4 ], [ 8, 6, 7 ] ];
TilePattern["D"] = [ [ 3, 4, 5 ], [ 6, 7, 8 ], [ 0, 1, 2 ] ];
TilePattern["E"] = [ [ 4, 5, 3 ], [ 7, 8, 6 ], [ 1, 2, 0 ] ];
TilePattern["F"] = [ [ 5, 3, 4 ], [ 8, 6, 7 ], [ 2, 0, 1 ] ];
TilePattern["G"] = [ [ 6, 7, 8 ], [ 0, 1, 2 ], [ 3, 4, 5 ] ];
TilePattern["H"] = [ [ 7, 8, 6 ], [ 1, 2, 0 ], [ 4, 5, 3 ] ];
TilePattern["I"] = [ [ 8, 6, 7 ], [ 2, 0, 1 ], [ 5, 3, 4 ] ];
TilePattern["J"] = [ [ 8, 7, 6 ], [ 2, 1, 0 ], [ 5, 4, 3 ] ];
TilePattern["K"] = [ [ 4, 3, 5 ], [ 7, 6, 8 ], [ 1, 0, 2 ] ];
TilePattern["L"] = [ [ 6, 8, 7 ], [ 0, 2, 1 ], [ 3, 5, 4 ] ];
TilePattern["M"] = [ [ 4, 8, 1 ], [ 7, 5, 6 ], [ 2, 0, 3 ] ];
TilePattern["N"] = [ [ 8, 2, 4 ], [ 5, 6, 7 ], [ 1, 3, 0 ] ];
TilePattern["O"] = [ [ 6, 5, 8 ], [ 0, 7, 2 ], [ 3, 4, 1 ] ];
TilePattern["P"] = [ [ 7, 2, 6 ], [ 4, 3, 0 ], [ 8, 1, 5 ] ];
TilePattern["Q"] = [ [ 5, 6, 7 ], [ 1, 0, 3 ], [ 2, 8, 4 ] ];
TilePattern["R"] = [ [ 7, 4, 3 ], [ 6, 1, 8 ], [ 0, 5, 2 ] ];
TilePattern["S"] = [ [ 3, 0, 5 ], [ 2, 8, 1 ], [ 4, 6, 7 ] ];
TilePattern["T"] = [ [ 1, 3, 0 ], [ 8, 2, 4 ], [ 5, 7, 6 ] ];
TilePattern["U"] = [ [ 4, 2, 0 ], [ 5, 3, 1 ], [ 8, 6, 7 ] ];
TilePattern["V"] = [ [ 7, 5, 4 ], [ 1, 8, 3 ], [ 2, 0, 6 ] ];
TilePattern["W"] = [ [ 8, 5, 3 ], [ 7, 0, 6 ], [ 2, 4, 1 ] ];
TilePattern["X"] = [ [ 6, 1, 7 ], [ 0, 2, 8 ], [ 4, 3, 5 ] ];
TilePattern["Y"] = [ [ 1, 8, 2 ], [ 5, 6, 0 ], [ 3, 7, 4 ] ];
TilePattern["Z"] = [ [ 6, 4, 7 ], [ 2, 1, 8 ], [ 0, 3, 5 ] ];
TilePattern["AA"] = [ [ 5, 8, 3 ], [ 7, 6, 4 ], [ 1, 2, 0 ] ];
TilePattern["AB"] = [ [ 3, 0, 6 ], [ 4, 7, 2 ], [ 8, 5, 1 ] ];

const GamePattern = [];
GamePattern[0] = [ "A", "D", "G", "B", "E", "H", "C", "F", "I" ];
GamePattern[1] = [ "A", "G", "D", "B", "H", "E", "C", "I", "F" ];
GamePattern[2] = [ "A", "G", "D", "C", "I", "F", "B", "H", "E" ];
GamePattern[3] = [ "A", "J", "F", "I", "K", "A", "B", "L", "E" ];
GamePattern[4] = [ "A", "G", "D", "F", "C", "I", "E", "B", "H" ];
GamePattern[5] = [ "A", "O", "R", "M", "P", "S", "N", "Q", "T" ];
GamePattern[6] = [ "A", "R", "O", "M", "S", "P", "N", "T", "Q" ];
GamePattern[7] = [ "A", "R", "O", "N", "T", "Q", "M", "S", "P" ];
GamePattern[8] = [ "A", "O", "R", "N", "Q", "T", "M", "P", "S" ];
GamePattern[9] = [ "A", "W", "Z", "U", "X", "AA", "V", "Y", "AB" ];
GamePattern[10] = [ "A", "Z", "W", "U", "AA", "X", "V", "AB", "Y" ];
GamePattern[11] = [ "A", "Z", "W", "V", "AB", "Y", "U", "AA", "X" ];
GamePattern[12] = [ "A", "W", "Z", "V", "Y", "AB", "U", "X", "AA" ];

export {
	TilePattern,
	GamePattern
}
