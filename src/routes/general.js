// XSS Protection and Cache
app.use(function(req, res, next) {
	if (debug)
		return next();

    res.header("X-XSS-Protection", 0);

    res.header("Access-Control-Allow-Origin", req.protocol + "://" + app_domain);

    res.header("Access-Control-Allow-Headers", "X-Requested-With");
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