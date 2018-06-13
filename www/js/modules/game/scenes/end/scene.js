/**
 * Game Over scene
 * @param  {boolean} isWinner Player is winner?
 */
Sidescroller.Scenes.end 		= function(isWinner) {
	// Unload game
	Sidescroller.Game._playing 							= false;

	// Stop game timer
	Sidescroller.Timer.stop();

	// Stop game render and events
	Sidescroller.Game.stop();

	// Update player points
	Sidescroller.Player.sprite.points 					= Math.round(Sidescroller.Player.sprite.points);

	// Reset player acceleration if he wins the game
	if (isWinner) {
		Sidescroller.Player.sprite.body.reset(0, 0);
		Sidescroller.Player.sprite.body.allowGravity 		= false;
	}

	// Reset camera target
	Sidescroller.Game.camera.target 					= null;

	// Remove events
	Sidescroller.Game.input.onDown.removeAll();
	Sidescroller.Game.input.deleteMoveCallback(Sidescroller.Events.POINTER_MOVE, this);

	/* ------------------------------------------------------------------------ */

	var data 			= {
		win: 			(isWinner) ? true : false,
		time: 			Sidescroller.Player.sprite.timer,
		score: 			Sidescroller.Player.sprite.points,
	};

	// Do stage check
	return game_scene_end_stageCheck(data);
};