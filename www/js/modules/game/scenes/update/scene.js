Sidescroller.Scenes.update 	= function() {
	if (Sidescroller.Game._playing) {
    	Sidescroller.Player.sprite.body.acceleration.x 	= Sidescroller.Player.sprite.acceleration;

    	Sidescroller.Player.sprite.points 				+= (Math.abs(Sidescroller.Player.sprite.body.velocity.x) / 10000);

        $(".game-points").text(Math.round(Sidescroller.Player.sprite.points));

    	if (Sidescroller.Player.sprite.y <= -300 || Sidescroller.Player.sprite.y >= (Sidescroller.Game.tilemap.height * Sidescroller.Game.tilemap.tileHeight))
    		return Sidescroller.Scenes.end();

    	Sidescroller.Game.tilemap.plus.events.regions.triggerWith(Sidescroller.Player.sprite);
    	Sidescroller.Game.tilemap.plus.physics.collideWith(Sidescroller.Player.sprite);
    	Sidescroller.Game.physics.arcade.collide(Sidescroller.Player.sprite, Sidescroller.Game.mapItems);
    }
}