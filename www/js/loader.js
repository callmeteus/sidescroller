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
	var styles 		= ["https://fonts.googleapis.com/css?family=Baloo", "css/bootstrap.css", "/game.css?v=1"];
	var libraries 	= ["jquery", "cookie", "mustache", "bootstrap", "phaser", "phaser.tilemap.plus", "fontawesome"];

	function _loadStyle(style) {
		var req 			= new XMLHttpRequest();

		req.addEventListener("progress", (e) => (e.lengthComputable) ? app_loader_progress((e.loaded / e.total) * 100, true) : "");

		req.addEventListener("load", function(e) {
			var s 			= document.createElement("style");

			s.type 			= "text/css";
			s.innerHTML 	= e.target.responseText;

			document.head.appendChild(s);

			app_loader_progress(100, true);

			_doStyles();
		});

		req.open("GET", style);
		req.send();
	};

	function _loadScript(script) {
		var req 			= new XMLHttpRequest();

		req.addEventListener("progress", (e) => (e.lengthComputable) ? app_loader_progress((e.loaded / e.total) * 100, true) : "");

		req.addEventListener("load", function(e) {
			var s 			= document.createElement("script");

			s.type 			= "text/javascript";
			s.innerHTML 	= e.target.responseText;

			document.head.appendChild(s);

			app_loader_progress(100, true);

			_doScripts();
		});

		req.open("GET", script);
		req.send();
	};

	var current 		= 0;
	function _doScripts() {
		var currentLib 	= libraries[current];

		if (current > libraries.length)
			return false;

		if (current === libraries.length) {
			app_loader_set("game", 90);
			_loadScript("game.js");

			current 	= libraries.length + 1;
		} else {
			_loadScript("js/lib/" + currentLib + ".js");
			current++;

			app_loader_set("libraries (" + currentLib + ")", ((current - 1) / libraries.length) * 100);
		}
	}

	function _doStyles() {
		var currentStyle 	= styles[current];

		if (current > styles.length)
			return false;

		if (current === styles.length) {
			app_loader_set("libraries", 50);
			current 	= 0;
			_doScripts();
		} else {
			_loadStyle(currentStyle);
			current++;

			app_loader_set("styles (" + currentStyle + ")", ((current - 1) / styles.length) * 100);
		}
	}

	_doStyles();
})();