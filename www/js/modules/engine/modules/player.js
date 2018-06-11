(function() {
	/**
	 * Load player data
	 * @return {object} Player data
	 */
	Sidescroller.Player.Data.load 	= function() {
		var data 	= {
			level: 		1,
			playedTime: 0,
			stages: 	{}
		};

		if (localStorage.getItem(game_player_data_key) !== null)
			try {
				var ud  = JSON.parse(
					atob(
						localStorage.getItem(game_player_data_localKey)
					)
				);

				data 	= Object.assign(data, ud);
			} catch(e) {
				throw new Error("Invalid player saved data, may be corrupted.");
			}

		return data;
	};
})();