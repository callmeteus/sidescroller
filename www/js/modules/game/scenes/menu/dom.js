// Game button click
$(document).on("click touchstart", ".game-button", function(e) {
	e.preventDefault();

	switch($(this).attr("id").replace("game-button-", "")) {
		// Next stage button
		case "next":
			// Increase current stage
			game_current_stage++;

		// Start and next stage button
		case "start":
		case "next":
			// Hide all open modals and go to game start scene
			game_modal_hideAll(() => Scene.start());
		break;

		// Menu button
		case "menu":
			// Hide all open modals and go to menu scene
			game_modal_hideAll(() => Scene.menu());
		break;
	}
});