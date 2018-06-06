function game_scene_end_stageCheck(data) {
	// Set player stage data
	game_stage_data_set(game_current_stage, data);

	// Get available stages
	game_stage_available(function() {
		// Prepare end screen data
		data 				= Object.assign(data, {
			stage: 			game_stage_list[game_current_stage],
			time: 			data.time.fancyTimeFormat(),
			next: 			(game_stage_list.length-1 > game_current_stage) && (data.win || data.prevWin)
		});

		// Load game end screen
		app_mustache_load("end", $container, data, false, function() {
			$container.find(".modal").modal("show");
		});
	});

	return (data.win || data.prevWin);
}