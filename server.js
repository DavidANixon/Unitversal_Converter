//made a comment
var express = require('express');
var app = express();
var http = require('http').createServer(app);
var pg = require('pg');
var sio = require('socket.io');
var io = sio(http);
var port = process.env.PORT || 6969;

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432';
const client = new pg.Client(connectionString);
client.connect();


getData = function(){
  var dat;
  console.log("indata");
  pg.connect(connectionString, function(err, client, done) {
    console.log("inconnect");
    client.query('SELECT * FROM conversion;', function(err, result) {
      dat = result;
      done();
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
