var fs 					= require("fs");
var glob 				= require("glob");

/* ------------------------------------------------------------------------------------------------------- */

var app_scripts 		= "";

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

var app_styles 			= "";
glob("www/css/modules/**/*.css", function(err, files) {
	if (err)
		throw err;

	for(var file in files)
		app_styles 	+= "/* --------- style " + (files[file].replace("www/css/modules/", "")) + " --------- */\n" + (fs.readFileSync(files[file], "utf-8").minify()) + "\n";
});

/* ------------------------------------------------------------------------------------------------------- */

app.get("*.mustache", function(req, res, next) {
	res.setHeader("Content-Type", "text/html");
	next();
});

// app index
app.get("/", function(req, res) {
	res.setHeader("Content-Type", "text/html");
	
	if (!debug)
		res.setHeader("Cache-Control", "public, max-age=86400");

	res.end(pages.index(defaults));
});

// app script
app.get("/game.js", function(req, res) {
	res.setHeader("Content-Type", "text/javascript");
	
	if (!debug)
		res.setHeader("Cache-Control", "public, max-age=86400");

	res.write(`/* 
	Sidescroller Game
	by Kemononaru Studio
*/\n`);

	res.write("(function(){");
	res.write(app_scripts);
	res.write("})();");

	res.end();
});

// app style
app.get("/game.css", function(req, res) {
	res.setHeader("Content-Type", "text/css");
	
	if (!debug)
		res.setHeader("Cache-Control", "public, max-age=86400");

	res.end(app_styles);
});