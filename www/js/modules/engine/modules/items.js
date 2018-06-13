Sidescroller.Items.list 		= [];

Sidescroller.Items.add 			= function(item) {
	var itemId 					= Sidescroller.Items.list.length;
	var id 						= Sidescroller.Items.list.push(Object.assign(
		{ 
			id: 	itemId, 
			key: 	"inventory-" + itemId,
			events: {}
		},

		item
	));

	return Sidescroller.Items.get(id - 1);
};

Sidescroller.Items.get 			= (item) => Sidescroller.Items.list[item];