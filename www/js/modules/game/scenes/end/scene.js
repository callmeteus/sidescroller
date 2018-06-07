/**
 * Game Over scene
 * @param  {boolean} isWinner Player is winner?
 */
Sidescroller.Scenes.end 		= function(isWinner) {
	// Unload game
	Sidescroller.Game.isLoaded 						= false;

	// Stop game timer
	Sidescroller.Timer.stop();

	// Update player points
	Sidescroller.Game.player.points 					= Math.round(Sidescroller.Game.player.points);

	// Reset player acceleration if he wins the game
	if (isWinner) {
		Sidescroller.Game.player.body.reset(0, 0);
		Sidescroller.Game.player.body.allowGravity 	= false;
	}

	// Reset camera target
	Sidescroller.Game.camera.target 					= null;

	/* ------------------------------------------------------------------------ */

	var data 			= {
		win: 			(isWinner) ? true : false,
		time: 			Sidescroller.Game.player.timer,
		score: 			Sidescroller.Game.player.points,
		prevWin: 		false
	};

	var currentData 	= Sidescroller.Player.Data.Stages.get(Sidescroller.Stages.current);

	// Check if player already passed this stage
	if (typeof currentData !== "undefined" && currentData.done)
		data.prevWin 	= true;

	// Do stage check
	return game_scene_end_stageCheck(data);
};