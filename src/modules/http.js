function app_http(callback) {
	log.info("Starting up application...", log.type.server);

	if (!process.env.ISTRAVIS) {
	    // Start express
	    app.listen(process.env.PORT || app_port, process.env.NODE_IP);

	    log.info("-> Listening on port", app_port, log.type.server);

	    // Call callback
	    callback.call(this);
	} else 
	    log.info("-> Build success", log.type.server);
}

exports.start 	= app_http;