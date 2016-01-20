const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBSessionStore = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');
const http = require('http');
const cors = require('cors');
const passport = require('passport');
const User = require('./models/user.js');
const History = require('./models/history.js');
const settings = require('../settings.json');
const util = require('util');
const ensureAuth = require('../lib/ensureAuth');

// Connect to database
mongoose.connect(settings.appSettings.mongodb, function (err) {
  if (err) {
    console.error('Failed to connect to mongodb with connection string: %s', settings.appSettings.mongodb);
  }
});

const app = express();

app.set('views', __dirname);
app.set('view engine', 'jade');

app.disable('x-powered-by');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
  secret: 'QK48y3xQXdvhYQVu5Sesc3kf4TcY2xkAnu43YckATnec32YJpqAMLEWzhnABvw7gztFt2',
  cookie: {
    // path: '/',
    httpOnly: true,
    secure: false,
    // 1 hour
    maxAge: 1000 * 60 * 60
  },
  name: 'tumblagramme.sid',
  resave: false,
  rolling: true,
  saveUninitialized: true,
  store: new MongoDBSessionStore({
    uri: settings.appSettings.mongodb,
    collection: 'sessions'
  })
}));
app.use(cors());

// Authentication with passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Static files
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use('/', express.static(path.join(__dirname, 'public')));

// aka onBeforePageInit hook
app.use(function (req, res, next) {
  res.locals.debug = {
    session: req.session,
    user: req.user
  };
  next();
});

// Authentication
// app.use('/', require('./routes/account'));

// JSON APIs
// Tumblagramme route implements ensureLoggedIn itself to handle login
app.use('/api/tumblagramme', require('./routes/api/tumblagramme'));
app.use('/api/instagram',
  ensureAuth.local,
  require('./routes/oauth/instagram'),
  ensureAuth.instagram,
  require('./routes/api/instagram')
);
app.use('/api/tumblr',
  ensureAuth.local,
  require('./routes/oauth/tumblr'),
  ensureAuth.tumblr,
  require('./routes/api/tumblr')
);

// Angular app and static assets
// Should be added as the last routes, as angular takes control of routing itself
app.use('/js/angular', express.static(path.join(__dirname, 'angular')));
app.use('/js/angular', function (req, res) {
  // Produce designated 404 for all angular resources
  // as the angular app takes over control of routing
  // making it impossible to send other http status codes.
  // Makes it easier to spot 404's while debugging.
  return res.status(404).end();
});
app.use('/', require('./routes/angular'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  return next(err);
});

// development error handler
// will print stacktrace
app.use(function (err, req, res, next) {
  console.error(err);
  res.status(err.status || 500);
  res.render('views/error', {
    message: err.message,
    error: err,
    pwd: __filename,
    full: JSON.stringify(err, null, 2)
  });
});

// Start server
http.createServer(app).listen(
  settings.appSettings.httpPort,
  settings.appSettings.hostname,
  function () {
    console.log(
      'Express server listening on http://%s:%d',
      settings.appSettings.hostname,
      settings.appSettings.httpPort
    );
  }
);
