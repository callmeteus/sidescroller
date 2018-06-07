Sidescroller.Scenes.preload 	= function() {
	Sidescroller.Game.load.image("player", "img/player.png");

	Sidescroller.Game.load.onLoadStart.add(app_loader_show, game);
	Sidescroller.Game.load.onFileComplete.add((perc, file) => app_loader_set(file, perc), game);
	Sidescroller.Game.load.onLoadComplete.add(app_loader_hide, game);

	// Load game items
	for(var item in Sidescroller.Items.list)
		Sidescroller.Game.load.image("inventory-" + Sidescroller.Items.list[item].id, Sidescroller.Items.list[item].image);
};