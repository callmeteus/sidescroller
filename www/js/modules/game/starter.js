var game;
var $container 									= $("<div/>").appendTo("body");


var game = new Phaser.Game(
	1280, 
	720, 
	Phaser.AUTO, 
	"", { 
		preload: 	Scene.preload, 
		create: 	Scene.create, 
		update: 	Scene.update, 
		render: 	Scene.render 
	}, 
	true
);