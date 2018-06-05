function game_stage_load(mapName, callback) {
	var tileset 				= "tileset_" + mapName;
	var tilemap 				= "tilemap_" + mapName;

	game.mapItems 				= game.add.spriteBatch();
	game.layers 				= {};

	game.load.tilemap(tilemap, "api/stage/" + mapName, null, Phaser.Tilemap.TILED_JSON);
	game.load.image(tileset, "img/tilemap.png");

	game.load.onLoadComplete.addOnce(function() {
		game.tilemap 			= game.add.tilemap(tilemap);
		game.tilemap.helpers 	= {};

		for(var helper in game.tilemap.objects.helpers) {
			helper 				= game.tilemap.objects.helpers[helper];
			game.tilemap.helpers[helper.name] 	= helper;
		}

		game.foreGroundTileset 	= game.tilemap.addTilesetImage("Kenney", tileset);
		game.layers.foreground	= game.tilemap.createLayer("foreground");

		game.groundTileset 		= game.tilemap.addTilesetImage("Kenney", tileset);
		game.layers.ground 		= game.tilemap.createLayer("ground");

		game.layers.ground.resizeWorld();

		game.tilemap.plus.physics.enableObjectLayer("collision");
		game.tilemap.plus.events.regions.enableObjectLayer("helpers");

		callback();
	});

	game.load.start();
}

/**
 * Function to spawn a item on the map
 * @param  {[type]} item  Item ID
 * @param  {[type]} x     Item X
 * @param  {[type]} y     Item Y
 * @return {[type]}       Return "false" if it's not a ground tile
 */
function game_stage_spawn(item, x, y) {
	var tile 							= game.tilemap.getTileWorldXY(x, y, game.tilemap.tileWidth, game.tilemap.tileHeight, game.layers.ground);

	if (tile !== null && tile.layer.name === "ground")
		return false;

	var sprite 							= game.add.sprite(x, y + 1.5, item);
	game.physics.enable(sprite);

	sprite.body.immovable 				= true;
	sprite.body.collideWorldBounds 		= true;

	game.mapItems.add(sprite);
}

/**
 * Function to create the cursor marker
 */
function game_stage_createMarker() {
	if (game.cursorMarker)
		return;

	game.cursorMarker 					= game.add.graphics();
    game.cursorMarker.lineStyle(2, 0xffffff, 1);
    game.cursorMarker.drawRect(0, 0, game.tilemap.tileWidth, game.tilemap.tileHeight);

    game.input.addMoveCallback(MapEvent.move, game);
}

/**
 * Function to create the player
 */
function game_stage_createPlayer() {
	this.lerpAmount 					= 0.020;

	if (game.player) {
		game.player.kill();
		delete(game.player);
	}

	game.player 					= game.add.sprite(0, 0, "player");

	game.player.collideWorldBounds 	= true;
	game.physics.arcade.enable(game.player);

	game.player.body.allowGravity 	= true;
	game.player.body.bounce.set(0.8);
	game.player.body.gravity.set(0, 1000);

	// Set camera follow event
	game.camera.follow(game.player, Phaser.Camera.FOLLOW_LOCKON, this.lerpAmount, this.lerpAmount);

	// Set region enter event
	game.tilemap.plus.events.regions.onEnterAdd(game.player, MapEvent.regionEnter);

	/* ---------------------------------------------------------------------- */

	game.player.points 				= 0;
	game.player.timer 				= 0;
	game.player.x 					= game.tilemap.helpers.start.x + (game.player.width);
	game.player.y 					= game.tilemap.helpers.start.y + game.tilemap.tileHeight;

	/* ---------------------------------------------------------------------- */	

	game.player.currentItem 		= game_items[0];
	game.player.acceleration 		= 50;
}

/**
 * Reset the game stage
 */
function game_stage_reset() {
	if (typeof game.layers === "undefined")
		return;

	// Remove all map items
	game.mapItems.callAll("kill");
	delete(game.mapItems);

	// Remove map cursor
	game.cursorMarker.kill();
	delete(game.cursorMarker);

	// Destroy current tilemap
	game.tilemap.destroy();
	delete(game.tilemap);

	// Clear all game layers
	for(var layer in game.layers)
		game.layers[layer].destroy();

	delete(game.layers);
}

/**
 * Get all available user game stages
 * @param  {Function} callback Callback function
 */
function game_stage_available(callback) {
	$.get("/api/stages", function(stages) {
		game_stage_list 	= stages;

		if (typeof callback === "function")
			callback();

		console.info("loaded", stages.length, "stages");
	});
}

function game_stage_data_get(stageId) {
	if (typeof game_player_data_get("stages." + stageId) === "undefined")
		game_player_data_set("stages." + stageId, {
			win: 	false,
			score: 	0,
			time: 	0
		}, true);

	return game_player_data_get("stages." + stageId);
}

function game_stage_data_set(stageId, data) {
	return game_player_data_set("stages." + stageId, data, true);
}