var Scene 		= Scene || {};

/**
 * Game Over scene
 * @param  {boolean} isWinner Player is winner?
 */
Scene.end 		= function(isWinner) {
	// Unload game
	game.isLoaded 						= false;

	// Stop game timer
	game_timer_stop();

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
		prevWin: 		false
	};

	var currentData 	= game_stage_data_get(game_current_stage);

	// Check if player already passed this stage
	if (typeof currentData !== "undefined" && currentData.win)
		data.prevWin 	= true;

	// Do stage check
	return game_scene_end_stageCheck(data);
};