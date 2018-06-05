var fs 					= require("fs");
var glob 				= require("glob");

/* ------------------------------------------------------------------------------------------------------- */

var app_scripts;
var app_styles;

function app_get_scripts() {
	app_scripts 		= "";

	glob("www/js/modules/**/*.js", function(err, files) {
		if (err)
			throw err;

		for(var file in files) {
			file 	= files[file];

			app_scripts 	+= 
				"/* --------- app script " + (file.replace("www/js/modules/", "")) + " --------- */\n" +
				(fs.readFileSync(file, "utf-8").minify()) +
				"\n";
		}

		for(var config in packageFile)
			if (config !== "dependencies" && config !== "main")
				app_scripts 	= app_scripts.replace(new RegExp("{{game_" + config + "}}", "g"), packageFile[config]);
	});
};

function app_get_styles() {
	app_styles 			= "";

	glob("www/css/modules/**/*.css", function(err, files) {
		if (err)
			throw err;

		for(var file in files)
			app_styles 	+= "/* --------- style " + (files[file].replace("www/css/modules/", "")) + " --------- */\n" + (fs.readFileSync(files[file], "utf-8").minify()) + "\n";
	});
};

app_get_scripts();
app_get_styles();

/* ------------------------------------------------------------------------------------------------------- */

app.get("*.mustache", function(req, res, next) {
	res.setHeader("Content-Type", "text/html");

	if (!debug)
		res.setHeader("Cache-Control", "public, max-age=86400");
	
	next();
});

// game index
app.get("/", function(req, res) {
	res.setHeader("Content-Type", "text/html");

	if (!debug)
		res.setHeader("Cache-Control", "public, max-age=86400");
});

// game scripts
app.get("/game.js", function(req, res) {
	res.setHeader("Content-Type", "text/javascript");
	
	// Cache if not debug
	if (!debug)
		res.setHeader("Cache-Control", "public, max-age=86400");

	if (!debug)
		res.write("(function(){");

	res.write(app_scripts);
	
	if (!debug)
		res.write("})();");

	res.end();

	if (debug)
		app_get_scripts();
});

// game styles
app.get("/game.css", function(req, res) {
	res.setHeader("Content-Type", "text/css");
	
	if (!debug)
		res.setHeader("Cache-Control", "public, max-age=86400");

	res.end(app_styles);

	if (debug)
		app_get_styles();
});

app.get("/api/stages", function(req, res) {
	res.setHeader("Content-Type", "application/json");

	var playerData 		= req.cookies[packageFile.userCookie];
	var end 			= 1;

	if (typeof playerData !== "undefined") {
		try {
			playerData 			= JSON.parse(Buffer.from(playerData, "base64").toString("utf8"));

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

	var data 	= require("./maps/" + stage.file + ".json");

	data.id 	= id;
	data.name 	= stage.name;
	data.image 	= stage.image;

	res.setHeader("Content-Type", "application/json");
	res.end(JSON.stringify(data));
});