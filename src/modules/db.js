function app_mysql_customQuery(connection) {
	var q 				= connection.query;

	connection.query 	= function() {
		var query 		= arguments[0];
		var obj 		= arguments[1];

		// Remove new lines, tabs and trim the query
		query 			= query.replaceAll("\n", " ").replaceAll("\t", "").trim();

		if (typeof obj === "object")
			for(var index in obj)
				(!obj[index].hasOwnProperty()) && (query = query.replaceAll(":" + index, this.escape(obj[index])));

		arguments[0] 	= query;

		q.apply(this, arguments);
	}
};

function app_mysql(callback) {
	if (process.env.ISTRAVIS)
		return callback();

	var mysql 			= require("mysql");

	global.pool  		= mysql.createPool(process.env.JAWSDB_MARIA_URL);

	/* ------------------------------------------------------------------------------- */

	// Custom query function
	app_mysql_customQuery(pool);
	
	log.info("Testing MySQL connection...", log.type.server);

	// Test connection
	pool.getConnection(function(err, conn) {
		if (err)
			throw new Error("Failed to connect to MySQL server:" + err);

		log.info("MySQL successfully connected!", log.type.server);

		callback.call(this);
	});
}

exports.start 	= app_mysql;