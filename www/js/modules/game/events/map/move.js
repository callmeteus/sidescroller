var MapEvent 				= MapEvent || {};

MapEvent.move 				= function() {
    game.cursorMarker.x 	= game.groundLayer.getTileX(game.input.activePointer.worldX) * game.tilemap.tileWidth;
    game.cursorMarker.y 	= game.groundLayer.getTileY(game.input.activePointer.worldY) * game.tilemap.tileHeight;
}