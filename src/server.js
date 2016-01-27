const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBSessionStore = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');
const http = require('http');
const cors = require('cors');
const passport = require('passport');
const User = require('./models/user.js');
const settings = require('../settings.json');
const TumblrStrategy = require('passport-tumblr').Strategy;
const helmet = require('helmet');
const winston = require('winston');

// Logging with winston
const logger = new (winston.Logger)({
  level: 'silly',
  transports: [
    new (winston.transports.Console)()
    // new (winston.transports.File)({ filename: 'somefile.log', level: 'error' })
  ]
});

logger.info('Starting app', settings);

// Connect to database
mongoose.connect(settings.appSettings.mongodb, function (err) {
  if (err) {
    logger.error('Failed to connect to mongodb with connection string: %s', settings.appSettings.mongodb);
  }
});

const app = express();

app.set('views', __dirname);
app.set('view engine', 'jade');

// Helmet is a collection of nine smaller middleware functions that set security-related HTTP headers
app.use(helmet());

// Log all requests
app.use(function (req, res, next) {
  logger.verbose('request', req.path);
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
  secret: 'QK48y3xQXdvhYQVu5Sesc3kf4TcY2xkAnu43YckATnec32YJpqAMLEWzhnABvw7gztFt2',
  cookie: {
    secure: false,
    httpOnly: true,
    path: '/',
    // 2 weeks
    maxAge: 1000 * 60 * 60 * 24 * 7 * 2
  },
  name: 'tumblagramme-session',
  resave: false,
  rolling: true,
  saveUninitialized: true,
  store: new MongoDBSessionStore({
    uri: settings.appSettings.mongodb,
    collection: 'sessions'
  })
}));
app.use(cors());

//
// Authentication with passport
//
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      return done(err);
    }
    return done(null, user);
  });
});

passport.use(
  new TumblrStrategy({
    consumerKey: settings.tumblr.consumerKey,
    consumerSecret: settings.tumblr.consumerSecret,
    callbackURL: settings.tumblr.callbackUrl
  },
  function (token, secret, profile, done) {
    logger.log(profile);
    User.findOne({'tumblr.profile.name': profile.username}, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        user = new User();
        logger.log('Creating new user', profile.username);
      }
      user.tumblr.token = token;
      user.tumblr.secret = secret;
      user.tumblr.profile = profile._json.response.user;
      user.save(function (err) {
        if (err) {
          return done(err);
        }
        return done(null, user);
      });
    });
  })
);

// Static files
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use('/', express.static(path.join(__dirname, 'public')));

// aka onBeforePageInit hook
app.use(function (req, res, next) {
  if (req.user) {
    req.session.touch();
  }

  res.locals.debug = {
    session: req.session,
    user: req.user
  };
  logger.log('user', req.user);
  next();
});

// Authentication and auth block
app.use('/', require('./routes/auth'));

// JSON APIs
// Tumblagramme route implements ensureLoggedIn itself to handle login
app.use('/api/tumblagramme', require('./routes/api/tumblagramme'));
app.use('/api/instagram', require('./routes/api/instagram'));
app.use('/api/tumblr', require('./routes/api/tumblr'));

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
app.get(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  return next(err);
});

app.all(function (req, res) {
  return res.status(404).json('Not found');
});

// development error handler
// will print stacktrace
app.use(function (err, req, res, next) {
  logger.error(err);
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
    logger.log(
      'Express server listening on http://%s:%d',
      settings.appSettings.hostname,
      settings.appSettings.httpPort
    );
  }
);
