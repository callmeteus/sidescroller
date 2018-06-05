var Scene 		= Scene || {};

Scene.preload 	= function() {
	game.load.image("player", "img/player.png");

	// Load game items
	for(var item in game_items)
		game.load.image("inventory-" + game_items[item].id, game_items[item].image);

	// Load menu
	Scene.menu();
};