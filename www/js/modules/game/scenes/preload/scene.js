var Scene 		= Scene || {};

Scene.preload 	= function() {
	game.load.image("player", "img/player.png");

	game.load.onLoadStart.add(app_loader_show, game);
	game.load.onFileComplete.add((perc, file) => app_loader_set(file, perc), game);
	game.load.onLoadComplete.add(app_loader_hide, game);

	// Load game items
	for(var item in game_items)
		game.load.image("inventory-" + game_items[item].id, game_items[item].image);

	// Load menu
	Scene.menu();
};