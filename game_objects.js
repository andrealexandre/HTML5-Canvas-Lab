game = {
	barLeft : {
		width : 15,
		height : 80,
		position : { x : 25, y : 100 },
		direction : { dx : 0, dy : 0},
		color : "rgb(200,0,0)"
	},

	barRight : {
		width : 15,
		height : 80,
		position : { x : (WIDTH - (25 + 15)), y : 100 },
		direction : { dx : 0, dy : 0},
		color : "rgb(0,200,0)"
	},

	ball : {
		radius : 10,			
		position : { x : 150, y : 150 },
		direction : { dx : 2, dy : 2},
		color : "rgb(0,0,0)"
	}
};	