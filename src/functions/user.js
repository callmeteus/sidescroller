global.User 		= {};

User.findById 		= function(id, callback) {
	pool.query("SELECT *, NULL AS userpassword FROM app_user WHERE userid = ? LIMIT 1", id, function(err, data) {
		if (err)
			return callback(err);

		app_object_removePrefix(data[0], "user");

		delete(data[0].password);

		callback(null, data[0]);
	});
};

User.getStages 		= function(id, callback) {
	// TODO: improve this query
	pool.query(`
		SELECT 
			su.stagewin, 
			su.stagetime,
			s.stageid,
			s.stagename, 
			s.stageimage
		FROM app_stages s 
		LEFT JOIN
			app_user_stages su 
		ON
			s.stageid = su.stageid AND
			su.stageuser = :user
		HAVING
			s.stageid <= (SELECT MAX(stageid) + 1 FROM app_user_stages WHERE stageuser = :user)
	`, { user: id }, function(err, data) {
		if (err)
			return callback(err);

		app_object_removePrefix(data, "stage");

		callback(null, data);
	});
};

User.getStage 		= function(id, user, callback) {
	pool.query(`
		SELECT 
			s.stagefile, 
			s.stageid,
			su.stageuid
		FROM app_stages s 
		LEFT JOIN
			app_user_stages su 
		ON
			s.stageid = su.stageid
		WHERE
			IF(ISNULL(su.stageid), 1, (su.stageid = ? AND su.stageuser = ?))
		LIMIT 1
	`, [id, user], function(err, data) {
		if (err)
			return callback(err);

		if (id !== data[0].stageid)
			return callback("Invalid map");

		callback(null, data[0].stagefile);
	});
};

User.createStage 	= function(id, user, callback) {
	pool.query("INSERT INTO app_user_stages SET ?", { stageid: id, stageuser: user }, callback);
};

User.updateStage 	= function(uid,  user, data, callback) {
	data.stageuid 	= uid;
	data.stageuser 	= user;
	data.stagenext 	= data.stageid + 1;

	pool.query(`
		UPDATE app_user_stages SET
			stagewin 	= IF(stagewin = 1, true, :stagewin),
			stagescore 	= IF(stagescore < :stagescore, :stagescore, stagescore),
			stagetime 	= IF(stagetime < :stagetime, :stagescore, stagetime)
		WHERE stageuid 	= :stageuid`, data, function(err) {
		if (err)
			return callback(err);

		if (data.stagewin)
			pool.query(`
				SELECT 
					s.stageid AS next,
					su.stageuid AS done
				FROM app_stages s
				LEFT JOIN
					app_user_stages su 
				ON
					s.stageid = su.stageid
				WHERE
					s.stageid >= ?
				LIMIT 1
				`, data.stagenext, function(err, currentData) {
				if (err)
					return callback(err);

				if (!currentData.length)
					return callback(null, { next: false });
				
				currentData 	= currentData[0];
				callback(err, currentData);

				if (!currentData.done)
					User.createStage(data.stagenext, user);
			});
		else
			callback(null, { next: false });
	});
};

User.putStage 		= function(id, user, data, callback) {
	app_object_addPrefix(data, "stage");

	data.stageid 	= id;
	data.stagewin 	= (data.stagewin === "true");
	data.stageuser 	= user;

	pool.query("SELECT stageuid FROM app_user_stages WHERE stageid = ? AND stageuser = ?", [id, user], function(err, result) {
		if (err)
			return callback(err);

		result 	= result[0];

		if (typeof result === "undefined")
			return User.createStage(1, user, (err, result) => User.updateStage(result.insertId, user, result));
		else
			User.updateStage(result.stageuid, user, data, callback);
	});
};