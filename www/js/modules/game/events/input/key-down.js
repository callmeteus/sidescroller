$(window).on("keydown", function(e) {
	if (!Sidescroller.Game || !Sidescroller.Game._playing)
		return;

	var key 	= String.fromCharCode(e.which).toUpperCase();

	$("#game-inventory .game-item.border-success").removeClass("border-success");
	$("#game-inventory .game-item[data-key=" + key +"]").addClass("border-success").click();
});