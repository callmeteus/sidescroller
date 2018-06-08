Sidescroller.Scenes.menu 		= function(callback) {
	// Load game container
	app_mustache_load("game", document.body, null, true);

	// Load all unlocked stages
	Sidescroller.Stages.get(function() {
		// Load menu
		app_mustache_load("menu", $container, null, false, function() {
			if (typeof callback === "function")
				callback();
			else
				$container.find("#game-menu").modal("show");

			// Hide game
			game_fadeOut(function() {
				// Reset game stage
				Sidescroller.Stages.reset();
			});
		});
	});
};