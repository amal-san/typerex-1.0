module.exports = {
	test: function() {
		return 1;
	},

	// Method for retrieving the list of databases
	listDatabases: async function(client) {
		databasesList = await client
			.db()
			.admin()
			.listDatabases();
		return databasesList.databases;
	},

	// Username check Method
	addUser: async function(dbName, collectionName, client, username) {
		//checks whether username is not added and wpm null
		result = await client
			.db(dbName)
			.collection(collectionName)
			.findOne({ username: username });

		newuser = await client
				.db(dbName)
				.collection(collectionName)
				.findOne({ username: username, wpm: { $ne: null } });

		// if result exist and not null
		if (result) {
			console.log("Add user function true: ", result);
			
			console.log(newuser)
			// A user with not null wpm can't create account
			if (newuser) {
				console.log('login')
				return "login"

			} else {

				return "username_taken"
			}
		} else {
			console.log("Add user function false: ", result);
			return this.userInsert(dbName, collectionName, client, username);
		}
	},

	// Inserting new user method
	userInsert: async function(dbName, collectionName, client, username) {
		result = await client
			.db(dbName)
			.collection(collectionName)
			.insertOne({ username: username, wpm: null });
		if (result) {
			console.log("Account created with username %s", username);
			return "user_created";
		} else {
			console.log(result);
			return "username_taken";
		}
	},

	updateUser: async function(dbName, collectionName, client, username, wpm) {
		result = await client
			.db(dbName)
			.collection(collectionName)
			.updateOne(
				{ username: username },
				{ $set: { wpm: 30 } },
				{ upsert: true }
			);
		if (result) {
			console.log("Updated Wpm with username %s", username);
			return "user_updated";
		} else {
			console.log(result);
			return "user_not_update";
		}
	},

	// Main function
	db: async function(params, username, wpm) {
		const dbName = "typerex";
		const collectionName = "users";
		const MongoClient = require("mongodb").MongoClient;

		const uri =
			"mongodb+srv://amalsan:pass@clustor0-a3uoq.mongodb.net/test?retryWrites=true&w=majority";
		const client = new MongoClient(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		try {
			// Connect to the MongoDB cluster
			await client.connect();

			// Make the appropriate DB calls
			var method = params;
			const data = await this[method](
				dbName,
				collectionName,
				client,
				username,
				wpm
			);
			return data;
		} catch (e) {
			console.error(e);
		} finally {
			await client.close();
		}
	},
};