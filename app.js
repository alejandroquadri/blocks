// ./node_modules/mocha/bin/mocha -w app.js test.js

var express = require ('express');
var app = express();
var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({extended:false});
app.use(express.static('public'));
/*
app.get('/',function(request,response){
  response.send('OK');
})*/
var cities = {
  'Lotopia':'',
  'Caspiana':'',
  'Indigo':''
};
app.get('/cities', function(request, response){
  response.json(Object.keys(cities)); //siempre al usar send manda en json, es lo mismo usar json o send. Usa send para que sea mas claro leerlo.
})

app.post('/cities',urlencode, function(request, response){
  console.log(request);
  var newCity = request.body;
  console.log(newCity);
  cities[newCity.name] = newCity.description;
  response.status(201).json(newCity.name); //si pones sendStatus, como estaba antes termina el call. Si depues viene json, va status.
});
module.exports = app;
