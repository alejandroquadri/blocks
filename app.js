// ./node_modules/mocha/bin/mocha -w app.js test.js
// NODE_ENV=test y lo que sigue para aclarar que estamos en ambiente test

var express = require ('express');
var app = express();

app.use(express.static(__dirname + '/public'));

var cities = require('./routes/cities');
app.use('/cities',cities);


module.exports = app;
