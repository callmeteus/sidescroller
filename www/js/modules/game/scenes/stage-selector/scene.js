var Scene 				= Scene || {};

Scene.stageSelector 	= function() {
	// Check if stage selector is loaded
	if (!$("#game-stage-selector").length)
		return Scene.menu(() => Scene.stageSelector());

	$("#game-stage-selector").modal("show");
};