game.input = {
	keyHandler : {
		keyUp : {
			"ArrowUp" : (handle) => handle(game.objects.bar_right, 0),
			"ArrowDown" : (handle) => handle(game.objects.bar_right, 0),
			"w" : (handle) => handle(game.objects.bar_left, 0),
			"s" : (handle) => handle(game.objects.bar_left, 0)
		},	
		keyDown : {
			"ArrowUp" : (handle) => handle(game.objects.bar_right, -game.velocityIncrement),
			"ArrowDown" : (handle) => handle(game.objects.bar_right, +game.velocityIncrement),
			"w" : (handle) => handle(game.objects.bar_left, -game.velocityIncrement),
			"s" : (handle) => handle(game.objects.bar_left, +game.velocityIncrement)
		}
	},
	
	registerListeners : () => {
		document.body.addEventListener('keyup', (event) => {
			if (game.input.keyHandler.keyUp[event.key]) {
				game.input.keyHandler.keyUp[event.key]((bar, dy) => {
					if (event.key == bar.keyDown) {
						bar.direction.dy = dy;
						bar.keyDown = null;
					}
				});
				e.preventDefault();
			}
		});
		document.body.addEventListener('keydown', (event) => {
			if (game.input.keyHandler.keyDown[event.key]) {
				game.input.keyHandler.keyDown[event.key]((bar, dy) => {
					if (!bar.keyDown) {
						bar.keyDown = event.key;
						bar.direction.dy = dy;
					}
				});
				e.preventDefault();
			}
		});
	}
};