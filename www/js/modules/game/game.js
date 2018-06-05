function game_modal_hideAll(callback) {
	// Get all open modals
	var $modals 	= $(".modal.show");

	// Add handler to completly hidden event
	$modals.one("hidden.bs.modal", function() {
		if (typeof callback === "function")
			callback();
	});

	// Call hide
	$modals.modal("hide");
}

var game_timer_interval;
function game_timer_start(restart) {
	if (restart)
		game.player.timer 	= 0;

	if (!game.paused) {
		// Increase player timer
		game.player.timer++;

		// Update screen timer
		$(".game-timer").text(game.player.timer.fancyTimeFormat());

		// Increase game played time
		game_player_data_increase("playedTime", true);
	}

	game_timer_interval 	= setTimeout(game_timer_start, (game.paused) ? 10 : 1000);
}

function game_timer_stop() {
	clearTimeout(game_timer_interval);
}