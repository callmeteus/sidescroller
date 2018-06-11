function app_routes(callback) {
	glob(path.join(__dirname, "../routes/**/*.js"), function(err, files) {
	    if (err)
	        throw err;

	    for(var file in files) {
	    	var module 	= files[file];

	        log.debug("Loading module", path.basename(module) + "...", log.type.server);
	        require(module);
	        log.debug("-> Loaded", log.type.server);
	    }

	    callback.call(this);
	});
}

app_route_loggedIn 	= function(req, res, next) {
    return (req.user) ? next() : res.status(401).end("Unauthorized");
}

exports.start 	= app_routes;