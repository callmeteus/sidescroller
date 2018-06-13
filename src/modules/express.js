var async 				= require("async");

function app_http(callback) {
	global.express      = require("express");

    // Setup express
	global.app          = express();
	global.http         = require("http").Server(app);

	callback.call(this);
}

exports.start 	= app_http;