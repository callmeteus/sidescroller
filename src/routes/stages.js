// game stage list
app.get("/api/user/stages", app_route_loggedIn, function(req, res) {
	res.setHeader("Content-Type", "application/json; charset=UTF-8");
	User.getStages(req.user.id, (err, stages) => (err) ? log.error(err, log.type.server) : res.json(stages).end());
});

// game stage data
app.get("/api/user/stage/:id", app_route_loggedIn, function(req, res) {
	var id 		= parseInt(req.params.id);

	if (isNaN(id))
		return res.status(404).end();

	User.getStage(id, req.user.id, function(err, data) {
		if (err)
			return log.error(err, log.type.server);

		if (typeof data === "undefined")
			return res.status(404).end();

		data 				= require(path.join("../../maps", data));

		res.setHeader("Content-Type", "application/json; charset=UTF-8");
		res.json(data).end();
	});
});

app.post("/api/user/stage/:id", app_route_loggedIn, function(req, res) {
	var id 		= parseInt(req.params.id);

	if (isNaN(id))
		return res.status(404).end("Invalid stage");

	User.putStage(id, req.user.id, req.body, function(err, data) {
		if (err)
			return log.error(err, log.type.server);

		if (typeof data === "undefined")
			return res.status(404).end("Stage not found");

		res.json(data).end();
	});
});