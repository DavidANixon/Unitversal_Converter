var unitsSelected;
var firstThingToBeConverted;
var secondThingToBeConverted;
var socket = io();

function dropdownMenu() {
    document.getElementById("myDropdown").classList.toggle("show");
}

dat = {};

ele = {};
ele["length"] = 6;
ele["mass"] = 5000;
ele["energy"] = 10000;

dat["elephant"] = ele;

car = {};
car["length"] = 7;
car["mass"] = 4000;
car["energy"] = 7000;

dat["car"] = car;


// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

// When the user clicks the submit button
function convert() {

}

function setUnitsSelected() {
  unitsSelected = document.getElementById("units").value;
  console.log(unitsSelected);
  var str;
  for (var key in dat) {
    if (dat.hasOwnProperty(key)) {
      if (dat[key][unitsSelected]) {
        str+= "<option value=\""+key+"\">"+key+"</option>";
      }
    }
  }
  document.getElementById("firstThing").innerHTML=str;
  document.getElementById("secondThing").innerHTML=str;
}

function setFirstThing() {
  firstThingToBeConverted = document.getElementById("firstThing").value;
  console.log(firstThingToBeConverted);
}

function setSecondThing(value){
  secondThingToBeConverted = document.getElementById("secondThing").value;
  console.log(firstThingToBeConverted);
}


socket.emit("data",0);

socket.on("data", function(data){
  dat = data;
  console.log(dat);
  units = [];
  for (var key in dat) {
    if (dat.hasOwnProperty(key)) {
      for (var lol in dat[key]) {
        if (dat[key].hasOwnProperty(lol)) {
          if(!units.contains(lol)){
            units.push(lol);
          }
        }
      }
    }
  }
  str = "";
  for (var i = 0; i < units.length; i++) {
    str+= "<option value=\""+units[i]+"\">"+units[i]+"</option>";
  }
  document.getElementById("units").innerHTML=str;
  //update units
});
