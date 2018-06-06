function game_fadeIn(callback) {
	$("canvas, #game-inventory, #game-stats").stop().fadeIn(app_config.game_fade_speed, callback);
}

function game_fadeOut(callback) {
	$("canvas, #game-inventory, #game-stats").stop().fadeOut(app_config.game_fade_speed, callback);
}