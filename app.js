/**
 * Created by neox on 3/18/16.
 */

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// configure app

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// use middleware

app.use(logger('dev'));
app.use(cookieParser());

app.use('/bootstrap', express.static(
  path.join(__dirname, '/bower_components/bootstrap/dist')));

app.use('/jquery', express.static(
  path.join(__dirname, '/bower_components/jquery/dist')));

app.use('/layout', express.static(
  path.join(__dirname, '/portpolio/test')));

app.use('/portpolio', express.static(
  path.join(__dirname, '/portpolio')));

app.use('/web', express.static(
  path.join(__dirname, '/web')));

app.use('/img', express.static(
  path.join(__dirname, '/resources/img')));

//app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// define routes

app.use('/', require('./router/todos'));
app.use('/stock', require('./router/stock'));
app.use('/api', require('./router/api'));

// error handling

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

// start the server

var port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log('start server at ' + 'http://localhost:' + port + '/web/stock');
});