require("./user");

var bcrypt 				= require("bcrypt");

var app_user_login 		= function(email, password, done) {
	password 			= atob(password);

	if (!email.length || !password.length)
		return done(null, false, { message: "BLANK_FIELDS" });

	// Convert user password to bCrypt
	bcrypt.hash(password, app_salt_rounds, function(err, hash) {
		if (err)
			return log.error(err, log.type.server);

		// Query database for userlogin and userpassword written in the form
		pool.query("SELECT * FROM app_user WHERE useremail = ? LIMIT 1", [email], function(err, data) {
			// Check if any errors
			if (err)
				throw err;

			// Check if any data is retrieved
			if (typeof data === "undefined" || !data.length)
				return done(null, false, { message: "INVALID_EMAIL" });

			bcrypt.compare(password, data[0].userpassword, function(err, sucess) {
				if (err)
					return log.error(err, log.type.server);

				if (!sucess)
					done(null, false, { message: "INVALID_PASSWORD" });
				else {
					delete(data[0].userpassword);

					app_object_removePrefix(data[0], "user");

					done(null, data[0]);
				}
			});
		});
	});
};

var app_user_register 	= function(req, res) {
	// Check if data have all the fields
	if (app_object_hasNullValues.call(data) || !app_object_hasKeys.call(data, ["user-name", "user-email", "user-password"]))
		return res.sendData(app_http_response_error("BLANK_FIELDS"));

	// Check if it is a valid email
	if (!data["user-email"].isValidEmail())
		return res.sendData(app_http_response_error("INVALID_EMAIL"));

	// Sanitize string
	for(var prop in data)
		data[prop] 	= data[prop].htmlEntities();

	// Remove whitespaces from username
	data["user-name"] 	= data["user-name"].removeWhitespaces();

	pool.query("SELECT username, useremail FROM app_user WHERE useremail = ? OR username = ?", [data["user-email"], data["user-name"]], function(err, dbData) {
		if (err)
			return log.error(err, log.type.server);

		if (dbData.length)
			if (dbData[0].username == data["user-name"])
				return res.sendData(app_http_response_error("NAME_INUSE"));
			else
				return res.sendData(app_http_response_error("EMAIL_INUSE"));

		var iData 	= {
			username: 		data["user-name"],
			useremail: 		data["user-email"],
			userpassword: 	atob(data["user-password"])
		};

		bcrypt.hash(iData.userpassword, app_salt_rounds, function(err, hash) {
			iData.userpassword 	= hash;

			pool.query("INSERT INTO app_user SET ?", iData, function(err, result) {
				if (err)
					return log.error(err, log.type.server);

				var userid 	= result.insertId;

				pool.query("INSERT INTO app_user_data SET userid = ?", userid, function(err, result) {
					if (err)
						throw err;

					res.sendData(app_http_response(true, { id: userid }));
				});
			});
		});
	});
};

exports.login 		= app_user_login;
exports.register 	= app_user_register;