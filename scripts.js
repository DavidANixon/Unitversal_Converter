var unitsSelected;
var firstThingToBeConverted;
var secondThingToBeConverted;


function dropdownMenu() {
    document.getElementById("myDropdown").classList.toggle("show");
}

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
document.getElementById('Convert').onclick = function(event) {
  //socket.emit();
  console.log("you did it");
});
