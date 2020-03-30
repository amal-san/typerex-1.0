var express = require('express');
var app = express();
var dbutils = require('./utils/dbutils');


// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// set the home page route
app.get('/', function(req, res) {

	// ejs render automatically looks in the views folder
	res.render('index',{description:'Urls are here:'});

});

app.get('/test', function(req, res) {

    res.send('Amal Santhosh');

});

app.get('/db', function(req, res) {

    // res.send(dbutils.test().toString());
    // dbutils.db().then(data => console.log(data))
    dbutils.db('listDatabases').then(data => res.json(data))  

});



app.listen(port, function() {
	console.log('Our app is running on http://localhost:' + port);
});