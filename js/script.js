var mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

const header = document.querySelector('#header'),
  footer = document.querySelector('#footer');

document.addEventListener('DOMContentLoaded', loadDoc);
function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "../template/header.html", true);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      header.innerHTML =
        this.responseText;
    }
  };
  
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "../template/footer.html", true);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      footer.innerHTML =
        this.responseText;
    }
  };

}