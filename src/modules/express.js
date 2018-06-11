var async 				= require("async");

function app_http(callback) {
	var express         = require("express"),
    	compression     = require("compression"),
    	minify          = require("express-minify"),
    	session 		= require("express-session"),
    	bodyParser 		= require("body-parser");

    global.passport 	= require("passport");

    // Setup express
	global.app          = express();
	global.http         = require("http").Server(app);

	// Start Express
	log.info("Starting app express...", log.type.server);

	if (!debug) {
	    // Compression middleware
	    app.use(compression());

	    // Minification middleware
	    app.use(minify());
	}

	// Body parser URL encoded
	app.use(bodyParser.urlencoded({ extended: false }));

	// Serve static files
	app.use(express.static(app_dir, { maxAge: (debug) ? 0 : app_cache.default }));

	app.use(session({ secret: app_cookie_secret, resave: true, saveUninitialized: false }));

	// Passport.js
	app.use(passport.initialize());

	// Passport.js session
	app.use(passport.session());

	log.info("-> Started", log.type.server);

	callback.call(this);
}

exports.start 	= app_http;