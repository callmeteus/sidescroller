$(function() {
	app_loader_set("authentication screen", 98);

	// Check if is already logged in
	if (!app_config.game_logged_in)
		app_mustache_load("user/auth", $container, null, false, function() {
			app_loader_hide();

			$container.find("#game-user-auth").modal("show");
		});
	else
		Sidescroller.Player.getData(() => Sidescroller.Init());
});

$(document).on("submit", "#game-user-auth form", function(e) {
	e.preventDefault();

	var $form 		= $(this);

	var data 		= {
		email: 		$form.find("input[name='user-email']").val(),
		password: 	btoa($form.find("input[name='user-password']").val())
	};

	$form.find(":input").prop("disabled", true);
	$form.find(".form-control-plaintext").text("Authenticating...");

	$.ajax({
		method: 	"POST",
		url: 		"/api/user/login:local", 
		data: 		data
	}).done(function(data, statusText, xhr) {
		Sidescroller.Player.setData(data);
		Sidescroller.Init();
	}).fail(function(data) {
		$form.find(".form-control-plaintext").text("Authentication failed.");
		$form.find(":input").prop("disabled", false);
	});
});