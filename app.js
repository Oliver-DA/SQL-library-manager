var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Added modules//
const { sequelize } = require("./models")
const { pageNotFoundError, globalError } = require("./errorHandlers");
//////

var indexRouter = require('./routes');
var booksRouter = require('./routes/books');

var app = express();

//synchronizing all the database models
(async() => {
  try {
    await sequelize.sync()

  } catch (error) {
    console.log("The connection failed",error)
  }

})();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/public",express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/books', booksRouter);

// 404 Page not found error handler
app.use(pageNotFoundError);

// Global error handler
app.use(globalError);

module.exports = app;
