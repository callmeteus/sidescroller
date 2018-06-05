function game_map_load(mapName, callback) {
	var tileset 				= "tileset_" + mapName;
	var tilemap 				= "tilemap_" + mapName;

	game.mapItems 				= game.add.spriteBatch();

	game.load.tilemap(tilemap, "maps/" + mapName + ".json", null, Phaser.Tilemap.TILED_JSON);
	game.load.image(tileset, "img/tilemap.png");

	game.load.onLoadComplete.addOnce(function() {
		game.tilemap 			= game.add.tilemap(tilemap);
		game.tilemap.helpers 	= {};

		for(var helper in game.tilemap.objects.helpers) {
			helper 				= game.tilemap.objects.helpers[helper];
			game.tilemap.helpers[helper.name] 	= helper;
		}

		game.foreGroundTileset 	= game.tilemap.addTilesetImage("Kenney", tileset);
		game.foreGroundLayer 	= game.tilemap.createLayer("foreground");

		game.groundTileset 		= game.tilemap.addTilesetImage("Kenney", tileset);
		game.groundLayer 		= game.tilemap.createLayer("ground");

		game.groundLayer.resizeWorld();

		game.tilemap.plus.physics.enableObjectLayer("collision");
		game.tilemap.plus.events.regions.enableObjectLayer("limits");

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
function game_map_spawn(item, x, y) {
	var tile 							= game.tilemap.getTileWorldXY(x, y, game.tilemap.tileWidth, game.tilemap.tileHeight, game.groundLayer);

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
function game_map_createMarker() {
	if (game.cursorMarker)
		return;

	game.cursorMarker 					= game.add.graphics();
    game.cursorMarker.lineStyle(2, 0xffffff, 1);
    game.cursorMarker.drawRect(0, 0, game.tilemap.tileWidth, game.tilemap.tileHeight);

    game.input.addMoveCallback(MapEvent.move, this);
}

/**
 * Function to create the player
 */
function game_map_createPlayer() {
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