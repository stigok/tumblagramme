const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');
const cors = require('cors');
const app = express();

app.set('views', __dirname);
app.set('view engine', 'jade');

app.disable('x-powered-by');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

// Set mock user
app.use(function (req, res, next) {
  req.user = require('../user.json');
  next();
});

// Static files
app.use(require('less-middleware')(path.join(__dirname, 'public/css')));
app.use('/', express.static(path.join(__dirname, 'public')));

// JSON APIs
app.use('/api/tumblagramme', require('./routes/api/tumblagramme'));
app.use('/api/instagram', require('./routes/api/instagram'));
app.use('/api/tumblr', require('./routes/api/tumblr'));
app.use('/api/db', require('./routes/api/db'));

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
