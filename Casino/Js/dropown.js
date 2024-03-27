function myFunction() {
  let myDiv = document.getElementById("myDropdown");    
  myDiv.classList.toggle("show");       
}
let dropButtons = document.getElementsByClassName('drop-button');  
for (i = 0; i < dropButtons.length; i++) {
  dropButtons[i].disabled = true;
  dropButtons[i].style.cursor = "default";      
}

let dropbutton = document.querySelector('.dropbtn');
dropbutton.addEventListener('click', () => {
  for (i = 0; i < dropButtons.length; i++) {
    dropButtons[i].disabled = false;
  }
})

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
    for (i = 0; i < dropButtons.length; i++) {
      dropButtons[i].disabled = true;
      dropButtons[i].style.cursor = "default";      
    }
  }
}
