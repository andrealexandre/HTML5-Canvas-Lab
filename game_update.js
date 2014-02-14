// update game
game.update = function() {
	var WIDTH = game.WIDTH;
	var HEIGHT = game.HEIGHT;

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
	
	moveBall(game.ball);
	moveBar(game.bar_left);
	moveBar(game.bar_right);
	
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
	
	detect_collision(game.bar_left, game.ball);
	detect_collision(game.bar_right, game.ball);
};