var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

var API_Router = require('./api/api-router');
// var loginRouter = require('./routes/login');

var app = express();

const mongoose = require('mongoose'),
DB_URL = 'mongodb://localhost:27017/takeOut';
mongoose.connect(DB_URL);
mongoose.connection.on('connected', () => {
    console.log('连接到mongoDB端口：' + DB_URL);
});
mongoose.connection.on('error',function (err) {    
    console.log('mongoDB连接错误：' + err);  
});

var redis = require('redis'); 
var client = redis.createClient({ "host": "127.0.0.1", "port": "6379" });
client.on('error', function (err) { console.log('redis错误 - ' + client.host + ':' + client.port + ' - ' + err);});

app.set('port', process.env.PORT || 2333);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', API_Router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send('error');
});

app.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost:' +
  app.get('port') + '; press Ctrl-C to terminate.' );
  });
