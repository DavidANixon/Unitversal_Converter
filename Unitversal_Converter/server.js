//made a comment

var http = require('http');
var express = require('express');
//var pg = require('pg');
var app = express();
var port = process.env.PORT || 6969;

//const client = new pg.Client(connectionString);
client.connect();

//pg.connect(connectionString, function(err, client, done) {
  //client.query('CREATE TABLE IF NOT EXISTS conversion(id PRIMARY KEY, date VARCHAR(60) not null, box0 INT, box1 INT, box2 INT, box3 INT, box4 INT, box5 INT, box6 INT, box7 INT, box8 INT, total INT, color VARCHAR(10), initials VARCHAR(3) )', function(err, result) {
    //done();
  //});
//});

http.createServer(app).listen(port, function () {
  console.log("Express server listening on port "+port);
});

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});
