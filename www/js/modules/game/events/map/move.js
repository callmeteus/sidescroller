var MapEvent 				= MapEvent || {};

MapEvent.move 				= function() {
    game.cursorMarker.x 	= game.layers.ground.getTileX(game.input.activePointer.worldX) * game.tilemap.tileWidth;
    game.cursorMarker.y 	= game.layers.ground.getTileY(game.input.activePointer.worldY) * game.tilemap.tileHeight;
}