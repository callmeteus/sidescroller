(function() {
	var scroll  	= 0;
	var duration 	= 80;
	var $parallax 	= [];
	var $background = $("<div class='background'/>").appendTo(document.body);

	$parallax.push($("<div class='hills-1' data-depth='0.10'/>"));
	$parallax.push($("<div class='clouds' data-depth='0.075'/>"));
	$parallax.push($("<div class='mountain left' data-depth='0.20'/>"));
	$parallax.push($("<div class='mountain right' data-depth='0.20'/>"));
	$parallax.push($("<div class='hills-2' data-depth='0.30'/>"));

	for(var parallax in $parallax)
		$parallax[parallax].addClass("parallax").appendTo($background);

	$background.append("<div class='bottom'/>");

	(function game_background() {
		scroll+=0.3;

		for(var parallax in $parallax) {
			var $layer  = $parallax[parallax];
			var amount  = (scroll * $layer.attr("data-depth"));

			if ((amount / 100) >= 1)
				amount 	= (amount / 100) * 100;

			amount 		= amount;

			if ($layer.hasClass("mountain"))
				$layer.transition({x: amount * 1.5}, 1, "linear")
			else
				$layer.animate({
					backgroundPositionX: 	amount + "%",
					backgroundPositionY: 	$layer.css("backgroundPositionY")
				}, 1);
		}

		window.requestAnimationFrame(game_background);
	})();
})();