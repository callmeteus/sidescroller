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
	if (restart) {
		this.timer 			= 0;
		game.player.timer 	= 0;
	}

	// Increase player timer
	game.player.timer++;

	// Update screen timer
	$(".game-timer").text(game.player.timer.fancyTimeFormat());

	// Increase game played time
	game_player_data_increase("playedTime", true);
}

function game_timer_stop() {
	clearInterval(game_timer_interval);
}