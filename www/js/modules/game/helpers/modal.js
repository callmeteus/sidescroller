function game_modal_hideAll(callback) {
	// Get all open modals
	var $modals 	= $(".modal.show");

	// Add handler to completly hidden event
	$modals.one("hidden.bs.modal", function() {
		if (typeof callback === "function")
			callback();
	});

	// Call hide
	$modals.modal("hide");
}