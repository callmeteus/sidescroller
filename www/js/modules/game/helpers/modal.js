function game_modal_hideAll(callback) {
	// Get all open modals
	var $modals 	= $(".modal.show:visible");
	var $cards 		= $(".card-modal:visible");

	// Add handler to completly hidden event
	$modals.one("hidden.bs.modal", function() {
		if (typeof callback === "function")
			callback();
	});

	// Call hide
	$modals.modal("hide");

	// Call cards hide
	$cards.fadeOut(500, () => (typeof callback === "function") && callback());
}