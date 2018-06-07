Sidescroller.addEventListener("MAP_REGION_ENTER", function(region) {
	if (!Sidescroller.Game.isLoaded)
		return false;

	if (region.properties.isLimit || region.properties.isEnd)
		return Sidescroller.Scenes.end(region.properties.isEnd);

	if (region.properties.acceleration)
		return (Sidescroller.Game.player.acceleration = region.properties.acceleration);
});