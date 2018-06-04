var $container 	= $("<div/>").appendTo("body");

$.getScript("js/game/map.js");

$.getScript("js/game/dom.js");
$.getScript("js/game/events.js");
$.getScript("js/game/items.js", function() {
	app_mustache_load("game", document.body, { game_items: game_items }, true, game_start);
});

app_mustache_load("menu", $container, null, false, function() {
	$container.find(".modal").modal("show");
});

var game;

function game_render() {
	game.camera.lerp.setTo(0.1);

	if (game.blocks)
		game.blocks.callAll("kill");

	game_map_load("1", function() {
		game.player 					= game.add.sprite(0, 0, "player");

		game.physics.arcade.enable(game.player);

		game.player.points 				= 0;
		game.player.x 					= game.tilemap.helpers.start.x + (game.tilemap.tileWidth / 4);
		game.player.y 					= game.tilemap.helpers.start.y + game.tilemap.tileHeight;

		game.player.body.allowGravity 	= true;
		game.player.body.bounce.set(0.8);
		game.player.body.gravity.set(0, 1000);
		game.player.collideWorldBounds 	= true;

		game.isLoaded 					= true;

		game.player.currentItem 		= game_items[0];
		game.player.acceleration 		= 1000;

		game.camera.follow(game.player, Phaser.Camera.FOLLOW_PLATFORMER);

		game_map_colliders();

		$("#game-inventory").show();
	});
}

function game_start() {
	game = new Phaser.Game("100%", "100%", Phaser.AUTO, "game", { preload: preload, create: create, update: update, render: render }, true);

	function preload() {
		game.load.image("player", "img/player.png");

		for(var item in game_items)
			game.load.image("inventory-" + game_items[item].id, game_items[item].image);
	}

	function create() {
		game.scale.scaleMode 			= Phaser.ScaleManager.RESIZE;
		game.scale.setMaximum();

		game.stage.backgroundColor 		= "rgba(0, 0, 0, 0)";

		// Enable physics
		game.physics.startSystem(Phaser.Physics.ARCADE);

		// Enable tilemap plus
		game.plugins.add(Phaser.Plugin.TilemapPlus);

		game.input.onDown.add(game_event_mouseClick, game);
	}

	var vel 	= 50;

	function update() {
	    if (game.isLoaded) {
	    	game.player.body.acceleration.x 	= vel;
	    	game.player.body.acceleration.y 	= game.player.acceleration;

	    	game.player.points 					+= 0.1;

	    	if (game.player.y >= (game.tilemap.height *game.tilemap.tileHeight))
	    		return game_over();

	    	game.tilemap.plus.events.regions.triggerWith(game.player);
	    	game.tilemap.plus.physics.collideWith(game.player);
	    	game.physics.arcade.collide(game.player, game.blocks);
	    }
	}

	function render() {
		//game.debug.cameraInfo(game.camera, 32, 32);
	}
}

function game_over(win) {
	game.isLoaded 		= false;

	game.player.points 	= Math.round(game.player.points);

	game.player.kill();

	app_mustache_load("end", $container, { win: win }, false, function() {
		$container.find(".modal").modal("show");
		$container.find(".game-score").text(game.player.points);
	});

	$("#game-inventory").hide();
}