var Scene 		= Scene || {};

Scene.create 	= function() {
	game.scale.pageAlignHorizontally 		= true;
    game.scale.pageAlignVertically 			= true;

	game.scale.forceOrientation(false, true);

	game.scale.scaleMode 					= Phaser.ScaleManager.USER_SCALE;
	game.scale.setUserScale(4, 4);

	game.renderer.renderSession.roundPixels = true;
	game.stage.smoothed 					= true;

	game.scale.updateLayout(true);
	game.scale.refresh();

	/* ---------------------------------------------------------------------- */

	game.stage.backgroundColor 				= "transparent";

	game.time.advancedTiming 				= true;

	// Enable physics
	game.physics.startSystem(Phaser.Physics.ARCADE);

	// Enable tilemap plus
	game.plugins.add(Phaser.Plugin.TilemapPlus);

	game.input.onDown.add(MapEvent.click, game);
};