$(document).on("click", "#game-inventory .game-item", function(e) {
	e.preventDefault();

	if (!Sidescroller.Game._playing)
		return;

	Sidescroller.Player.setCurrentItem($(this).attr("data-id"));
});