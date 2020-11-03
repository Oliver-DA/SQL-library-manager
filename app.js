var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var { sequelize } = require("./models")



var indexRouter = require('./routes/index');
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

// catch 404 and forward to error handler
app.use( function(req, res) {

  const error = new Error()
  error.message = "Sorry seems that this is not the book you are looking for :("
  error.status = 404;
  res.render("page-not-found", { error })

});

// error handler
app.use(function(error, req, res, next) {
  // set locals, only providing error in development
  error.message = error.message || "Something went wrong with the server"

  // render the error page
  error.status = error.status || 500;

  res.render('error', { error });
});

module.exports = app;
