var Scene 		= Scene || {};

Scene.update 	= function() {
	if (game.isLoaded) {
    	game.player.body.acceleration.x 	= game.player.acceleration;
    	game.player.body.acceleration.y 	= 1000;

    	game.player.points 					+= (Math.abs(game.player.body.velocity.x) / 10000);

        $(".game-points").text(Math.round(game.player.points));

    	if (game.player.y >= (game.tilemap.height * game.tilemap.tileHeight))
    		return Scene.end();

    	game.tilemap.plus.events.regions.triggerWith(game.player);
    	game.tilemap.plus.physics.collideWith(game.player);
    	game.physics.arcade.collide(game.player, game.mapItems);
    }
}