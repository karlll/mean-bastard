// express.js
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var debug = require('debug')('server');


var app = express();


// read configuration
var serverConfig = require("./config/server_config.json");
var dbConfig = require("./config/db_config.json");
var clientConfig = require("./config/client_config.json");



// setup model
var Db = require('./server/model/db');
var db = new Db(dbConfig);

db.init(function callback(err) {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  debug("Inited");

  var TestModel = db.getModel("TestModel");
  var m = new TestModel({
    name: "Foobar"
  });

  m.save();


});


app.set('views', path.join(__dirname, serverConfig.view_dir));
app.set('view engine', serverConfig.view_engine);
app.use(express.static(path.join(__dirname, serverConfig.client_dir)));


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());


// routes

app.use('/', require('./server/routes/main'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var close = function() {
  console.log("Shutting down ...");
  db.close();
};

process.on('SIGINT', function() {
  close();
});

process.on('SIGTERM', function() {
  close();
});


module.exports = app;
