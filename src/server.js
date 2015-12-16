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
const settings = require('../settings.json');
const util = require('util');

// Connect to database
mongoose.connect(settings.appSettings.mongodb, function(err) {
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
    collection: 'mySessions'
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
app.use(require('less-middleware')(path.join(__dirname, 'public/css')));
app.use('/', express.static(path.join(__dirname, 'public')));

// Authentication
app.use('/', require('./routes/account'));

// JSON APIs
app.use('/api/tumblagramme', require('./routes/api/tumblagramme'));
app.use('/api/instagram', require('./routes/api/instagram'));
app.use('/api/tumblr', require('./routes/api/tumblr'));
app.use('/api/db', require('./routes/api/db'));

// OAuth endpoints
app.use('/oauth/tumblr', require('./routes/oauth/tumblr'));

app.use('/js/angular', express.static(path.join(__dirname, 'angular')));
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
http.createServer(app).listen(3000, function () {
  console.log('Express server started on 3000');
});
