var Sidescroller;

(function() {
	function Engine() {
		function EngineModule() {};

		this.Game 	= null;
		this.Events = new EngineModule();

		this.Player = new EngineModule();
			this.Player.Data 	= new EngineModule();

		this.Stages = new EngineModule();
		this.Items 	= new EngineModule();
		this.Scenes = new EngineModule();
		this.Timer 	= new EngineModule();

		this.addEventListener 	= function(event, callback) {
			this.Events[event] 	= callback;
		};

		this.Init 	= function EngineModule() {
			this.Game			= new Phaser.Game(
				"100%",
				"100%",
				Phaser.AUTO,
				"",
				{
					preload: 	this.Scenes.preload, 
					create: 	this.Scenes.create, 
					update: 	this.Scenes.update, 
					render: 	this.Scenes.render 
				}, 
				true
			);
		};
	};

	Sidescroller 	= new Engine();
})();