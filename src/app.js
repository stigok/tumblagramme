const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.disable('x-powered-by');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./routes/index'));

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
  res.render('error', {
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
