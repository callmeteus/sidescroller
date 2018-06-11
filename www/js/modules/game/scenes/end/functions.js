function game_scene_end_stageCheck(data) {
	// Prepare end screen data
	var lData 		= Object.assign({}, data, {
		stage: 			Sidescroller.Stages.list[Sidescroller.Stages.current],
		time: 			data.time.fancyTimeFormat(),
		next: 			(Sidescroller.Stages.list.length-1 > Sidescroller.Stages.current) && data.win
	});

	// Load game end screen
	app_mustache_load("end", $container, lData, false, function() {
		$container.find(".modal").modal("show");

		// Set player stage data
		Sidescroller.Stages.set(Sidescroller.Stages.current, data, function(data) {
			if (data.next)
				$container.find("#game-button-next").prop("disabled", false);
		});
	});

	return data.win;
}