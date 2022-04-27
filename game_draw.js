// render a frame
game.draw = function() {
	var ctx = game.ctx;
	var WIDTH = game.WIDTH;
	var HEIGHT = game.HEIGHT;
	
	let drawBar = function(bar) {
		ctx.beginPath()
		ctx.fillStyle = bar.color
		ctx.rect(bar.position.x, bar.position.y, bar.width, bar.height)
		ctx.closePath()
		ctx.fill()
	}
	let drawBall = function(ball) {
		ctx.beginPath()
		ctx.fillStyle = ball.color
		ctx.arc(ball.position.x, ball.position.y, ball.radius, 0, Math.PI*2, true)
		ctx.closePath()
		ctx.fill()
	}
	let drawScoreBoard = function(scoreboard) {
		ctx.font = scoreboard.font;
		ctx.textAlign = "center";
		ctx.strokeText(scoreboard.left + " : " + scoreboard.right, (1/2 * WIDTH), (1/10 * HEIGHT))
	}
	let drawSpeed = function(ball) {
		ctx.font = "20px Arial";
		ctx.textAlign = "center";
		
		let velocity = Math.sqrt(Math.pow(ball.direction.dx, 2) + Math.pow(ball.direction.dy, 2))
		velocity = velocity.toFixed(2)
		
		ctx.strokeText("Ball Speed: " + velocity, (1/2 * WIDTH), (49/50 * HEIGHT))
	}
	let drawMetrics = function(metrics) {
		ctx.font = "16px Arial";
		ctx.textAlign = "center";
		ctx.strokeText(`Frame time: ${metrics.frameTime.toFixed(2)}ms`, (7/8 * WIDTH), (47/50 * HEIGHT))
		ctx.strokeText(`FPS: ${metrics.framePerSecond.toFixed(0)}`, (7/8 * WIDTH), (49/50 * HEIGHT))
	}
	
	ctx.fillStyle = "rgb(0,0,0)";
	ctx.clearRect(0, 0, WIDTH, HEIGHT)
	
	drawBall(game.objects.ball)
	drawBar(game.objects.bar_left)
	drawBar(game.objects.bar_right)
	drawScoreBoard(game.objects.score_board)
	drawSpeed(game.objects.ball)
	drawMetrics(game.metrics)
};