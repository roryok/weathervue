'use strict';
const Hapi = require('hapi');
// const fs = require('fs');
const functions = require('./functions');

const server = new Hapi.Server();

var port = process.env.PORT || 3000;

server.connection({ port: port, host: 'localhost' });

server.register(require('inert'), (err) => {

  if (err) { console.error(err); }

  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      reply.file('./index.html');
    }
  });

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: '.',
        redirectToSlash: true,
        index: true
      }
    }
  });

  server.route({  
    method: 'GET',
    path: '/dist/build.js',
    handler: function (request, reply) {
      reply.file('./dist/build.js')
    }
  })

  server.route({
    method: 'GET',
    path: '/node_modules/bootstrap/dist/css/bootstrap.css',
    handler: function (request, reply) {
      reply.file('./node_modules/bootstrap/dist/css/bootstrap.css');
    }
  });

  server.route({
    method: 'GET',
    path: '/location',
    handler: functions.getLocation
  });

  server.route({
    method: 'GET',
    path: '/weather/get/{country}/{region}/{city}',
    handler: functions.getWeather
  });

  server.route({
    method: 'GET',
    path: '/events/get/{country}/{city}',
    handler: functions.getEvents
  });

});

server.start((err) => {
  if (err) { console.error(err); }
  console.log(`Server running at: ${server.info.uri}`);
});