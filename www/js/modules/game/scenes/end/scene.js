var Scene 		= Scene || {};

Scene.end 		= function(isWinner) {
	game.isLoaded 						= false;

	// Update player points
	game.player.points 					= Math.round(game.player.points);

	// Reset player acceleration if he wins the game
	if (isWinner) {
		game.player.body.reset(0, 0);
		game.player.body.allowGravity 	= false;
	}

	// Reset camera target
	game.camera.target 					= null;

	/* ------------------------------------------------------------------------ */

	var data 			= {
		win: 			(isWinner) ? true : false,
		time: 			game.player.timer,
		score: 			game.player.points,
	};

	var currentData 	= game_stage_data_get(game_current_stage);

	// Check if player already passed this stage
	if (typeof currentData !== "undefined" && currentData.win) {
		data.win 		= true;
	} else 
		if (data.win)
			game_stage_available();

	// Set player stage data
	game_stage_data_set(game_current_stage, data);

	data 				= Object.assign(data, {
		stage: 			game_stage_list[game_current_stage],
		time: 			data.time.fancyTimeFormat()
	});

	// Load game end screen
	app_mustache_load("end", $container, data, false, function() {
		$container.find(".modal").modal("show");

		// Hide game stats and inventory
		$("#game-inventory, #game-stats").hide();
	});
	
	// Stop game timer
	game_timer_stop();
};