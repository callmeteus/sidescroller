Sidescroller.Timer.start 	= function(restart, startValue) {
	if (restart)
		Sidescroller.Player.sprite.timer 	= startValue || 0;

	if (!Sidescroller.Game.paused) {
		// Update screen timer
		$(".game-timer").text(Math.abs(Sidescroller.Player.sprite.timer).fancyTimeFormat());

		// Call ticker
		Sidescroller.Timer.tick.call(this);

		// Increase player timer
		Sidescroller.Player.sprite.timer++;
	}

	Sidescroller.Timer.id 	= setTimeout(Sidescroller.Timer.start, (Sidescroller.Game.paused) ? 10 : 1000);
};

Sidescroller.Timer.stop 	= function() {
	clearTimeout(Sidescroller.Timer.id);
};

Sidescroller.Timer.tick 	= function() {
	if (Sidescroller.Player.sprite.timer > 0 && !Sidescroller.Game._started) {
		Sidescroller.Game._started 				= true;
		Sidescroller.Player.sprite.acceleration = 50;
	}

	$(".game-timer").toggleClass("text-warning", (Sidescroller.Player.sprite.timer <= 0));
};