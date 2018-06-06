var game;
var $container 			= $("<div/>").appendTo("body");

var game_current_stage 	= null;

/* ---------------------------------------------------------- */

jQuery.getScripts = function(scripts, callback) {
	var progress 	= 0;

	var _getScript 	= function() {
		if (progress == scripts.length)
		  	return callback(null, 100);
		else
			callback(scripts[progress], Math.round((progress / scripts.length) * 100));

		$.ajax({
			type: 		"GET",
			url: 		scripts[progress] + "?v=" + app_config.game_version,
			success: 	function() {
		    	progress++;

		    	_getScript();
		    },
		    dataType: 	"script",
		    cache: 		true
		});
	};

	_getScript();
};

var game_scripts 	= ["/js/lib/phaser.js", "/js/lib/phaser.tilemap.plus.js", "/js/lib/fontawesome.js"];

$.getScripts(game_scripts, function(file, progress) {
	if (file !== null)
		app_loader_set(file.split("/").pop(), progress);

	if (progress === 100)
		game 				= new Phaser.Game(
			1280,
			720,
			Phaser.AUTO,
			"",
			{
				preload: 	Scene.preload, 
				create: 	Scene.create, 
				update: 	Scene.update, 
				render: 	Scene.render 
			}, 
			true
		);
});