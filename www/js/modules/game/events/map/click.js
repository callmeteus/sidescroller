var MapEvent 		= MapEvent || {};

MapEvent.click 		= function(pointer) {
	var tileworldX 	= pointer.worldX - (pointer.worldX % game.tilemap.tileWidth);    
	var tileworldY 	= pointer.worldY - (pointer.worldY % game.tilemap.tileHeight);  
 
	var tileX 		= pointer.worldX / game.tilemap.tileWidth;
	var tileY 		= pointer.worldY / game.tilemap.tileHeight;

	game_map_spawn("inventory-" + game.player.currentItem.id, tileworldX , tileworldY);
};