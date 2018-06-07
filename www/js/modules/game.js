var Sidescroller 				= {
	Game: 						null,
	Events: 					function Sidescroller_Events(){},
	Player: 					function Sidescroller_Player(){},
	Stages: 					function Sidescroller_Stages(){},
	Items: 						function Sidescroller_Items(){},
	Scenes: 					function Sidescroller_Scenes(){},
	Timer: 						function Sidescroller_Timer(){}
};

Sidescroller.addEventListener 	= function(event, callback) {
	this.Events[event] 			= callback;
};

Sidescroller.Items.list 		= [];
Sidescroller.Items.add 			= (item) => Sidescroller.Items.list.push(Object.assign(item, { id: Sidescroller.Items.list.length }));
Sidescroller.Items.get 			= (item) => Sidescroller.Items.list[item];