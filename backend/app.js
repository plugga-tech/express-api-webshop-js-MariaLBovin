var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const productRouter = require('./routes/products');
const orderRouter = require('./routes/orders');
const categoriesRouter = require('./routes/categories');
const mongoose = require('mongoose');
const cors = require('cors');


var app = express();

async function init (){
    await mongoose.connect("mongodb://127.0.0.1:27017/maria-larsson-bovin")
    .then (() => console.log('databasen är igång'));
}
init ();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/categories', categoriesRouter);
app.use(cors());


module.exports = app;
