var request = require ('supertest');
var app = require('./app');

describe('Request to the root path', function (){
  it('Returns a 200 status code', function(done){
    request(app)
      .get('/')
      .expect(200)
      .end(function(error){
        if (error) {
          throw error;
        } else {
          done();
        }
      })
  });
  it('Returns a HTML format',function (done){
    request(app)
      .get('/')
      .expect('Content-Type',/html/,done);
  });
  it('Returns an index file with cities',function (done){
    request(app)
      .get('/')
      .expect(/cities/i,done);
  });
});

describe ('Listing cities on /cities',function(){
  it('Returns 200 status code', function(done){
    request(app)
      .get('/cities')
      .expect(200,done); //aparentemente pasando done como segundo argumento es lo mismo que pasar la done function como en el caso de arriba.
  });
  it('Returns JSON format', function(done){
    request(app)
      .get('/cities')
      .expect('Content-Type',/json/, done);
  });
  it('Returns initial cities',function(done){
    request(app)
      .get('/cities')
      .expect(JSON.stringify(['Lotopia','Caspiana','Indigo'],done));
  });
})

describe ('Creating new cities',function(){
  it('Returns a 201 status code',function(done){
    request(app)
      .post('/cities')
      .send('name=Springfield&description=where+the+simpsons+live')
      .expect(201,done);
  })
})
