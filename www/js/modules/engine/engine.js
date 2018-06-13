var Sidescroller;

(function() {
	/**
	 * Engine module
	 */
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
	};

	/**
	 * Add game Event Listener
	 * @param {[type]}   event    Event ID
	 * @param {Function} callback Event Callback
	 */
	Engine.prototype.addEventListener 	= function(event, callback) {
		this.Events[event] 				= callback;
	};

	/**
	 * Create game
	 */
	Engine.prototype.Init 				= function() {
		this.Game						= new Phaser.Game(
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

		this.Game._playing 			= false;
		this.Game._started 				= false;

		this.InitGame();
	};

	Engine.prototype.InitGame 			= function() {
		this.Game.fadeIn 				= function(callback) {
			$("canvas, #game-inventory, #game-stats").stop().fadeIn(app_config.game_fade_speed, callback);
		};

		this.Game.fadeOut 				= function(callback) {
			$("canvas, #game-inventory, #game-stats").stop().fadeOut(app_config.game_fade_speed, callback);
		}

		this.Game.start 				= function() {
	    	this._playing 				= true;
	    	this._started 				= false;
		};

		this.Game.stop 					= function() {
			this._playin 				= false;
			this._started 				= false;
		}
	}

	// Create new sidescroller
	Sidescroller 						= new Engine();
})();