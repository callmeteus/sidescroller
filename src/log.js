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

var logDir  = path.join(__dirname, "../logs/");

!fs.existsSync(logDir) && fs.mkdirSync(logDir);

var logf 	= fs.createWriteStream(logDir + ((new Date()).toLocaleString().replace(new RegExp(":", "g"), "-").replace(new RegExp("/", "g"), "-").replace(",", "")) + ".log");

function _log(color, type, txt, type2) {
	txt 	= (new Date()).toLocaleString() + " [" + color + type + colors.Reset + "]" + ((typeof type2 === "undefined") ? "" : type2) + " " + txt;
	console.log(txt);

	for(var c in colors)
		txt = txt.replace(colors[c], "");

	logf.write(txt + "\n");

	return true;
}

function _format(args) {
	var msg = "";

	for (var i = 0; i < args.length - 1; i++)
		if (typeof args[i] === "object")
			msg += JSON.stringify(args[i]) + " "
		else
			msg += args[i] + " ";

	return msg;
}

function _logger(color, type, args) {
	return _log(color, type, _format(args), args[args.length - 1]);
}

function debug() {
	return (global.debug) ? _logger(colors.Green, "d", arguments) : false;
}

function info() {
	return _logger(colors.Cyan, "i", arguments);
}

function log() {
	return _logger(colors.White, "l", arguments);
}

function error() {
	return _logger(colors.Red, "e", arguments);
}

module.exports = {
	log: 	log,
	debug: 	debug,
	info: 	info,
	error: 	error,
	type: 	logType
}