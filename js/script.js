var mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 20) {
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


//To loade template for header and footer
const header = document.querySelector('#header'),
  footer = document.querySelector('#footer');
let argUrl = window.location.pathname;
  

document.addEventListener('DOMContentLoaded', loadDoc);
function loadDoc() {
    var xhttp = new XMLHttpRequest();
      xhttp.open("GET", "template/header.html", true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        header.innerHTML = this.responseText;

        switch (argUrl) {
          case "/index.html":
            header.querySelector('#home').classList.add('active');
            break;
          case "/about-us.html":
            header.querySelector('#about').classList.add('active');
            break;
          case "/tracking.html":
            header.querySelector('#tracking').classList.add('active');
            break;
          case "/contact.html":
            header.querySelector('#contact').classList.add('active');
            break;
          case "/signUp.html":
            header.querySelector('#signUp').classList.add('active');
            break;
          
          default:
            break;
        }

      }
    };
    var xhttp = new XMLHttpRequest();
      xhttp.open("GET", "template/footer.html", true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        footer.innerHTML =
        this.responseText;
      }
  }; 
  
  }
