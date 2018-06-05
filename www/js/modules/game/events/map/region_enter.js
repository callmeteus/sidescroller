var MapEvent 			= MapEvent || {};

MapEvent.regionEnter 	= function(region) {
	if (!game.isLoaded)
		return false;

	if (region.properties.isLimit || region.properties.isEnd)
		return Scene.end(region.properties.isEnd);

	if (region.properties.acceleration)
		return (game.player.acceleration = region.properties.acceleration);
};