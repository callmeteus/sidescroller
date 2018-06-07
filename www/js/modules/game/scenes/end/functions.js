function game_scene_end_stageCheck(data) {
	// Set player stage data
	Sidescroller.Player.Data.Stages.set(Sidescroller.Stages.current, Object.assign(data, {
		win: 	(data.prevWin) ? true : data.win
	}));

	// Get available stages
	Sidescroller.Stages.get(function() {
		// Prepare end screen data
		data 				= Object.assign(data, {
			stage: 			Sidescroller.Stages.list[Sidescroller.Stages.current],
			time: 			data.time.fancyTimeFormat(),
			next: 			(Sidescroller.Stages.list.length-1 > Sidescroller.Stages.current) && (data.win || data.prevWin)
		});

		// Load game end screen
		app_mustache_load("end", $container, data, false, function() {
			$container.find(".modal").modal("show");
		});
	});

	return (data.win || data.prevWin);
}