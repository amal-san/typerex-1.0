// const cors = require('cors');
// var bodyParser = require('body-parser');
// var express = require("express");
// var app = express();
// app.use(cors());
// app.options('*', cors());
// app.use(bodyParser.urlencoded({extended:false}));
// app.use(bodyParser.json());
var dbutils = require("./utils/dbutils");


// // set the port of our application
// // process.env.PORT lets the port be set by Heroku
// var port = process.env.PORT || 8080;

// // set the view engine to ejs
// app.set("view engine", "ejs");

// // make express look in the public directory for assets (css/js/img)
// app.use(express.static(__dirname + "/public"));

// // set the home page route
// app.get("/", function(req, res) {
// 	// ejs render automatically looks in the views folder
// 	res.render("index", { description: "Urls are here:" });
// });

// app.post("/test", function(req, res) {
// 	res.send("POST REQUEST TO SERVER");
// });

// app.get("/test", function(req, res) {
// 	res.send("GET REQUEST TO SERVER");
// });

// app.get("/dbList", function(req, res) {
// 	dbutils
// 		.db("listDatabases")
// 		.then((data) => res.json(data))
// 		.catch((e) => console.log(e));
// });

// app.post("/addUser", function(req, res) {
	
// 	var fullUrl = req.originalUrl.slice(1, -1);
// 	dbutils
// 		.db(fullUrl,req.body.input)
// 		.then(function(data) {
// 			res.json(data);
// 		})
// 		.catch((e) => res.send("db_not_working"));
// });

// app.post("/updateUser", function(req, res) {
// 	var fullUrl = req.originalUrl.slice(1, -1);
// 	dbutils
// 		.db(fullUrl, req.body.input,req.body.wpm)
// 		.then(function(data) {
// 			res.json(data);
// 		})
// 		.catch((e) => res.send("db_not_working"));
// });

// app.post("/infoUser", function(req, res) {
// 	var fullUrl = req.originalUrl.slice(1, -1);
// 	dbutils
// 		.db(fullUrl, req.body.username)
// 		.then(function(data) {
// 			res.json(data);
// 		})
// 		.catch((e) => res.send("db_not_working"));
// });

// app.listen(port, function() {
// 	console.log("Our app is running on http://localhost:" + port);
// });


const { GraphQLServer } = require('graphql-yoga')

// 1


const typeDefs = `

type Mutation {
	userAdd(username:String!): UserType!
	userUpdate(username:String! wpm:String!): UserType!
	userDelete(username:String!): UserType!

}

type UserType {
	_id:String!
	username:String!
	wpm:String
  info:String
}

type Query {
  info: String!
  Users: [UserType]!
  userInfo(username:String!):UserType
}

`

// 2
const resolvers = {

  Query: {

      info: () => `This is Typerex GraphQLServer`,
      Users: async () => (
        await dbutils.db('listUsers')
        .then(data => {
          return data;
        })
        .catch(e => console.log('404 on list of users'))
      ),
      userInfo: async(parent,args) => (
      	await dbutils.db('infoUser',args.username)
  		.then(data => {
  			return data;
  		})
  		.catch(e => console.log('404 on user info')))

  },

  Mutation: {

  	  userAdd: async (parent, args) => (
        await dbutils.db('addUser',args.username)
        .then(data => {
          return data;
        })
        .catch(e => console.log('404 on adding new user'))
      ),

      userUpdate: async (parent,args) => (
        await dbutils.db('updateUser',args.username,args.wpm)
        .then(data => {
          return data;
        })
        .catch(e => console.log('404 on updating user'))
      ),

      userDelete: async(parent,args) => (
      await dbutils.db('deleteUser',args.username)
        .then(data => {
          return data;
        })
        .catch(e => console.log('404 on deleting user'))
      )

      

  

 



  }

}

// 3
const server = new GraphQLServer({
  typeDefs,
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))