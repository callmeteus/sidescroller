(function() {
	var game_player_data_cookie 	= "{{game_userCookie}}";

	Sidescroller.Player.Data 		= {};

	/**
	 * Check if game player data exists
	 * @return {boolean} Cookie existance
	 */
	Sidescroller.Player.Data.exists = function() {
		return Cookies.exists(game_player_data_cookie);
	}

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

		if (Cookies.exists(game_player_data_cookie))
			try {
				var ud  = JSON.parse(
					atob(
						Cookies.get(game_player_data_cookie)
					)
				);

				data 	= Object.assign(data, ud);
			} catch(e) {
				throw new Error("Invalid player saved data, may be corrupted.");
			}

		return data;
	}

	/**
	 * Get player data
	 * @param  {string} 	key The data key
	 * @return {object}     Data
	 */
	Sidescroller.Player.Data.get 	= function(key) {
		return key.split(".").reduce(function(prev, curr) {
			return prev ? prev = prev[curr] : undefined;
		}, Sidescroller.Player.Data.object);
	}

	/**
	 * Set player data
	 * @param  {object} 	key        Player data key
	 * @param  {object} 	value      Player data value
	 * @param  {boolean} 	shouldSave Should save player data
	 * @return {boolean}         	   Success
	 */
	Sidescroller.Player.Data.set 	= function(key, value, shouldSave) {
		if (Sidescroller.Player.Data.object === null)
			Sidescroller.Player.Data.object = Sidescroller.Player.Data.get();

		var o 				= Sidescroller.Player.Data.object;
		var stack 			= key.split(".");

	  	while(stack.length > 1)
	    	o 				= o[stack.shift()];

		o[stack.shift()] 	= value;

		if (shouldSave)
			return Sidescroller.Player.Data.save();
		else
			return true;
	}

	/**
	 * Increase a key number
	 * @param  {string} 	key        Key to increase
	 * @param  {boolean} 	shouldSave Should save
	 * @return {boolean}            
	 */
	Sidescroller.Player.Data.increase 	= function(key, shouldSave) {
		return Sidescroller.Player.Data.set(key, Sidescroller.Player.Data.get(key) + 1, true);
	}

	/**
	 * Save player data
	 * @param  {object} data Data to save (optional)
	 * @return {boolean}
	 */
	Sidescroller.Player.Data.save 		= function(data) {
		if (typeof data === "undefined")
			data 	= Sidescroller.Player.Data.object;

		return Cookies.set(game_player_data_cookie, btoa(JSON.stringify(data)));
	}

	/**
	 * Create new player data
	 * @return {cookie}
	 */
	Sidescroller.Player.Data.create 	= function() {
		console.info("New player data created");
		return Sidescroller.Player.Data.save(Sidescroller.Player.Data.load());
	}

	if (!Sidescroller.Player.Data.exists())
		Sidescroller.Player.Data.create();

	Sidescroller.Player.Data.object 	= Sidescroller.Player.Data.load();
})();