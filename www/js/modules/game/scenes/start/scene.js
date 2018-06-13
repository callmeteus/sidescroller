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

		// Start game timer
		Sidescroller.Timer.start(true, -3);

	    /* ---------------------------------------------------------------------- */

	    // Register events
		Sidescroller.Game.input.addMoveCallback(Sidescroller.Events.POINTER_MOVE, this);		// Pointer move
		Sidescroller.Game.input.onDown.add(Sidescroller.Events.POINTER_DOWN, this); 			// Pointer down

		/* ---------------------------------------------------------------------- */

		// Populate items
		for(var key in Sidescroller.Player.items) {
			if (Sidescroller.Player.items[key] === null)
				continue;

			var $el 	= $("#game-inventory .game-item[data-key=" + key + "]");
			var item 	= Sidescroller.Items.get(Sidescroller.Player.items[key]);

			$el.find(".game-item-image").css("background-image", "url(" + item.image + ")");
			$el.attr("title", "<strong>" + item.name + "</strong><br/>" + item.description);
			$el.attr("data-id", item.id);
		}


		// Fade game in
		Sidescroller.Game.fadeIn();

		// Start game
		Sidescroller.Game.start();
	});
};