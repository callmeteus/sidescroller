// Game Start button click
$(document).on("click touchstart", "#game-button-start", function(e) {
	e.preventDefault();

	// Hide all open modals and go to game start scene
	game_modal_hideAll(() => Scene.start());
});

// Game Next Stage button click
$(document).on("click touchstart", "#game-button-next", function(e) {
	e.preventDefault();

	// Increase current stage
	game_current_stage++;

	// Hide all open modals and go to game start scene
	game_modal_hideAll(() => Scene.start());
});

// Game Menu button click
$(document).on("click touchstart", "#game-button-menu", function(e) {
	e.preventDefault();

	// Hide all open modals and go to menu scene
	game_modal_hideAll(() => Scene.menu());
});