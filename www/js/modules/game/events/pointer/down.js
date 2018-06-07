Sidescroller.addEventListener("POINTER_DOWN", function(pointer) {
	var tileworldX 	= pointer.worldX - (pointer.worldX % Sidescroller.Game.tilemap.tileWidth);    
	var tileworldY 	= pointer.worldY - (pointer.worldY % Sidescroller.Game.tilemap.tileHeight);  
 
	var tileX 		= pointer.worldX / Sidescroller.Game.tilemap.tileWidth;
	var tileY 		= pointer.worldY / Sidescroller.Game.tilemap.tileHeight;

	Sidescroller.Stages.spawn("inventory-" + Sidescroller.Game.player.currentItem.id, tileworldX , tileworldY);
});