Sidescroller.Timer.start 	= function(restart) {
	if (restart)
		Sidescroller.Game.player.timer 	= 0;

	if (!Sidescroller.Game.paused) {
		// Increase player timer
		Sidescroller.Game.player.timer++;

		// Update screen timer
		$(".game-timer").text(Sidescroller.Game.player.timer.fancyTimeFormat());

		// Increase game played time
		Sidescroller.Player.Data.increase("playedTime", true);
	}

	Sidescroller.Timer.id 	= setTimeout(Sidescroller.Timer.start, (Sidescroller.Game.paused) ? 10 : 1000);
}

Sidescroller.Timer.stop 	= function() {
	clearTimeout(Sidescroller.Timer.id);
}