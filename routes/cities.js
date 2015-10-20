var express = require ('express');
var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({extended:false});

//!! conexion de REDIS
var redis = require('redis');
if (process.env.REDISTOGO_URL) {
  var rtg   = require("url").parse(process.env.REDISTOGO_URL);
  var client = redis.createClient(rtg.port, rtg.hostname);
  client.auth(rtg.auth.split(":")[1]);
} else {
    var client = redis.createClient();
    client.select((process.env.NODE_ENV || 'development').length);
    //con este comando se elige que database se esta usando.
    //lo que hace aca es que segun el largo de la palabra le tire un numero distinto
    //si se elige la dabase development el numero va ser distinto que por ej, test
}
//!! FIN conexion REDIS

var router = express.Router();

router.route('/')
  .get(function(request, response){
    client.hkeys('cities',function(error, names) {
      if (error) throw error;
      console.log('pasa por el get');
      response.json(names);
    });
  //esto es lo que usaba cuando tenia el objeto sin REDIS
  //response.json(Object.keys(cities)); //siempre al usar send manda en json, es lo mismo usar json o send. Usa send para que sea mas claro leerlo.
  })

  .post(urlencode, function(request, response){
    var newCity = request.body;
    if(!newCity.name || !newCity.description){
      response.sendStatus(400);
      return false;
    }
    client.hset('cities',newCity.name,newCity.description, function(error){
      if (error) throw error;
      console.log('pasa por el post');
      response.status(201).json(newCity.name); //si pones sendStatus, como estaba antes termina el call. Si depues viene json, va status.
    })
  });

router.route('/:name')
  .delete(function(request,response){
    console.log(request.params.name);
    client.hdel('cities', request.params.name, function(error){
      if (error) throw error;
      console.log('pasa por el delete');
      response.sendStatus(204);
    })
  })
  .get(function(request,response){
    client.hget('cities',request.params.name, function(error,description){
      response.render('show.ejs',
                        {city:
                          {name:request.params.name,description:description}
                        });
    });
  });

module.exports = router;
