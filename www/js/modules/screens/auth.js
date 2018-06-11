$(function() {
	app_loader_set("authentication screen", 98);
	app_mustache_load("user/auth", $container, null, false, function() {
		app_loader_hide();

		$container.find("#game-user-auth").modal("show");
	});
});

$(document).on("submit", "#game-user-auth form", function(e) {
	e.preventDefault();

	var $form 		= $(this);

	var data 		= {
		email: 		$form.find("input[name='user-email']").val(),
		password: 	btoa($form.find("input[name='user-password']").val())
	};

	$form.find(":input").prop("disabled", true);

	$.ajax({
		method: 	"POST",
		url: 		"/api/user/login:local", 
		data: 		data
	}).done(function(data, statusText, xhr) {
		Sidescroller.Player.Data 	= data;
		Sidescroller.Init();
	}).fail(function(data) {
		console.log(data);
	}).always(function() {
		$form.find(":input").prop("disabled", false);
	});
});