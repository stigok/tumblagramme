var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var settings = require('./settings.json');

// Login implementation with PassportJS
// https://github.com/saintedlama/passport-local-mongoose/blob/master/examples/login/app.js
// http://mherman.org/blog/2013/11/11/user-authentication-with-passport-dot-js/#.VYqWLvmqpBf
var mongoose = require('mongoose');
var passport = require('passport');
var connectEnsureLogin = require('connect-ensure-login');
var ensureLoggedIn = connectEnsureLogin.ensureLoggedIn;
// var ensureLoggedOut = connectEnsureLogin.ensureLoggedOut;

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.disable('x-powered-by');

// Connect database connection through mongoose
mongoose.connect(settings.appSettings.mongodb, function (err) {
  if (err) {
    console.error('Could not connect to mongodb on ' + settings.appSettings.mongodb);
  } else {
    console.log('Connected to MongoDB server on ' + settings.appSettings.mongodb);
  }
});

// uncomment after placing your favicon in /public
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser('BEpELvKwvrYeFAeYKNNhUQJh4TB8qnwDsWPJW7Wwz8cr6qgwaf7fcCzfzTvpE25hVzSdDyd8NDGzQ5sMdqx5ccUbYmTeFkfTcGMbc8DhXdGyJWXPfcjPqzUh'));
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'BEpELvKwvrYeFAeYKNNhUQJh4TB8qnwDsWPJW7Wwz8cr6qgwaf7fcCzfzTvpE25hVzSdDyd8NDGzQ5sMdqx5ccUbYmTeFkfTcGMbc8DhXdGyJWXPfcjPqzUh',
  resave: false,
  saveUninitialized: true,
  rolling: true,
  // mongodb session store
  store: new MongoStore({mongooseConnection: mongoose.connection}),
  cookie: {
    secure: true,
    // 100 hours
    maxAge: 360000000,
    httpOnly: true
  },
  name: 'tumblagramme.session',
  collection: 'sessions'
}));

// Configure passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Configure passport-local to use account model for authentication
var Account = require('./models/account');
passport.use('local-auth', Account.createStrategy());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  Account.findById(id, function (err, user) {
    done(err, {
      username: user.username,
      accounts: settings.tumblr.accounts,
      activeAccount: settings.tumblr.accounts[user.activeAccountIndex],
      obj: user
    });
  });
});

// Custom middleware to give me some vars
app.use('/*', function (req, res, next) {
  res.locals.currentRoute = req.originalUrl;
  next();
});

// Authentication specific routes and settings
app.use('/', require('./routes/account'));
app.use('/account/link', require('./routes/account/link'))
app.use('/', ensureLoggedIn('/login'), require('./routes/posts'));
app.use('/tumblr', ensureLoggedIn('/login'), require('./routes/tumblr'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// app.use(function(err, req, res, next) {
  // res.status(500);
  // res.render('error-simple', { error : err });
// });

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    console.error(err);
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
      pwd: __filename
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
