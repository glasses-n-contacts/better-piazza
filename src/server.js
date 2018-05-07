const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

const index = require('./routes/index');
const users = require('./routes/users');

const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

mongoose.connect('mongodb://127.0.0.1:27017/test'); //mongodb://heroku_qq11t3t2:tkkrmgbi84neulp6s09711b8ie@ds217350.mlab.com:17350/heroku_qq11t3t2
mongoose.Promise = global.Promise;
const db = mongoose.connection;

// handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to db');
  // we're connected!
});


// use sessions for tracking logins
app.use(session({
  secret: 'anime',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db,
  }),
}));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  const isDevelopment = process.env.NODE_ENV === 'development';

  // if development give the error stack
  if (isDevelopment) {
    console.log(err);
  }

  // return the error body if in development
  // otherwise return empty error object with message
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: isDevelopment ? err : {},
  });
});

const port = 5170;
app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});

module.exports = app;
