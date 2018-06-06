function app_loader_set(msg, proc) {
	if (typeof msg.file !== "undefined")
		msg 	= msg.file;

	$("#game-loader .game-loader-current").text(msg);

	if (proc)
		app_loader_progress(proc);
}

function app_loader_show() {
	$("#game-loader").stop().fadeIn(app_config.game_fade_speed);
}

function app_loader_hide() {
	$("#game-loader").stop().fadeOut(app_config.game_fade_speed);
}

function app_loader_progress(perc) {
	$("#game-loader .progress-bar").css("width", perc + "%");
}
