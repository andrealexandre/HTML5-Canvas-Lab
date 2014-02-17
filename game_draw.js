// render a frame
game.draw = function() {
	var ctx = game.ctx;
	var WIDTH = game.WIDTH;
	var HEIGHT = game.HEIGHT;
	
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
	
	drawBall(game.objects.ball);
	drawBar(game.objects.bar_left);
	drawBar(game.objects.bar_right);
	drawScoreBoard(game.objects.score_board);
	drawSpeed(game.objects.ball);
};