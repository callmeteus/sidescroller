var Scene 						= Scene || {};

Scene.menu 						= function(callback) {
	var data 					= {
		game_items: 	game_items
	};

	// Load game container
	app_mustache_load("game", document.body, data, true, function() {
		// Load all unlocked stages
		game_stage_available(function() {
			data.game_stages 	= game_stage_list;

			// Load menu
			app_mustache_load("menu", $container, data, false, function() {
				// Check if game is loaded
				if (typeof game.layers !== "undefined")
					// Hide game
					game_fadeOut(function() {
						// Reset game stage
						game_stage_reset();

						// Recreate the game
						Scene.create();
					});

				if (typeof callback === "function")
					callback();
				else
					$container.find("#game-menu").modal("show");
			});
		});		
	});
};