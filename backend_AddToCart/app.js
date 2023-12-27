var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var config = require("config");


var app = express();
var indexRouter = require('./routes/index');   //for main page to show
var usersRouter = require('./routes/api/users');
var logInRouter = require('./routes/api/login');
var productsRouter = require('./routes/api/products');
var cors =require("cors");

// handle issues of getting req from another port from frontend
app.use(cors());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/uploads/:filename', (req, res) => {
  const filename = req.params.filename;
  console.log('filename', filename)
  const filePath = path.join(__dirname, 'uploads', filename);
  console.log('filePath', filePath)
  res.sendFile(filePath);
});

// app.use('/', indexRouter);
app.use('/api/users', usersRouter);  //this will add that route before every route come from userRoutes
app.use('/api/login', logInRouter);
app.use('/api/products', productsRouter); 

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
  res.render('error');
});




mongoose.connect(config.get('db'))
.then(() => {
  console.log("connect mongoDB....");
})
.catch((err) => {
  console.log(err.message);
});


module.exports = app;
