Sidescroller.addEventListener("MAP_REGION_ENTER", function(region) {
	if (!Sidescroller.Game._playing)
		return false;

	if (region.properties.isLimit || region.properties.isEnd)
		return Sidescroller.Scenes.end(region.properties.isEnd);

	if (region.properties.acceleration)
		return (Sidescroller.Player.sprite.acceleration = region.properties.acceleration);
});