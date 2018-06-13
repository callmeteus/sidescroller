// Game button click
$(document).on("vclick", ".game-button", function(e) {
	e.preventDefault();

	switch($(this).attr("id").replace("game-button-", "")) {
		// Next stage button
		case "next":
			// Increase current stage
			Sidescroller.Stages.current++;

		// Start and next stage button
		case "start":
		case "next":
			// Hide all open modals and go to game start scene
			game_modal_hideAll(() => Sidescroller.Scenes.start());
		break;

		// Menu button
		case "menu":
			// Hide all open modals and go to menu scene
			game_modal_hideAll(() => Sidescroller.Scenes.menu());
		break;

		// Logout
		case "logout":
			$(".btn").addClass("disabled");
			$(":input").prop("disabled", true);

			$.post("/api/user/logout", () => location.reload());
		break;
	}
});