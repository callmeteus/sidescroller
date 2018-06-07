Sidescroller.Scenes.update 	= function() {
	if (Sidescroller.Game.isLoaded) {
    	Sidescroller.Game.player.body.acceleration.x 	= Sidescroller.Game.player.acceleration;
    	Sidescroller.Game.player.body.acceleration.y 	= 1000;

    	Sidescroller.Game.player.points 					+= (Math.abs(Sidescroller.Game.player.body.velocity.x) / 10000);

        $(".game-points").text(Math.round(Sidescroller.Game.player.points));

    	if (Sidescroller.Game.player.y >= (Sidescroller.Game.tilemap.height * Sidescroller.Game.tilemap.tileHeight))
    		return Sidescroller.Scenes.end();

    	Sidescroller.Game.tilemap.plus.events.regions.triggerWith(Sidescroller.Game.player);
    	Sidescroller.Game.tilemap.plus.physics.collideWith(Sidescroller.Game.player);
    	Sidescroller.Game.physics.arcade.collide(Sidescroller.Game.player, Sidescroller.Game.mapItems);
    }
}