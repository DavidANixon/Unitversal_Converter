var socket = io();

socket.emit("data",0);

var dat;

function submit(){
  out = {unit: document.getElementById("unit").value};
  for (var i = 0; i < units.length; i++) {
    out[units[i]] = document.getElementById(units[i]).value;
  }

  socket.emit("add", out);
}

socket.on("data", function(data){
  dat = data;
  console.log(dat);
  units = [];
  for (var key in dat) {
    if (dat.hasOwnProperty(key)) {
      for (var lol in dat[key]) {
        if (dat[key].hasOwnProperty(lol)) {
          if(units.indexOf(lol) == -1){
            units.push(lol);
          }
        }
      }
    }
  }
  str = "<table><tr><td>unit</td>";
  for (var i = 0; i < units.length; i++) {
    str+= "<td>"+units[i]+"</td>";
  }
  str+= "</tr><tr><td><input id=\"unit\"></input></td>";
  for (var i = 0; i < units.length; i++) {
    str+= "<td><input type='number' id=\""+units[i]+"\"></input></td>";
  }
  str+= "</tr></table>"
  document.getElementById("form_here").innerHTML=str;
  //update units
});
