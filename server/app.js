require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');

var app = express();

const db = require('./models');
db.sequelize.sync({ force: false })
    .then(() => console.log('Successfully synced Models with DB'))
    .catch((err) => console.error('Sync Error: ', err));

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.all('/user/*', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
      console.log("======errrrr=======", err)
      return res.status(err.status || 500).send({
          STATUS: false,
          MSG: err.message,
          RESULT: ''
      });
});

module.exports = app;
