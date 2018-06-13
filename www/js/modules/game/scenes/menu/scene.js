Sidescroller.Scenes.menu 		= function(callback) {
	// Load game container
	app_mustache_load("game", document.body, null, true);

	// Load all unlocked stages
	Sidescroller.Stages.get(function() {
		// Load menu
		app_mustache_load("user/menu", $container, null, false, function() {
			if (typeof callback === "function")
				callback();

			// Hide game
			Sidescroller.Game.fadeOut(function() {
				// Reset game stage
				Sidescroller.Stages.reset();
			});
		});
	});
};