function SidescrollerMarker(sprite, x, y) {
	var marker;

	if (!sprite) {
		marker 			= Sidescroller.Game.add.graphics();
    	marker.lineStyle(2, 0xffffff, 1);
    	marker.drawRect(0, 0, Sidescroller.Game.tilemap.tileWidth, Sidescroller.Game.tilemap.tileHeight);
    } else {
    	marker 			= Sidescroller.Game.add.sprite(x, y, sprite);
    	marker.alpha 	= 0.6;
    }

    Sidescroller.Game.add.tween(marker).to({ alpha: 0.8 }, 750, Phaser.Easing.Cubic.InOut, true, 0, -1, true);

    return marker;
}