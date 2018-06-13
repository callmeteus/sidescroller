(function() {
	Sidescroller.Player.isLoggedIn 		= {{game_player_loggedIn}};
	Sidescroller.Player.sprite 			= null;
	Sidescroller.Player.items 			= {
		Q: null,
		E: null,
		W: null,
		R: null
	};

	Sidescroller.Player.currentItem 	= null;

	Sidescroller.Player.getData 		= function(callback) {
		$.get("/api/user/data", function(data) {
			Sidescroller.Player.setData(data);

			if (typeof callback !== "undefined")
				callback(data);
		});
	};

	Sidescroller.Player.setData 		= function(data) {
		for(var index in data)
			this[index] 	= data[index];
	};

	Sidescroller.Player.setCurrentItem 	= function(itemId) {
		if (itemId === "-1")
			return;

		this.currentItem 				= parseInt(itemId);

		var x 							= Sidescroller.Game.cursorMarker.x;
		var y 							= Sidescroller.Game.cursorMarker.y;

		Sidescroller.Game.cursorMarker.kill();
		Sidescroller.Game.cursorMarker 	= new SidescrollerMarker(Sidescroller.Items.get(itemId).key, x, y);
	};
})();