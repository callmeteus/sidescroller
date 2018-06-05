$(document).on("click", "#game-button-start", function(e) {
	e.preventDefault();
	Scene.start();

	$(".modal").modal("hide");
});

$(document).on("click", "#game-button-menu", function(e) {
	e.preventDefault();

	$(".modal").modal("hide");
	$("#game-menu").modal("show");
});

$(document).on("click", "#game-menu #game-button-stage-selector", function(e) {
	e.preventDefault();

	$("#game-stage-selector").modal("show");
	$("#game-menu").modal("hide");
});

$(document).on("click touchstart", "#game-stage-selector .game-map", function() {
	$(".game-map.active").removeClass("active");
	$(this).addClass("active");

	game_current_stage 	= $(this).data("id");

	$("#game-stage-selector #game-button-start").prop("disabled", false);
});