var Scene 		= Scene || {};

Sidescroller.Scenes.start 	= function() {
	// Reset game stage
	Sidescroller.Stages.reset();

	// Load current stage
	Sidescroller.Stages.load(Sidescroller.Stages.current, function() {
		// Create player
		Sidescroller.Stages.createPlayer();

		// Create block marker
		Sidescroller.Stages.createMarker();

		game_fadeIn();

	    /* ---------------------------------------------------------------------- */

	    // Set game to loaded
	    Sidescroller.Game.isLoaded 					= true;

		// Start game timer
		Sidescroller.Timer.start(true);
	});
};