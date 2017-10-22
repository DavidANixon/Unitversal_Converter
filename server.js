//made a comment
var express = require('express');
var app = express();
var http = require('http').createServer(app);
//var pg = require('pg');
const { Pool, Client } = require('pg');
var sio = require('socket.io');
var io = sio(http);
var port = process.env.PORT || 6969;



sendData = function(socket){
  var dat = {};

  const pool = new Pool({
    user: 'pyaeemldfcrphx',
    host: 'ec2-54-235-80-137.compute-1.amazonaws.com',
    database: 'dds25ml3gtkcif',
    password: 'b5687a6f2398c72fc6dd4e0bd48a411befd302f027e7dae5ac60d98e18bfd913',
    port: 5432,
  });

  console.log(socket);
  pool.query('SELECT * FROM conversion;', function(err, res){
    console.log("2: --> "+socket);
    console.log(err);
    res = res.rows;
    for(var i = 0; i < res.length; i++){
      dat[res[i]["unit"]] = {};
      for(var key in res[i]){
        if(res[i].hasOwnProperty(key) && key != "id" && key != "unit" && res[i][key] != null){
          dat[res[i]["unit"]][key] = res[i][key];
        }
      }
    }
    console.log(dat);
    socket.emit("data", dat);
    pool.end()
  })
}

http.listen(port);

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.get("/add", function(req, res){
  res.sendFile(__dirname + "/add.html");
});

app.get("/add_this", function(req, res){
  str = "insert into conversion(unit";
  data = req.body;
  for (var key in data) {
    if (data.hasOwnProperty(key) && key != 'unit') {
      str+=", "+key;
    }
  }
  str += ") values ("+data["unit"];
  for (var key in data) {
    if (data.hasOwnProperty(var) && key != 'unit') {
      str+=", "+data[key];
    }
  }
  str+=");";
  console.log(str);
});

app.get("/scripts.js", function(req, res){
  res.sendFile(__dirname + "/scripts.js");
});

app.get("/add_script.js", function(req, res){
  res.sendFile(__dirname + "/add_script.js");
});

app.get("/stylesheet.css", function(req, res){
  res.sendFile(__dirname + "/stylesheet.css");
});

io.on('connection', function(socket){
  socket.on('message', function(msg){
    console.log('message: ' + msg);
  });
  socket.on("data", function() {
    console.log("sending data");
    sendData(socket);
  });
});
