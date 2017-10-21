//made a comment
var express = require('express');
var app = express();
var http = require('http').createServer(app);
//var pg = require('pg');
var sio = require('socket.io');
var io = sio(http);
var port = 6969;

//const client = new pg.Client(connectionString);
//client.connect();

//pg.connect(connectionString, function(err, client, done) {
  //client.query('CREATE TABLE IF NOT EXISTS conversion(id PRIMARY KEY, date VARCHAR(60) not null, box0 INT, box1 INT, box2 INT, box3 INT, box4 INT, box5 INT, box6 INT, box7 INT, box8 INT, total INT, color VARCHAR(10), initials VARCHAR(3) )', function(err, result) {
    //done();
  //});
//});

http.listen(port);

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
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
