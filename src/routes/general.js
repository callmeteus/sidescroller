// XSS Protection and Cache
app.use(function(req, res, next) {
	if (debug)
		return next();

    res.header("X-XSS-Protection", 0);

    res.header("Access-Control-Allow-Origin", req.protocol + "://" + app_domain);

    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "POST GET");
    res.header("Access-Control-Allow-Credentials", "true");

    /* ---------------------------------------------------------------- */

    var accept 	= req.accepts(Object.keys(app_cache));

	if (typeof app_cache[accept] !== "undefined")
		res.setHeader("Cache-Control", "public, max-age=" + app_cache[accept]);
	else
		res.setHeader("Cache-Control", "public, max-age=" + app_cache.default);

	return next();
});

app.all("/api/*", function(req, res, next) {
	res.setHeader("Cache-Control", "private");
	next();
});

app.get("/", function(req, res) {
	fs.readFile(path.join(app_dir, "index.html"), "utf8", function(err, data) {
		if (err)
			return log.error(err, log.type.http);

		var rData 	= Object.assign({}, packageFile, { 
			fade_speed: 	250,
			user_loggedIn: 	req.isAuthenticated()
		});

		for(var index in rData)
			data 	= data.replaceAll("{{game_" + index + "}}", app_treat_output(rData[index]));

		res.end(data);
	});
});