/**
 * Load stage
 * @param  {[type]}   stage  	Stage ID
 * @param  {Function} callback 	Callback function
 */
Sidescroller.Stages.load 	= function(stage, callback) {
	var tileset 						= "tileset_" + stage;
	var tilemap 						= "tilemap_" + stage;

	Sidescroller.Game.mapItems 				= Sidescroller.Game.add.spriteBatch();
	Sidescroller.Game.layers 				= {};

	Sidescroller.Game.load.tilemap(tilemap, "api/user/stage/" + stage, null, Phaser.Tilemap.TILED_JSON);
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
	var item 							= Sidescroller.Items.get(item);
	var tile 							= Sidescroller.Game.tilemap.getTileWorldXY(x, y, Sidescroller.Game.tilemap.tileWidth, Sidescroller.Game.tilemap.tileHeight, Sidescroller.Game.layers.ground);

	if (tile !== null && tile.layer.name === "ground")
		return false;

	var sprite 							= Sidescroller.Game.add.sprite(x, y + 1.5, item.key);

	// Enable physics
	Sidescroller.Game.physics.enable(sprite);

	sprite.body.immovable 				= true;
	sprite.body.collideWorldBounds 		= true;

	// Generate sprite unique id
	sprite.uid 							= +new Date();

	sprite.item							= item.id;
	sprite.collision 					= {
		first: 	true
	};

	Sidescroller.Game.mapItems.add(sprite);
}

/**
 * Function to create the cursor marker
 */
Sidescroller.Stages.createMarker 		= function() {
	if (Sidescroller.Game.cursorMarker)
		return;

	Sidescroller.Game.cursorMarker 		= new SidescrollerMarker();
}

/**
 * Function to create the player
 */
Sidescroller.Stages.createPlayer 		= function() {
	if (Sidescroller.Player.sprite) {
		Sidescroller.Player.sprite.kill();
		delete(Sidescroller.Player.sprite);
	}

	Sidescroller.Player.sprite 			= new SidescrollerPlayer();
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