Sidescroller.Items.list 		= [];
Sidescroller.Items.add 			= (item) => Sidescroller.Items.list.push(Object.assign(item, { id: Sidescroller.Items.list.length }));
Sidescroller.Items.get 			= (item) => Sidescroller.Items.list[item];