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

	var data 			= {
		win: 			isWinner,
		timer: 			game.player.timer.fancyTimeFormat(),
		score: 			game.player.points,

		stage: 			game_stage_list[game_current_stage]
	};

	app_mustache_load("end", $container, data, false, function() {
		$container.find(".modal").modal("show");
	});

	$("#game-inventory, #game-stats").hide();
	
	clearInterval(Scene._playerTimer);
};