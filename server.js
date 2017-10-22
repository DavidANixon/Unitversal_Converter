//made a comment
var express = require('express');
var app = express();
var http = require('http').createServer(app);
//var pg = require('pg');
const { Pool, Client } = require('pg');
var sio = require('socket.io');
var io = sio(http);
var port = process.env.PORT || 6969;



getData = function(){
  var dat = {};
  console.log("indata");

  const pool = new Pool({
    user: 'pyaeemldfcrphx',
    host: 'ec2-54-235-80-137.compute-1.amazonaws.com',
    database: 'dds25ml3gtkcif',
    password: 'b5687a6f2398c72fc6dd4e0bd48a411befd302f027e7dae5ac60d98e18bfd913',
    port: 5432,
  });

  pool.query('SELECT * FROM conversion;', (err, res) => {
    console.log(err);
    console.log(res.rows);
    console.log("##########");
    for(var i = 0; i < res.length; i++){
      console.log(i);
      for(var key in res[i]){
        if(res[i].hasOwnProperty(key) && key != "id" && key != "unit" && res[i][key] != null){
          console.log("!! -> "+key);
          dat[res[i][unit]][key] = res[i][key];
        }
      }
    }
    return dat;
    pool.end()
  })
}

http.listen(port);

app.get("/", function(req, res){
  console.log("yuh");
  res.sendFile(__dirname + "/index.html");
  console.log(getData());
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
