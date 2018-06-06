// Debug var
global.debug        = process.env.NODE_ENV !== "production";
debug   = false;

/*
    Requires
*/

// Configuration file
require("./config");

// Package file
global.packageFile  = require("./package");

packageFile.userCookie  = "_gd";

var express         = require("express"),
    cookieParser    = require("cookie-parser"),
    compression     = require("compression"),
    minify          = require("express-minify");

global.fs           = require("fs");
global.path         = require("path");

/* --------------------------------------------------------------------- */

global.log          = require("./log");

// Setup express
global.app          = express();
var server          = require("http").Server(app);

/* --------------------------------------------------------------------- */

if (typeof process.stdout.getWindowSize === "function")
    for(var i = 0; i < process.stdout.getWindowSize()[1]; i++)
        console.log("\r\n");

/* --------------------------------------------------------------------- */

// Remove HTML
String.prototype.htmlEntities   = function () {
    return this.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
};

// Base 64 decode
global.atob = function(str) {
    return new Buffer(str, "base64").toString("utf8");
};

// Base 64 encode
global.btoa = function(str) {
    return new Buffer(str).toString("base64");
};

/* --------------------------------------------------------------------- */

// XSS Protection
app.use(function(req, res, next){
    res.header("X-XSS-Protection" , 0);
    res.header("Access-Control-Allow-Origin", "http://" + process.env.NODE_IP || app_host + ":" + process.env.PORT || app_port);

    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "POST GET");
    res.header("Access-Control-Allow-Credentials", "true");

    return next();
});

// Start Express
log.info("Starting app express...", log.server);

// Cookie parser middleware
app.use(cookieParser());

if (!debug) {
    // Compression middleware
    app.use(compression());

    // Minification middleware
    app.use(minify());
}

// Serve static files
app.use(express.static("www", { maxAge: (debug) ? 0 : 31557600 }));

// Require API file handler
require("./stages");
require("./api");

// Start express
server.listen(process.env.PORT || app_port, process.env.NODE_IP);

log.info("-> Listening on port " + app_port, log.server);