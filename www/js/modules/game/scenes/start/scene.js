var Scene 		= Scene || {};

Scene.start 	= function() {
	// Reset game stage
	game_stage_reset();

	// Load current stage
	game_stage_load(game_current_stage, function() {
		// Create player
		game_stage_createPlayer();

		// Create block marker
		game_stage_createMarker();

	    /* ---------------------------------------------------------------------- */

	    // Set game to loaded
	    game.isLoaded 					= true;

		// Start game timer
		game_timer_start(true);

		// Show inventory and stats
		$("#game-inventory, #game-stats").show();
	});
};