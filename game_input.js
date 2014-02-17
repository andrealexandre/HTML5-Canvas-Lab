game.input = {
	keyHandler : {
		keyUp : {
			38 : function() { game.objects.bar_right.direction.dy = 0; },	//UP
			40 : function() { game.objects.bar_right.direction.dy = 0; },	//DOWN
			83 : function() { game.objects.bar_left.direction.dy = 0; },	// S
			87 : function() { game.objects.bar_left.direction.dy = 0; }	// W
		},	
		keyDown : {
			38 : function() { game.objects.bar_right.direction.dy = -game.velocityIncrement; },	//UP			
			40 : function() { game.objects.bar_right.direction.dy = +game.velocityIncrement; },	//DOWN
			83 : function() { game.objects.bar_left.direction.dy = +game.velocityIncrement; },	// S
			87 : function() { game.objects.bar_left.direction.dy = -game.velocityIncrement; }	// W
		}
	},
	
	registerListeners : function() {
		$(document.body).keyup(function(e) {
			e.preventDefault();			
			if(game.input.keyHandler.keyUp[e.keyCode])
				game.input.keyHandler.keyUp[e.keyCode]();
		});
		$(document.body).keydown(function(e) {
			e.preventDefault();
			if(game.input.keyHandler.keyDown[e.keyCode])
				game.input.keyHandler.keyDown[e.keyCode]();
		});
	}
};