var Scene 		= Scene || {};

Scene.preload 	= function() {
	game.load.image("player", "img/player.png");

	// Load game items
	for(var item in game_items)
		game.load.image("inventory-" + game_items[item].id, game_items[item].image);

	// Load menu
	app_mustache_load("menu", $container, null, false, function() {
		$container.find("#game-menu").modal("show");

		// Load game container
		app_mustache_load("game", document.body, { game_items: game_items }, true, Scene.menu);
	});
};