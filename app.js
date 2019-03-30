const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('errorhandler');

//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

//Configure isProduction variable
const isProduction = process.env.NODE_ENV === 'production';

//Initiate our app
const app = express();

//Configure our app
app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'bookmarks-darius', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

if(!isProduction) {
  app.use(errorHandler());
}

//Configure Mongoose
mongoose.connect('mongodb://localhost/bookmarks', { useNewUrlParser: true });
mongoose.set('debug', true);

//Models & routes
require('./models/Users');
require('./models/Bookmarks');
require('./config/passport');
app.use(require('./routes'));

// express doesn't consider not found 404 as an error so we need to handle 404 explicitly handle 404 error
app.use(function(req, res, next) {
  if (err) {
    next(err);
  } else { // no error thrown by another route, so we must not have found a route, therefore return a 404
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
  }
});

//Error handlers & middlewares
if(!isProduction) {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

app.use(function (err, req, res, next) {
  res.status(err.status || 500);

  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

app.listen(8000, () => console.log('Server running on http://localhost:8000/'));