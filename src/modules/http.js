function app_http(callback) {
	var compression     = require("compression"),
    	minify          = require("express-minify"),
    	session 		= require("express-session"),
    	bodyParser 		= require("body-parser");

    global.passport 	= require("passport");
    	
	// Start Express
	log.info("Starting application...", log.type.server);

	if (!debug) {
	    // Compression middleware
	    app.use(compression());

	    // Minification middleware
	    app.use(minify());
	}

	// Body parser URL encoded
	app.use(bodyParser.urlencoded({ extended: false }));

	// Session
	app.use(session({ secret: app_cookie_secret, resave: true, saveUninitialized: false }));

	// Passport.js
	app.use(passport.initialize());

	// Passport.js session
	app.use(passport.session());

	callback.call(this);
}

exports.start 	= app_http;