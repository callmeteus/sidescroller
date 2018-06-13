(function() {
	var $dragging 	= null;

	$(document).on("vclick", "#game-menu #game-items-active .game-item", function(e) {
		var $image 	= $(this).find(".game-item-image");
		var id 		= $image.attr("data-id");

		$(this).removeAttr("data-original-title").removeAttr("title");
		$(this).removeClass("animated");

		Sidescroller.Player.items[$(this).attr("data-key")] 	= null;

		// Remove image
		$image
			.removeClass("animated fadeIn")
			.addClass("animated zoomOut")
			.one(animationEnd, function() {
				$(this).remove();
			});

		$("#game-menu #game-items .game-item[data-id=" + id + "]").parent(".game-item").removeClass("disabled");

		$(".tooltip").tooltip("dispose");
	});

	$(document).on("dragover", "#game-menu #game-items-active .game-item", function(e) {
		e.preventDefault();
		$(this).addClass("border-success");
	});

	$(document).on("dragleave", "#game-menu #game-items-active .game-item", function() {
		$(this).removeClass("border-success");
	});

	$(document).on("dragstart", "#game-menu #game-items .game-item", function(e) {
		$(".tooltip").tooltip("dispose");
		$dragging 	= $(this);
	});

	$(document).on("drop", "#game-menu #game-items-active .game-item", function(e) {
		e.preventDefault();

		var $el 	= $dragging.clone();

		$el.attr("data-key", $(this).attr("data-key"));
		$el.removeClass("wow zoomIn").addClass("animated tada");
		$el.removeAttr("draggable").removeAttr("style");
		$el.insertBefore($(this));
		$el.find(".game-item-image").addClass("animated fadeIn");

		Sidescroller.Player.items[$(this).attr("data-key")] 	= parseInt($el.attr("data-id"));

		$(this).remove();
		$dragging.addClass("disabled");
	});
})();