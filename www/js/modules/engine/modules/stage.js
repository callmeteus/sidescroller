Sidescroller.Stages.load 	= function(mapName, callback) {
	var tileset 				= "tileset_" + mapName;
	var tilemap 				= "tilemap_" + mapName;

	Sidescroller.Game.mapItems 				= Sidescroller.Game.add.spriteBatch();
	Sidescroller.Game.layers 				= {};

	Sidescroller.Game.load.tilemap(tilemap, "api/user/stage/" + mapName, null, Phaser.Tilemap.TILED_JSON);
	Sidescroller.Game.load.image(tileset, "img/tilemap.png");

	Sidescroller.Game.load.onLoadComplete.addOnce(function() {
		Sidescroller.Game.tilemap 			= Sidescroller.Game.add.tilemap(tilemap);
		Sidescroller.Game.tilemap.helpers 	= {};

		for(var helper in Sidescroller.Game.tilemap.objects.helpers) {
			helper 				= Sidescroller.Game.tilemap.objects.helpers[helper];
			Sidescroller.Game.tilemap.helpers[helper.name] 	= helper;
		}

		Sidescroller.Game.foreGroundTileset 	= Sidescroller.Game.tilemap.addTilesetImage("Kenney", tileset);
		Sidescroller.Game.layers.foreground	= Sidescroller.Game.tilemap.createLayer("foreground");

		Sidescroller.Game.groundTileset 		= Sidescroller.Game.tilemap.addTilesetImage("Kenney", tileset);
		Sidescroller.Game.layers.ground 		= Sidescroller.Game.tilemap.createLayer("ground");

		Sidescroller.Game.layers.ground.resizeWorld();

		Sidescroller.Game.tilemap.plus.physics.enableObjectLayer("collision");
		Sidescroller.Game.tilemap.plus.events.regions.enableObjectLayer("helpers");

		callback();
	});

	Sidescroller.Game.load.start();
}

/**
 * Function to spawn a item on the map
 * @param  {[type]} item  Item ID
 * @param  {[type]} x     Item X
 * @param  {[type]} y     Item Y
 * @return {[type]}       Return "false" if it's not a ground tile
 */
Sidescroller.Stages.spawn 	= function(item, x, y) {
	var tile 							= Sidescroller.Game.tilemap.getTileWorldXY(x, y, Sidescroller.Game.tilemap.tileWidth, Sidescroller.Game.tilemap.tileHeight, Sidescroller.Game.layers.ground);

	if (tile !== null && tile.layer.name === "ground")
		return false;

	var sprite 							= Sidescroller.Game.add.sprite(x, y + 1.5, item);
	Sidescroller.Game.physics.enable(sprite);

	sprite.body.immovable 				= true;
	sprite.body.collideWorldBounds 		= true;

	Sidescroller.Game.mapItems.add(sprite);
}

/**
 * Function to create the cursor marker
 */
Sidescroller.Stages.createMarker 	= function() {
	if (Sidescroller.Game.cursorMarker)
		return;

	Sidescroller.Game.cursorMarker 					= Sidescroller.Game.add.graphics();
    Sidescroller.Game.cursorMarker.lineStyle(2, 0xffffff, 1);
    Sidescroller.Game.cursorMarker.drawRect(0, 0, Sidescroller.Game.tilemap.tileWidth, Sidescroller.Game.tilemap.tileHeight);
}

/**
 * Function to create the player
 */
Sidescroller.Stages.createPlayer 	= function() {
	/*
		TODO
		Default camera lerp is 0.020
		Removed because camera was not following player in high velocities
	*/
	this.lerpAmount 					= 0.8;

	if (Sidescroller.Game.player) {
		Sidescroller.Game.player.kill();
		delete(Sidescroller.Game.player);
	}

	Sidescroller.Game.player 					= Sidescroller.Game.add.sprite(0, 0, "player");

	Sidescroller.Game.player.collideWorldBounds = true;
	Sidescroller.Game.physics.arcade.enable(Sidescroller.Game.player);

	Sidescroller.Game.player.body.allowGravity 	= true;
	Sidescroller.Game.player.body.bounce.set(0.8);
	Sidescroller.Game.player.body.gravity.set(0, 1000);

	// Set camera follow event
	Sidescroller.Game.camera.follow(Sidescroller.Game.player, Phaser.Camera.FOLLOW_LOCKON, this.lerpAmount, this.lerpAmount);

	// Set region enter event
	Sidescroller.Game.tilemap.plus.events.regions.onEnterAdd(Sidescroller.Game.player, Sidescroller.Events.MAP_REGION_ENTER);

	/* ---------------------------------------------------------------------- */

	Sidescroller.Game.player.points 			= 0;
	Sidescroller.Game.player.timer 				= 0;
	Sidescroller.Game.player.x 					= Sidescroller.Game.tilemap.helpers.start.x + (Sidescroller.Game.player.width);
	Sidescroller.Game.player.y 					= Sidescroller.Game.tilemap.helpers.start.y + Sidescroller.Game.tilemap.tileHeight;

	/* ---------------------------------------------------------------------- */	

	// Just for debug
	Sidescroller.Game.player.currentItem 		= Sidescroller.Items.get(0);
	Sidescroller.Game.player.acceleration 		= 50;
}

/**
 * Reset the game stage
 */
Sidescroller.Stages.reset 	= function() {
	if (typeof Sidescroller.Game.layers === "undefined")
		return;

	// Remove all map items
	Sidescroller.Game.mapItems.callAll("kill");
	delete(Sidescroller.Game.mapItems);

	// Remove map cursor
	Sidescroller.Game.cursorMarker.kill();
	delete(Sidescroller.Game.cursorMarker);

	// Destroy current tilemap
	Sidescroller.Game.tilemap.destroy();
	delete(Sidescroller.Game.tilemap);

	// Clear all game layers
	for(var layer in Sidescroller.Game.layers)
		Sidescroller.Game.layers[layer].destroy();

	delete(Sidescroller.Game.layers);
}

/**
 * Get all available user game stages
 * @param  {function} callback Callback function
 */
Sidescroller.Stages.get 			= function(callback) {
	$.get("/api/user/stages", function(stages) {
		Sidescroller.Stages.list 	= stages;

		if (typeof callback === "function")
			callback();
	});
}

Sidescroller.Stages.set 	= function(stageId, data, callback) {
	$.post("/api/user/stage/" + stageId, data, callback);
}