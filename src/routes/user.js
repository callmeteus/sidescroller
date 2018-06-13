var auth = require("../functions/user-auth");

function app_user_auth_success(req, res) {
	return res.json(req.user).status(200).end();
}

app.post("/api/user/register:local", auth.register);

app.post("/api/user/login:local", passport.authenticate("local"), app_user_auth_success);
app.all("/api/user/logout", function(req, res) {
	req.logout();
	res.end();
});

app.get("/api/user/data", app_route_loggedIn, function(req, res) {
	res.json(req.user).end();
});