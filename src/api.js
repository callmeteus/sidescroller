require("./scripts");

/* ------------------------------------------------------------------------------------------------------- */

app.use(function(req, res, next) {
	var accept 	= req.accepts(["html", "js", "css", "mustache"]);

	if (typeof app_cache[accept] !== "undefined")
		res.setHeader("Cache-Control", "public, max-age=" + app_cache[accept]);
	else
		res.setHeader("Cache-Control", "public, max-age=" + app_cache.default);

	next();
});

app.get("*.mustache", function(req, res, next) {
	res.setHeader("Content-Type", "text/html");

	if (!debug)
		res.setHeader("Cache-Control", "public, max-age=" + app_cache);
	
	next();
});

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

app.get("/api/stages", function(req, res) {
	res.setHeader("Content-Type", "application/json; charset=UTF-8");

	var playerData 		= req.cookies[packageFile.userCookie];
	var end 			= 1;

	if (typeof playerData !== "undefined") {
		try {
			playerData 			= JSON.parse(atob(playerData, "base64"));

			if (!Object.keys(playerData.stages).length)
				end 		= 1;
			else {
				for(var stage in playerData.stages)
					if (playerData.stages[stage].win)
						end 	= parseInt(stage) + 1;

				end++;
			}
		} catch(e) {
			end 			= 1;
			log.error(e, log.type.server);
		}
	}	

	var data 			= [];

	for(var i = 0; i < end; i++) {
		var stage 		= game_stage_list[i];

		if (typeof stage === "undefined")
			break;

		var finalStage 	= {
			id: 	i,
			name: 	stage.name,
			image: 	stage.image,
			done: 	(typeof playerData.stages[i] !== "undefined" && playerData.stages[i].win)
		};

		data.push(finalStage);
	}

	res.end(JSON.stringify(data));
});

app.get("/api/stage/:id", function(req, res) {
	var id 		= parseInt(req.params.id);

	if (isNaN(id))
		return res.end();

	var stage 	= game_stage_list[id];

	if (typeof stage === "undefined")
		return res.end();

	var data 	= require(path.join(app_dir, "../maps/" + stage.file + ".json"));

	data.id 	= id;
	data.name 	= stage.name;
	data.image 	= stage.image;

	res.setHeader("Content-Type", "application/json; charset=UTF-8");
	res.end(JSON.stringify(data));
});