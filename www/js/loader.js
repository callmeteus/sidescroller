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
	var toLoad 		= {
		"styles;text/css;style": 		
			["//fonts.googleapis.com/css?family=Baloo", "css/bootstrap.css", "/game.css"],
		"libraries;application/javascript;script": 		
			["js/lib/jquery.js", "js/lib/cookie.js", "js/lib/mustache.js", "js/lib/bootstrap.js", "js/lib/phaser.js", "js/lib/phaser.tilemap.plus.js", "js/lib/fontawesome.js", "game.js"]
	}

	function _loader(src, type, tag, callback) {
		var req 			= new XMLHttpRequest();

		req.addEventListener("progress", (e) => (e.lengthComputable) ? app_loader_progress((e.loaded / e.total) * 100, true) : "");

		req.addEventListener("load", function(e) {
			var s 			= document.createElement(tag);

			s.type 			= type;
			s.innerHTML 	= e.target.responseText;

			document.head.appendChild(s);

			app_loader_progress(100, true);

			callback();
		});

		req.open("GET", src);
		req.send();
	}

	var current 		= 0;
	var currentIndex 	= 0;

	(function _do() {
		var index 		= Object.keys(toLoad)[currentIndex];

		if (typeof index === "undefined")
			return true;

		var array 		= toLoad[index];
		var data 		= index.split(";");

		var str 		= data[0];
		var type 		= data[1];
		var tag 		= data[2];

		if (current === array.length) {
			current 	= 0;
			currentIndex++;
			return _do();
		}

		var currentItem = array[current];
		var currentPerc = ((current / array.length) * 100) / Object.keys(toLoad).length;

		app_loader_set(str + "(" + currentItem + ")", currentPerc);

		_loader(currentItem, type, tag, () => _do());

		current++;
	})();
})();