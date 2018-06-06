var colors 	= {
	Reset: 			"\x1b[0m",
	Bright: 		"\x1b[1m",
	Dim: 			"\x1b[2m",
	Underscore: 	"\x1b[4m",
	Blink: 			"\x1b[5m",
	Reverse: 		"\x1b[7m",
	Hidden: 		"\x1b[8m",

	Black: 			"\x1b[30m",
	Red: 			"\x1b[31m",
	Green: 			"\x1b[32m",
	Yellow: 		"\x1b[33m",
	Blue: 			"\x1b[34m",
	Magenta: 		"\x1b[35m",
	Cyan: 			"\x1b[36m",
	White: 			"\x1b[37m"
};

var logType = {
	room: 	"[" + colors.Magenta + "room" + colors.Reset + "]",
	game: 	"[" + colors.Red + "game" + colors.Reset + "]",
	server: "[" + colors.Yellow + "server" + colors.Reset + "]",
	http: 	"[" + colors.Blue + "http" + colors.Reset + "]"
}

var logDir  = "./logs/";

!fs.existsSync(logDir) && fs.mkdirSync(logDir);

var logf 	= require("fs").createWriteStream(logDir + ((new Date()).toLocaleString().replace(new RegExp(":", "g"), "-").replace(new RegExp("/", "g"), "-").replace(",", "")) + ".log");

function _log(color, type, txt, type2) {
	txt 	= (new Date()).toLocaleString() + " [" + color + type + colors.Reset + "]" + ((typeof type2 === "undefined") ? "" : type2) + " " + txt;
	console.log(txt);

	for(var c in colors)
		txt = txt.replace(colors[c], "");

	logf.write(txt + "\n");
}

function debug() {
	if (!global.debug)
		return;
	
	var msg = "";
	for (var i = 0; i < arguments.length - 1; i++)
		msg = msg + arguments[i] + " ";

	_log(colors.Green, "d", msg, arguments[arguments.length-1]);
}

function info() {
	var msg = "";
	for (var i = 0; i < arguments.length-1; i++)
		msg = msg + arguments[i] + " ";

	_log(colors.Cyan, "i", msg, arguments[arguments.length-1]);
}

function log() {
	var msg = "";
	for (var i = 0; i < arguments.length-1; i++)
		msg = msg + arguments[i] + " ";

	_log(colors.White, "l", msg, arguments[arguments.length-1]);
}

function error() {
	var msg = "";
	for (var i = 0; i < arguments.length; i++)
		msg = msg + arguments[i] + " ";

	_log(colors.Red, "e", msg, arguments[arguments.length-1]);
}

module.exports = {
	log: 	log,
	debug: 	debug,
	info: 	info,
	type: 	logType
}
