game = new Object();

game = {
	velocityIncrement : 5.0,
	ballBaseSpeed : 2.0,
	ballSpeedIncreaseFactor : 1.025,
	collision : false,
	
	objects : {	
		init : function() {
			
			game.objects.bar_left = {
				width : 15,
				height : 80,
				position : { x : 25, y : 100 },
				direction : { dx : 0, dy : 0},
				color : "rgb(200,0,0)"
			};
			
			game.objects.bar_right = {
				width : 15,
				height : 80,
				position : { x : (game.WIDTH - (25 + 15)), y : 100 },
				direction : { dx : 0, dy : 0},
				color : "rgb(0,200,0)"
			};
			
			game.objects.ball = {
				radius : 10,			
				position : { x : game.WIDTH/2, y : game.HEIGHT/2 },
				direction : { dx : 2.0, dy : 2.0 },
				color : "rgb(0,0,0)"
			};
			
			game.objects.score_board = {
				left : 0,
				right : 0,
				font : "30px Arial"
			};
			
		}
	}
};