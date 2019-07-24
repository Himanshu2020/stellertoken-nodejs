var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var stellerapi = require('./routes/stellerapi');
var addTrustAPI = require('./routes/addtrust');
var balanceAPI = require('./routes/balance');
var accountAPI = require('./routes/account');
var createAccountAPI = require('./routes/createaccount');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/', indexRouter);
app.use('/createwallet', stellerapi);

//  Add trust line 

app.use('/', indexRouter);
app.use('/addtrust', addTrustAPI);

app.use('/', indexRouter);
app.use('/getbalance', balanceAPI);

app.use('/', indexRouter);
app.use('/account', accountAPI);

app.use('/', indexRouter);
app.use('/createAccount', createAccountAPI);


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

module.exports = app;
