window.addEventListener('load', function() {
	//get a reference to the canvas
	game.canvas = document.getElementById("canvas");
	game.ctx = game.canvas.getContext("2d"); // canvas context object
	game.WIDTH = game.canvas.width;		// screen width
	game.HEIGHT = game.canvas.height;	// screen height		
	
	game.objects.init();
	game.input.registerListeners();
	
	game.cycle = function() {
		game.draw();
		game.update();
	};
	
	setInterval(game.cycle, 10); //Start Drawing
});