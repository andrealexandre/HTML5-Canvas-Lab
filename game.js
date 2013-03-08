(function() {			
	$(document).ready(function() {
		//get a reference to the canvas
		var canvas = $("#canvas");
		var ctx = canvas[0].getContext("2d"); // canvas context object
		var WIDTH = canvas.width();		// screen width
		var HEIGHT = canvas.height();	// screen height
		
		var velocityIncrement = 5.0;
		var ballBaseSpeed = 2.0;
		var ballSpeedIncreaseFactor = 1.025;
		var collision = false;
		
		var keyHandler = {			
			keyUp : {
				38 : function() { bar_right.direction.dy = 0; },	//UP
				40 : function() { bar_right.direction.dy = 0; },	//DOWN
				83 : function() { bar_left.direction.dy = 0; },	// S
				87 : function() { bar_left.direction.dy = 0; }	// W
			},	
			keyDown : {
				38 : function() { bar_right.direction.dy = -velocityIncrement; },	//UP			
				40 : function() { bar_right.direction.dy = +velocityIncrement; },	//DOWN
				83 : function() { bar_left.direction.dy = +velocityIncrement; },	// S
				87 : function() { bar_left.direction.dy = -velocityIncrement; }	// W
			}
		};
		
		var bar_left = {			
			width : 15,
			height : 80,
			position : { x : 25, y : 100 },
			direction : { dx : 0, dy : 0},
			color : "rgb(200,0,0)"
		};
		
		var bar_right = {			
			width : 15,
			height : 80,
			position : { x : (WIDTH - (25 + 15)), y : 100 },
			direction : { dx : 0, dy : 0},
			color : "rgb(0,200,0)"
		};
		
		var ball = {			
			radius : 10,			
			position : { x : WIDTH/2, y : HEIGHT/2 },
			direction : { dx : 2.0, dy : 2.0},
			color : "rgb(0,0,0)"
		};
		
		var score_board = {
			left : 0,
			right : 0,
			font : "30px Arial"
		}
		
		// render a frame
		var draw = function() {
			var drawBar = function(bar) {
				ctx.beginPath();
				ctx.fillStyle = bar.color;
				ctx.rect(bar.position.x, bar.position.y, bar.width, bar.height);
				ctx.closePath();
				ctx.fill();
			}
			var drawBall = function(ball) {
				ctx.beginPath();
				ctx.fillStyle = ball.color;
				ctx.arc(ball.position.x, ball.position.y, ball.radius, 0, Math.PI*2, true);					
				ctx.closePath();
				ctx.fill();
			}
			var drawScoreBoard = function(scoreboard) {
				ctx.font = scoreboard.font;
				ctx.textAlign = "center";
				ctx.strokeText(scoreboard.left + " : " + scoreboard.right, WIDTH/2, 30);
			}
			var drawSpeed = function(ball) {
				ctx.font = "20px Arial";
				ctx.textAlign = "center";
				
				var velocity = Math.sqrt(
					Math.pow(ball.direction.dx, 2) + 
					Math.pow(ball.direction.dy, 2)
				);
				velocity = velocity.toFixed(2);
				
				ctx.strokeText("Ball Speed: " + velocity, WIDTH/2, HEIGHT - 30);
			}
			
			ctx.fillStyle = "rgb(0,0,0)";
			ctx.clearRect(0, 0, WIDTH, HEIGHT);
			
			drawBall(ball);
			drawBar(bar_left);
			drawBar(bar_right);
			drawScoreBoard(score_board);
			drawSpeed(ball);
		};		
		
		// update game
		var update = function() {
			// physics update
			// motion
			var moveBall = function(ball) {
				var x = ball.position.x + ball.direction.dx;
				var xleft = x - ball.radius;
				var xright = x + ball.radius;
				if( xleft < 0 || WIDTH < xright ) {
					ball.direction.dx = -ball.direction.dx;
					ball.position.x = WIDTH/2;
					ball.position.y = HEIGHT/2;
					
					ball.direction.dx = 
						ball.direction.dx < 0 ?
						-ballBaseSpeed : ballBaseSpeed;
						
					ball.direction.dy = 
						ball.direction.dy < 0 ?
						-ballBaseSpeed : ballBaseSpeed;
					
					if(xleft < 0) score_board.right++;
					else score_board.left++;
				}
				
				var y = ball.position.y + ball.direction.dy;
				var ytop = y - ball.radius;				
				var ybottom = y + ball.radius;
				if( ytop < 0 || HEIGHT < ybottom )
					ball.direction.dy = -ball.direction.dy;
				
				ball.position.x += ball.direction.dx;
				ball.position.y += ball.direction.dy;
			}
			var moveBar = function(bar) {				
				var ytop = bar.position.y + bar.direction.dy;
				var ybottom = ytop + bar.height;
				
				if( ytop < 0 || HEIGHT < ybottom)
					bar.direction.dy = 0;
				
				bar.position.y += bar.direction.dy;
			}
			
			moveBall(ball);
			moveBar(bar_left);
			moveBar(bar_right);
			
			// collision
			var detect_collision = function(bar, ball) {
				var between = function(p, l, r) {
					return l < p && p < r;
				}
				var intersect = function(m, n) {
					return between(n.a, m.a, m.b) || between(n.b, m.a, m.b);
				}
				
				// 1D line from a to b
				var barXX = { a : bar.position.x, b : bar.position.x + bar.width };
				var barYY = { a : bar.position.y, b : bar.position.y + bar.height };				
				var ballXX = { a : ball.position.x - ball.radius, b : ball.position.x + ball.radius };				
				var ballYY = { a : ball.position.y - ball.radius, b : ball.position.y + ball.radius };
				
				if( intersect(barXX, ballXX) &&
					intersect(barYY, ballYY) &&
					!collision) {
					ball.direction.dx = -ball.direction.dx;
					collision = true;
					ball.direction.dx *= ballSpeedIncreaseFactor;
					ball.direction.dy *= ballSpeedIncreaseFactor;
				}
				else collision = false;				
			}
			
			detect_collision(bar_left, ball);
			detect_collision(bar_right, ball);
		};
		
		$(document.body).keyup(function(e) {
			e.preventDefault();			
			if(keyHandler.keyUp[e.keyCode])
				keyHandler.keyUp[e.keyCode]();
		});
		$(document.body).keydown(function(e) {
			e.preventDefault();
			if(keyHandler.keyDown[e.keyCode])
				keyHandler.keyDown[e.keyCode]();
		});
		
		setInterval(function() { draw(); update(); }, 10); //Start Drawing
	});
})();