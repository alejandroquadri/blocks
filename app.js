// ./node_modules/mocha/bin/mocha -w app.js test.js

var express = require ('express');
var app = express();
var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({extended:false});
app.use(express.static('public'));

//!! conexion de REDIS
var redis = require('redis');
if (process.env.REDISTOGO_URL) {
  var rtg   = require("url").parse(process.env.REDISTOGO_URL);
  var client = redis.createClient(rtg.port, rtg.hostname);
  client.auth(rtg.auth.split(":")[1]);
} else {
    var client = redis.createClient();
}



client.select((process.env.NODE_ENV || 'development').length);
//con este comando se elige que database se esta usando.
//lo que hace aca es que segun el largo de la palabra le tire un numero distinto
//si se elige la dabase development el numero va ser distinto que por ej, test
//!! FIN conexion REDIS

app.get('/cities', function(request, response){
  client.hkeys('cities',function(error, names) {
    if (error) throw error;
    console.log('pasa por el get');
    response.json(names);
  });
  //esto es lo que usaba cuando tenia el objeto sin REDIS
  //response.json(Object.keys(cities)); //siempre al usar send manda en json, es lo mismo usar json o send. Usa send para que sea mas claro leerlo.
});

app.post('/cities',urlencode, function(request, response){
  var newCity = request.body;
  client.hset('cities',newCity.name,newCity.description, function(error){
    if (error) throw error;
    console.log('pasa por el post');
    response.status(201).json(newCity.name); //si pones sendStatus, como estaba antes termina el call. Si depues viene json, va status.
  })
});
module.exports = app;
