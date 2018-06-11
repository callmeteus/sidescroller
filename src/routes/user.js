require("../functions/user-auth");

function app_user_auth_success(req, res) {
	return res.json(req.user).status(200).end();
}

app.post("/api/user/login:local", passport.authenticate("local"), app_user_auth_success);
app.all("/api/user/logout", function(req, res) {
	req.logout();
	res.end();
});