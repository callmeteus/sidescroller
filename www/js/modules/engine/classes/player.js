function SidescrollerPlayer() {
	/*
		TODO
		Default camera lerp is 0.020
		Removed because camera was not following player in high velocities
	*/
	this.lerpAmount 			= 0.8;

	var player  				= Sidescroller.Game.add.sprite(0, 0, "player");

	player.collideWorldBounds 	= true;
	Sidescroller.Game.physics.arcade.enable(player);

	player.body.allowGravity 	= true;
	player.body.bounce.set(0.8);
	player.body.gravity.set(0, 1000);

	player.body.acceleration.y 	= 1000;

	/* ---------------------------------------------------------------------- */

	// Set camera follow event
	Sidescroller.Game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, this.lerpAmount, this.lerpAmount);

	// Set region enter event
	Sidescroller.Game.tilemap.plus.events.regions.onEnterAdd(player, Sidescroller.Events.get("MAP_REGION_ENTER"));

	// Set player collision
	player.body.onCollide 		= new Phaser.Signal();
	player.body.onCollide.add(Sidescroller.Events.get("PLAYER_COLLIDE"), this);

	/* ---------------------------------------------------------------------- */

	player.points 				= 0;
	player.timer 				= 0;
	player.x 					= Sidescroller.Game.tilemap.helpers.start.x + (player.width);
	player.y 					= Sidescroller.Game.tilemap.helpers.start.y + Sidescroller.Game.tilemap.tileHeight;

	return player;
};