// ./node_modules/mocha/bin/mocha -w app.js test.js

var express = require ('express');
var app = express();


app.use(express.static('public'));
/*
app.get('/',function(request,response){
  response.send('OK');
})*/
app.get('/cities', function(request, response){
  var cities = ['Lotopia','Caspiana','Indigo'];
  response.json(cities); //siempre al usar send manda en json, es lo mismo usar json o send. Usa send para que sea mas claro leerlo.
})
module.exports = app;
