var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var buffer = require('buffer/').Buffer;
const mongoose = require('mongoose');

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const mongoDB = 'mongodb://localhost:27017/testdb'
mongoose.connect(mongoDB);
mongoose.Promise = Promise;
const db = mongoose.connection;

db.on('error', console.error.bind(console, "MongoDB connection error"));


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
