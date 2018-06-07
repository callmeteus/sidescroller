Sidescroller.addEventListener("POINTER_MOVE", function() {
	Sidescroller.Game.cursorMarker.x 	= Sidescroller.Game.layers.ground.getTileX(Sidescroller.Game.input.activePointer.worldX) * Sidescroller.Game.tilemap.tileWidth;
    Sidescroller.Game.cursorMarker.y 	= Sidescroller.Game.layers.ground.getTileY(Sidescroller.Game.input.activePointer.worldY) * Sidescroller.Game.tilemap.tileHeight;
})