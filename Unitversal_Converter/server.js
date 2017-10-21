//made a comment

var http = require('http');
var express = require('express');
var app = express();
var port = process.env.PORT || 6969;

http.createServer(app).listen(port, function () {
  console.log("Express server listening on port "+port);
});

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});
