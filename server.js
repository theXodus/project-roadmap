var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Connect to database
var database = require('./config/database');
mongoose.connect(database.url);

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

require('./app/routes')(app);

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})
