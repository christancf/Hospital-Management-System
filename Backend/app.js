var createError = require('http-errors');
var express = require('express');
var dotenv = require("dotenv");
var db = require("./configs/database");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var wardRouter = require('./routes/ward');
var channellingRouter = require('./routes/channelling');
var bloodbankRouter = require('./routes/bloodbank');


dotenv.config();
db.connect();


var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/ward', wardRouter);
app.use('/channelling', channellingRouter);
app.uee('bloodbank',bloodbankRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({succuss: false, message: 'Endpoint not found'});
});

module.exports = app;
