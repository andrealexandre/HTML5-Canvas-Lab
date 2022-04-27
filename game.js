window.addEventListener('load', function() {
	//get a reference to the canvas
	game.canvas = document.getElementById("canvas");
	game.ctx = game.canvas.getContext("2d"); // canvas context object
	game.WIDTH = game.canvas.width;		// screen width
	game.HEIGHT = game.canvas.height;	// screen height		
	
	game.objects.init();
	game.input.registerListeners();
	
	game.cycle = function() {
		game.stopMain = window.requestAnimationFrame(game.cycle);
		
		let start = performance.now()

		game.update()
		game.draw()
		
		let duration = performance.now() - start
		game.metrics.frameTime = duration
		game.metrics.framePerSecond = 1000 / duration
	};
	
	game.cycle();
});