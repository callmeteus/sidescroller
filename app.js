/*
    Requires
*/

// Configuration file
global.configFile   = require("./config");
global.packageFile  = require("./package");

packageFile.userCookie  = "_gd";

var express         = require("express"),
    cookieParser    = require("cookie-parser"),
    env             = process.env;

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

// Start Express
log.info("Starting app express...", log.server);

// Serve static files
app.use(express.static("www"));

// Cookie parser middleware
app.use(cookieParser());

// Start express
server.listen(app_port || 80, env.NODE_IP);

log.info("-> Listening on port " + app_port, log.server);

/* --------------------------------------------------------------------- */

// Remove HTML
String.prototype.htmlEntities   = function () {
    return this.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
};

String.prototype.minify         = function() {
    return this.replace(new RegExp("\n", "g"), "");
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
    res.header("Access-Control-Allow-Origin", "http://" + app_host + ":" + app_port);

    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "POST GET");
    res.header("Access-Control-Allow-Credentials", "true");

    return next();
});

// Require API file handler
require("./stages");
require("./api");