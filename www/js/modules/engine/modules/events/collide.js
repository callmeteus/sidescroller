Sidescroller.addEventListener("PLAYER_COLLIDE", function(s1, s2) {
	// Check if it's a game custom item
	if (!s2.collision)
		return;

	// Check if item has function
	if (Sidescroller.Items.get(s2.item).events.collide)
		Sidescroller.Items.get(s2.item).events.collide.apply(this, arguments);

	// Check if it's first collision, then reset it
	if (s2.collision.first)
		s2.collision.first 	= false;
});