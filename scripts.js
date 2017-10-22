var unitsSelected;
var firstThingToBeConverted;
var secondThingToBeConverted;
var socket = io();

function dropdownMenu() {
    document.getElementById("myDropdown").classList.toggle("show");
}

var dat = {};

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

console.log(dat);

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
    firstThingToBeConverted = document.getElementById("firstThing").value;
    secondThingToBeConverted = document.getElementById("secondThing").value;

    var result;
    console.log(firstThingToBeConverted);
    console.log(unitsSelected);
    if(document.getElementById("leftTextBox").value===""){
        result = (dat[secondThingToBeConverted][unitsSelected]* parseFloat(document.getElementById("rightTextBox").value)) /(dat[firstThingToBeConverted][unitsSelected]);
        document.getElementById("leftTextBox").value = result;
    }else {
        result = (dat[firstThingToBeConverted][unitsSelected]* parseFloat(document.getElementById("leftTextBox").value)) /(dat[secondThingToBeConverted][unitsSelected]);
        document.getElementById("rightTextBox").value = result;
    }
    console.log(result);
}


function setUnitsSelected() {


  unitsSelected = document.getElementById("units").value;
  console.log(dat);
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

socket.emit("data",0);

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
  str = "";
  for (var i = 0; i < units.length; i++) {
    str+= "<option value=\""+units[i]+"\">"+units[i]+"</option>";
  }
  document.getElementById("units").innerHTML=str;
  //update units
});
