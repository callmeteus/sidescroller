var fs 			= require("fs");
var glob 		= require("glob");
var minify 		= require("./minify");

app_scripts 	= "";
app_styles 		= "";

app_get_scripts = function() {
	app_scripts 		= "";

	// Glob all JS modules
	glob("www/js/modules/**/*.js", function(err, files) {
		if (err)
			throw err;

		// Iterate all modules
		for(var file in files) {
			file 	= files[file];
			var js 	= fs.readFileSync(file, "utf-8");

			if (debug) {
				app_scripts 	+= "/* --------- app script " + (file.replace("www/js/modules/", "")) + " --------- */\n";
				app_scripts 	+= js;
				app_scripts 	+= "\n";
			} else
				app_scripts 	+= js;
		}

		for(var config in packageFile)
			if (config !== "dependencies" && config !== "main")
				app_scripts 	= app_scripts.replace(new RegExp("{{game_" + config + "}}", "g"), packageFile[config]);
	});
};

app_get_styles 	= function() {
	app_styles 			= "";

	// Glob all CSS modules
	glob("www/css/modules/**/*.css", function(err, files) {
		if (err)
			throw err;

		// Iterate all modules
		for(var file in files) {
			file 		= files[file];
			var css 	= fs.readFileSync(file, "utf-8");

			if (debug) {
				app_styles 	+= "/* --------- style " + (file.replace("www/css/modules/", "")) + " --------- */\n";
				app_styles 	+= css;
				app_styles 	+= "\n";
			} else
				app_styles 	+= app_minify(css);
		}
	});
};

app_get_scripts();
app_get_styles();