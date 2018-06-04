$(document).on("click", "#game-button-start", function(e) {
	e.preventDefault();
	game_render();

	$(".modal").modal("hide");
});