// Debug var
global.debug        = process.env.NODE_ENV !== "production";

/*
    Requires
*/

global.fs           = require("fs");
global.path         = require("path");
global.glob         = require("glob");

// Package file
global.packageFile  = Object.assign({}, require("../package"), {
    userCookie:     "sidescroller_data",
    userKeyCookie:  "_suid"
});

var async           = require("async");


/* --------------------------------------------------------------------- */

global.log          = require("./log");

/* --------------------------------------------------------------------- */

// Clear console if available
if (typeof process.stdout.getWindowSize === "function")
    for(var i = 0; i < process.stdout.getWindowSize()[1]; i++)
        console.log("\r\n");

/* --------------------------------------------------------------------- */

require("./config");
require("./utils");

/* --------------------------------------------------------------------- */

log.info("Is debug?", debug, log.type.server);

async.series([
    require("./modules/db").start,
    require("./modules/express").start,
    require("./modules/http").start,
    require("./modules/passport").start,
    require("./modules/routes").start,
    require("./modules/start").start,
]);

if (debug)
    require("./debug");