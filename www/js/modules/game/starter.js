var game;
var $container 					= $("<div/>").appendTo("body");

/* ---------------------------------------------------------- */

(function() {
	Sidescroller.Game			= new Phaser.Game(
		"100%",
		"100%",
		Phaser.AUTO,
		"",
		{
			preload: 	Sidescroller.Scenes.preload, 
			create: 	Sidescroller.Scenes.create, 
			update: 	Sidescroller.Scenes.update, 
			render: 	Sidescroller.Scenes.render 
		}, 
		true
	);
})();