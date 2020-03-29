module.exports = {
  test: function () {
    return 1
  },
  db: async function () {


    async function listDatabases(client){

	    databasesList = await client.db().admin().listDatabases();
	    return databasesList.databases[0].name
    
    };

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

	        const data = await listDatabases(client)
	        console.log(' inside main function : ' ,data)
	        return data

	        


	 
	    } catch (e) {
	        console.error(e);
	    } finally {
	        await client.close();
	        

	    }


   },


};