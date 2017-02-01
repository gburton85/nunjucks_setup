// selected elements
var navTrigger = document.getElementById('nav-trigger');
var nav = document.getElementById('nav');
var header = document.getElementById('header');
var heading = document.getElementById('heading');
var labels = document.getElementsByClassName('nav-label');

// sizing
var windowHeight = window.innerHeight;
var windowWidth = window.innerWidth;
var fontSize = windowHeight*0.1;
var headingSize = windowWidth*0.1;

// Event Listening
navTrigger.addEventListener('click', navToggle);
window.addEventListener('resize', resize);

function resize() {
  windowHeight = window.innerHeight;
  windowWidth = window.innerWidth;
  fontSize = windowHeight*0.1;
  headingSize = windowWidth*0.1;
  if(headingSize > windowHeight*0.3) headingSize = windowHeight*0.3;

  for(var i = 0; i < labels.length; i++) {
    labels[i].style.fontSize = fontSize+'px';
    labels[i].style.height = fontSize+'px';
    labels[i].style.marginTop = '-'+fontSize*0.6+'px';
  }

/* //header size redraw is too slow
  header.style.height = windowHeight+'px';
  heading.style.fontSize = headingSize+'px';
  heading.style.height = headingSize+'px';
  heading.style.marginTop = '-'+headingSize*0.6+'px';
*/
}

function navToggle(e) {
  var closed = (navTrigger.className.indexOf('close') > 0);
  if(closed) {
    navTrigger.className = 'nav-trigger open';
    nav.className = 'out';
  } else {
    navTrigger.className = 'nav-trigger close';
    nav.className = 'in';
  }
}

window.onload = resize;

  $(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});
