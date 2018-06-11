function app_mysql(callback) {
	if (process.env.ISTRAVIS)
		return callback();

	var mysql 			= require("mysql");

	global.pool  		= mysql.createPool(process.env.JAWSDB_MARIA_URL);

	/* ------------------------------------------------------------------------------- */

	var q 				= pool.query;

	// Custom query function
	pool.query 			= function() {
		var query 		= arguments[0];
		query 			= query.replace(new RegExp("\n", "g"), " ");
		query 			= query.replace(new RegExp("\t", "g"), "");
		query 			= query.trim();

		if (typeof arguments[1] === "object")
			for(var index in arguments[1])
				if (arguments[1][index].hasOwnProperty())
					continue;
				else
					query 	= query.replace(new RegExp(":" + index, "g"), this.escape(arguments[1][index]));

		arguments[0] 	= query;

		q.apply(this, arguments);
	};

	// Test connection
	log.info("Testing MySQL connection...", log.type.server);

	pool.getConnection(function(err, conn) {
		if (err)
			throw new Error("Failed to connect to MySQL server:" + err);

		log.info("MySQL successfully connected!", log.type.server);

		callback.call(this);
	});
}

exports.start 	= app_mysql;