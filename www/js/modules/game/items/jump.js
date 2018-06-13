(function() {
	var item 					= Sidescroller.Items.add({
		name: 						"Jump",
		description: 				"A block that when touched, will make you jump.",
		image: 						"img/items/jump.png"
	});

	item.events.collide 		= function(s1, s2) {
		s1.body.velocity.y 		= -1000;

		var i = setInterval(function() {
			s1.body.velocity.y--;

			if (s1.body.velocity.y <= 0)
				return clearInterval(i);
		}, 1);
	};
})();