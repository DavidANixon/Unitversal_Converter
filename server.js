var http = require('http');
var express = require('express');
var app = express();
var port = process.env.PORT || 5757;

http.createServer(app).listen(port, function () {
  console.log("Express server listening on port " + port);
});
