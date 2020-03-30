module.exports = {

  test: function () {
     return 1
  },


  // Method for retrieving the list of databases
  listDatabases: async function (client){

  	databasesList = await client.db().admin().listDatabases();
	return databasesList.databases
    
   },
   
   // Username check Method
   checkUsername: async function (client,username) {

	  result = await client.db(dbName).collection(collectionName).findOne({ usename: username });
	    if (result) {

	        console.log(result);
	        return result

	    } else {
	      return false
	    }
	},


	// Inserting new user method
	userInsert: async function (client,username,password) {

	  await client.db(dbName).collection(collectionName).insertOne({ username: username ,wpm : null ,password: password})

	  console.log('Account created with username %s', username)

	},

	// Main function
    db: async function (params) {

  	console.log(this.test())

    const dbName = 'typerex';
	const collectionName = 'users'
	const MongoClient = require('mongodb').MongoClient;

	const username = 'amalsan'
	const password = 'Amal@123'
    

    const uri = "mongodb+srv://amalsan:pass@clustor0-a3uoq.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true});

     try {
	        // Connect to the MongoDB cluster
	        await client.connect();
	 
	        // Make the appropriate DB calls
	        var method = params
	        const data = await this[method](client);     	
	        return data;

	        


	 
	    } catch (e) {
	        console.error(e);
	    } finally {
	        await client.close();
	        

	    }


   },


};