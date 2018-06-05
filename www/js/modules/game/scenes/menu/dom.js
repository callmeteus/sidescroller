// Game Start button click
$(document).on("click touchstart", "#game-button-start", function(e) {
	e.preventDefault();

	// Hide all open modals and go to game start scene
	game_modal_hideAll(() => Scene.start());
});

// Game Menu button click
$(document).on("click touchstart", "#game-button-menu", function(e) {
	e.preventDefault();

	// Hide all open modals and go to menu scene
	game_modal_hideAll(() => Scene.menu());
});