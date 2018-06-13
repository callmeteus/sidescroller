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

var strings 	= {
	BLANK_FIELD: 	"fill all the fields.",
	EMAIL_IN_USE: 	"email address in use."
};

$(document).on("submit", "#game-user-register form", function(e) {
	e.preventDefault();

	var $form 				= $(this);
	var data 				= $form.serializeObject();

	data["user-password"] 	= btoa(data["user-password"]);

	// Disable all input elements in the email form
	$(this).find(":input").prop("disabled", true);

	$form.find(".form-control-plaintext").text("Registering...");

	$.ajax({
		method: 	"POST",
		url: 		"/api/user/register:local", 
		data: 		data
	}).done(function() {
		$("#game-user-register").modal("hide");

		$("#game-user-auth input[name=user-email]").val(data["user-email"]);
		$("#game-user-auth input[name=user-password]").val(data["user-password"]);

		$("#game-user-auth form").submit();
	}).fail(function(data, a, b) {
		console.log(data);
		$form.find(".form-control-plaintext").html("<span class='text-warning'>Registration failed: " + strings[data.responseText] + "</span>");
		$form.find(":input").prop("disabled", false);
	});
});