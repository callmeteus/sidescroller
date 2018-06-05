// Game Stage Selector button click
$(document).on("click touchstart", "#game-menu #game-button-stage-selector", function(e) {
	e.preventDefault();

	// Hide all modals and then show stage selector modal
	game_modal_hideAll(() => Scene.stageSelector());
});

// On stage select
$(document).on("click touchstart", "#game-stage-selector .game-stage", function() {
	$(".game-stage.active").removeClass("active");
	$(this).addClass("active");

	game_current_stage 	= $(this).data("id");

	$("#game-stage-selector #game-button-start").prop("disabled", false);
});