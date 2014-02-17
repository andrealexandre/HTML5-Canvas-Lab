(function() {
	$(document).ready(function() {
		//get a reference to the canvas
		game.canvas = $("#canvas");
		game.ctx = game.canvas[0].getContext("2d"); // canvas context object
		game.WIDTH = game.canvas.width();		// screen width
		game.HEIGHT = game.canvas.height();	// screen height		
		
		game.objects.init();
		game.input.registerListeners();
		
		game.cycle = function() {
			game.draw();
			game.update();
		};
		
		setInterval(game.cycle, 10); //Start Drawing
	});
})();