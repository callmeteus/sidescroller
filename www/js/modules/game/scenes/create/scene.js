Sidescroller.Scenes.create 	= function() {
	Sidescroller.Game.scale.pageAlignHorizontally 			= true;
    Sidescroller.Game.scale.pageAlignVertically 			= true;

	Sidescroller.Game.scale.forceOrientation(false, true);

	Sidescroller.Game.scale.scaleMode 						= Phaser.ScaleManager.RESIZE;
	Sidescroller.Game.scale.fullScreenScaleMode 			= Phaser.ScaleManager.RESIZE;

	Sidescroller.Game.scale.refresh();

	Sidescroller.Game.renderer.renderSession.roundPixels 	= true;
	Sidescroller.Game.stage.smoothed 						= true;

	/* ---------------------------------------------------------------------- */

	Sidescroller.Game.stage.backgroundColor 				= "transparent";

	Sidescroller.Game.time.advancedTiming 					= true;

	// Enable physics
	Sidescroller.Game.physics.startSystem(Phaser.Physics.ARCADE);

	// Enable tilemap plus
	Sidescroller.Game.plugins.add(Phaser.Plugin.TilemapPlus);

	// Register events
	Sidescroller.Game.input.addMoveCallback(Sidescroller.Events.POINTER_MOVE, this);		// Pointer move
	Sidescroller.Game.input.onDown.add(Sidescroller.Events.POINTER_DOWN, this); 			// Pointer down

	// Load menu
	Sidescroller.Scenes.menu();
};