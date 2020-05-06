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


	listUsers: async function(dbName,collectionName,client){
		result = await client.db(dbName).collection(collectionName).find().toArray();



		if(result){
			console.log("Returning results")
			return result
		}
		else {
			return {info:"can't find the list"}
		}



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
				return result
				// return "login"

			} else {
				return result
				// return "username_taken"
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
			return this.infoUser(dbName,collectionName,client,username);
			// return 'user_created'
		} else {
			console.log(result);
			return "username_taken";
		}
	},

	infoUser: async function(dbName, collectionName, client, username) {
		result = await client
			.db(dbName)
			.collection(collectionName)
			.findOne({ username: username });
		if (result) {
			return result
		} else {
			console.log(result);
			return "no_user";
		}
	},

	updateUser: async function(dbName, collectionName, client, username, wpm) {
		check = await client
			.db(dbName)
			.collection(collectionName)
			.findOne({ username: username });


		if (check) {
		    result = await client
				.db(dbName)
				.collection(collectionName)
				.updateOne(
					{ username: username },
					{ $set: { wpm:wpm } },
					{ upsert: true }
				);
			console.log("Updated Wpm with username %s", username);
			return this.infoUser(dbName,collectionName,client,username);

			// return "user_updated";

		} else {
			return { info:'user_not_found' }
			// console.log(result);
			// return "user_not_update";
		}
	},


	deleteUser: async function(dbName,collectionName,client,username) {
		check = await client
			.db(dbName)
			.collection(collectionName)
			.findOne({ username: username });

		if(check) {
			result = await client
			.db(dbName)
			.collection(collectionName)
			.findOneAndDelete({username:username})
			console.log("Deleted user with username %s ",username)
			return {username:username}
		}
		else {

			return {info:'user not found'}
			// console.log("Can't Delete user")
			// return "user_not_deleted"
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