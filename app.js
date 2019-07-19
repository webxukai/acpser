var createError = require('http-errors');
var express = require('express');

const cookieParase = require('cookie-parser');
const cookieSession = require('cookie-session');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var blogRouter = require('./routes/blog');

var app = express();
//这点很重要，如果没有，下面的req.cookies 会返回undefined
app.use(cookieParase());

app.use(cookieSession({
  //session的秘钥，防止session劫持。 这个秘钥会被循环使用，秘钥越长，数量越多，破解难度越高。
  keys: ['aaa', 'bbb', 'ccc'],
  //session过期时间，不易太长。php默认20分钟
  maxAge: 60 * 60,
  //可以改变浏览器cookie的名字
  name: 'session'
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/blog', blogRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;