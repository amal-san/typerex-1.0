

const dbName = 'typerex';
const collectionName = 'users'
const MongoClient = require('mongodb').MongoClient;

const username = 'amalsan'
const password = 'Amal@123'

async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = "mongodb+srv://amalsan:pass@clustor0-a3uoq.mongodb.net/test?retryWrites=true&w=majority";
 

    const client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true});
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        // await  listDatabases(client);
        if (await CheckUsername(client,username)){

          await InsertUser(client,username,password)
        }
        else {
          await listDatabases(client)
          console.log('username already taken!!')
        }

 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);


async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    console.log(databasesList.databases[0].name)
    return databasesList
};


async function CheckUsername(client,username) {
  
  result = await client.db(dbName).collection(collectionName).findOne({ usename: username });
 
    if (result) {
        console.log(result);
        return result

    } else {
      return false
    }
}

async function InsertUser(client,username,password) {

  await client.db(dbName).collection(collectionName).insertOne({ username: username ,wpm : null ,password: password})

  console.log('Account created with username %s', username)

}


async function CheckUser(client,username) {
  
  result = await client.db(dbName).collection(collectionName).findOne({ usename: username ,password: password});
 
    if (result) {
        console.log(result);
        return result

    } else {
      return false
    }
}

var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    list: String ,
    hai: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  list: () => {
    return databasesList.databases[0].name
  },
  hai: () => {
    return "Hai woasdf";
  },
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
