require("../scripts");

// game scripts
app.get("/game.js", function(req, res) {
	res.setHeader("Content-Type", "application/javascript; charset=UTF-8");

	var response 	= app_scripts;

	if (!debug) {
		//response 	= app_minify_js(response);

		// Add function envelope
		response 	= "(function(){" + response + "})();";
	}

	// Send response
	res.end(response);

	if (debug)
		app_get_scripts();
});

// game styles
app.get("/game.css", function(req, res) {
	res.setHeader("Content-Type", "text/css; charset=UTF-8");

	res.end(app_styles);

	if (debug)
		app_get_styles();
});