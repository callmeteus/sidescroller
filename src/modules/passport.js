var localAuth 			= require("../functions/user-auth");
var localStrategy 		= require("passport-local").Strategy;

exports.start 	= function(callback) {
	passport.use(new localStrategy({
		usernameField: 		"email",
		usernamePassword: 	"password"
	}, localAuth.login));

	passport.serializeUser(function(user, cb) {
		cb(null, user.id);
	});

	passport.deserializeUser(function(id, cb) {
		User.findById(id, function(err, user) {
			if (err)
				return log.error(err, log.type.server);

			cb(err, user);
		});
	});

	callback();
};