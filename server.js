//made a comment

var http = require('http');
var express = require('express');
var app = express();
var port = process.env.PORT || 6969;

http.createServer(app).listen(port, function (req,res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World!');
  console.log("Express server listening on port " + port);
});
