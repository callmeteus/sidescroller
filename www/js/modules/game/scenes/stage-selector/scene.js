Sidescroller.Scenes.stageSelector 	= function() {
	// Check if stage selector is loaded
	if (!$("#game-stage-selector").length)
		return Sidescroller.Scenes.menu(() => Sidescroller.Scenes.stageSelector());

	$("#game-stage-selector").modal("show");
};