function app_loader_set(msg, proc) {
	if (typeof msg.file !== "undefined")
		msg 	= msg.file;

	document.querySelector("#game-loader .game-loader-current").innerText = msg;

	if (proc)
		app_loader_progress(proc);
}

function app_loader_show() {
	$("#game-loader").stop().fadeIn((typeof app_config !== "undefined") ? app_config.game_fade_speed : 150);

	// Reset progress
	app_loader_progress(0);
}

function app_loader_hide() {
	$("#game-loader").stop().fadeOut((typeof app_config !== "undefined") ? app_config.game_fade_speed : 150);
}

function app_loader_progress(perc, isSecondary) {
	document.querySelector(
		"#game-loader ." +
		((isSecondary) ? "progress-current" : "progress-all") +
		" .progress-bar"
	).style.width = (perc + "%");
}

(function() {
	var toLoad 		= [
		{
			str: 	"styles",
			type: 	"text/css",
			tag: 	"style",
			items:
			["css/bootstrap.css", "css/animate.css", "/game.css"]
		},
		{
			str: 	"scripts",
			type: 	"application/javascript",
			tag: 	"script",
			items:	
			["js/lib/jquery.js", "js/lib/wow.js", "js/lib/mustache.js", "js/lib/bootstrap.js", "js/lib/phaser.js", "js/lib/phaser.tilemap.plus.js", "js/lib/fontawesome.js", "game.js"]
		}
	];

	function _loader(src, type, tag, callback) {
		var req 			= new XMLHttpRequest();

		src 				+= ((src.indexOf("?") > -1) ? "&" : "?") + "v=" + app_config.game_version;

		req.addEventListener("progress", (e) => (e.lengthComputable) ? app_loader_progress((e.loaded / e.total) / 100, true) : "");

		req.addEventListener("load", function(e) {
			var s 			= document.createElement(tag);

			s.type 			= type;
			s.innerHTML 	= e.target.responseText;

			document.head.appendChild(s);

			app_loader_progress(100, true);

			if (typeof callback === "function")
				callback();
		});

		req.open("GET", src);
		req.send();
	}

	var current 		= 0;
	var currentIndex 	= 0;
	var keys 			= Object.keys(toLoad);
	var max 			= keys.length;

	(function _do() {
		var index 		= keys[currentIndex];

		if (typeof index === "undefined")
			return true;

		var loading 	= toLoad[index];
		var items 		= loading.items;

		if (current === items.length) {
			current 	= 0;
			currentIndex++;

			return _do();
		}

		var currentItem = items[current];
		var currentPerc = ((current / items.length) * 100) / (max - 1);

		app_loader_set(loading.str + "(" + currentItem + ")", currentPerc);

		_loader(currentItem, loading.type, loading.tag, () => _do());

		current++;
	})();

	// Load fonts
	_loader("//fonts.googleapis.com/css?family=Baloo", "text/css", "style");
})();