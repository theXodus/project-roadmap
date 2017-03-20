var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');

// Connect to database
var database = require('./config/database');
mongoose.connect(database.url);

require('./config/passport');
app.use(passport.initialize());
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

require('./app/routes')(app);

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

app.listen(3000, function () {
  console.log('project-roadmap listening on port 3000!');
})
