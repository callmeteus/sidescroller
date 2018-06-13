function app_start(callback) {
	// Serve static files
	app.use(express.static(app_dir, { maxAge: (debug) ? 0 : app_cache.default }));

	if (!process.env.ISTRAVIS) {
	    // Start express
	    app.listen(process.env.PORT || app_port, process.env.NODE_IP);

	    log.info("-> Listening on port", app_port, log.type.server);

	    // Call callback
	    callback.call(this);
	} else 
	    log.info("-> Build success", log.type.server);
};

exports.start 	= app_start;