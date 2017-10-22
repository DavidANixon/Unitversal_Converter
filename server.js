//made a comment
var express = require('express');
var app = express();
var http = require('http').createServer(app);
//var pg = require('pg');
const { Pool, Client } = require('pg');
var sio = require('socket.io');
var io = sio(http);
var port = process.env.PORT || 6969;

const pool = new Pool({
  user: 'pyaeemldfcrphx',
  host: 'ec2-54-235-80-137.compute-1.amazonaws.com',
  database: 'dds25ml3gtkcif',
  password: 'b5687a6f2398c72fc6dd4e0bd48a411befd302f027e7dae5ac60d98e18bfd913',
  port: 5432,
})

getData = function(){
  var dat;
  console.log("indata");
  pool.connect(function(err, client, done) {
    console.log("inconnect");
    client.query('SELECT * FROM conversion;', function(err, result) {
      dat = result;
      pool.end();
    });
  });
  console.log(dat);
}

http.listen(port);

app.get("/", function(req, res){
  console.log("yuh");
  res.sendFile(__dirname + "/index.html");
  getData();
});

app.get("/scripts.js", function(req, res){
  res.sendFile(__dirname + "/scripts.js");
});

app.get("/stylesheet.css", function(req, res){
  res.sendFile(__dirname + "/stylesheet.css");
});

io.on('connection', function(socket){
  socket.on('message', function(msg){
    console.log('message: ' + msg);
  });
  socket.on("data", function(data) {
});
});
