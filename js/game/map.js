function game_map_load(mapName, callback) {
	var tileset 	= "tileset_" + mapName;
	var tilemap 	= "tilemap_" + mapName;

	game.blocks 	= game.add.spriteBatch();

	game.load.tilemap(tilemap, "maps/" + mapName + ".json", null, Phaser.Tilemap.TILED_JSON);
	game.load.image(tileset, "img/tilemap.png");

	game.load.onLoadComplete.addOnce(function() {
		game.tilemap 			= game.add.tilemap(tilemap);
		game.tilemap.helpers 	= {};

		for(var helper in game.tilemap.objects.helpers) {
			helper 	= game.tilemap.objects.helpers[helper];
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

function game_map_colliders() {
	game.tilemap.plus.events.regions.onEnterAdd(game.player, function(region) {
		if (region.properties.isLimit || region.properties.isEnd)
			return game_over(region.properties.isEnd);

		if (region.properties.acceleration)
			game.player.acceleration 	= region.properties.acceleration;
	});
}

function game_map_spawn(block, x, y) {
	var tile 							= game.tilemap.getTileWorldXY(x, y);

	if (tile !== null && tile.layer.name === "ground")
		return false;

	var sprite 							= game.add.sprite(x, y + 1.5, block);
	game.physics.enable(sprite);

	sprite.body.immovable 				= true;
	sprite.body.collideWorldBounds 		= true;

	game.blocks.add(sprite);
}