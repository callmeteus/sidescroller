var Scene 	= Scene || {};

Scene.menu 	= function() {
	for(var mapId in game_stage_list) {
		var map 	= game_stage_list[mapId];

		var $map 	= $("<div/>").appendTo("#game-stage-selector .modal-body");

		$map.addClass("game-map col-12 mb-1");
		$map.css("background-image", "url(" + map.image + ")");

		$map.append("<h3 class='game-map-title'>" + map.name + "</h3>");

		$map.data("id", mapId);
	}
};