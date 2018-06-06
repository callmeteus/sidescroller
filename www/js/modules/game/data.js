var game_player_data 			= null;
var game_player_data_cookie 	= "{{game_userCookie}}";

/**
 * Check if game player data exists
 * @return {boolean} Cookie existance
 */
function game_player_data_exists() {
	return Cookies.exists(game_player_data_cookie);
}

/**
 * Load player data
 * @return {object} Player data
 */
function game_player_data_load() {
	var data 	= {
		level: 		1,
		playedTime: 0,

		stages: 	{

		}
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
 * @param  {string} key The data key
 * @return {[type]}     Data
 */
function game_player_data_get(key) {
	return key.split(".").reduce(function(prev, curr) {
		return prev ? prev = prev[curr] : undefined;
	}, game_player_data);
}

/**
 * Set player data
 * @param  {object} 	key        Player data key
 * @param  {object} 	value      Player data value
 * @param  {boolean} 	shouldSave Should save player data
 * @return {boolean}         	   Success
 */
function game_player_data_set(key, value, shouldSave) {
	if (game_player_data === null)
		game_player_data 	= game_player_data_get();

	var o 				= game_player_data;
	var stack 			= key.split(".");

  	while(stack.length > 1)
    	o 				= o[stack.shift()];

	o[stack.shift()] 	= value;

	if (shouldSave)
		return game_player_data_save();

	return true;
}

/**
 * Increase a key number
 * @param  {string} 	key        Key to increase
 * @param  {boolean} 	shouldSave Should save
 * @return {boolean}            
 */
function game_player_data_increase(key, shouldSave) {
	return game_player_data_set(key, game_player_data_get(key) + 1, true);
}

/**
 * Save player data
 * @param  {object} data Data to save (optional)
 * @return {boolean}     Success
 */
function game_player_data_save(data) {
	if (typeof data === "undefined")
		data 	= game_player_data;

	return Cookies.set(game_player_data_cookie, btoa(JSON.stringify(data)));
}

/**
 * Create new player data
 * @return {[type]} [description]
 */
function game_player_data_create() {
	console.info("New player data created");
	return game_player_data_save(game_player_data_load());
}

if (!game_player_data_exists())
	game_player_data_create();

game_player_data 	= game_player_data_load();