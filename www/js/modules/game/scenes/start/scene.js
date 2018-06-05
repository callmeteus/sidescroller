var Scene 		= Scene || {};

Scene.start 	= function() {
	// Kill all placed map items if they exists
	if (game.mapItems)
		game.mapItems.callAll("kill");

	game_map_load(game_stage_list[game_current_stage].file, function() {
		// Create player
		game_map_createPlayer();

		// Create block marker
		game_map_createMarker();

	    /* ---------------------------------------------------------------------- */

	    // Set game to loaded
	    game.isLoaded 					= true;

		// Start game timer
		Scene._playerTimer 					= setInterval(function() {
			game.player.timer++;
			$(".game-timer").text(game.player.timer.fancyTimeFormat());
		}, 1000);

		// Show inventory
		$("#game-inventory, #game-stats").show();
	});
};