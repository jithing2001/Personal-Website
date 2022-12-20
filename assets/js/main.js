/**
* Template Name: Personal - v4.7.0
* Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)

    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '#navbar .nav-link', function(e) {
    let section = select(this.hash)
    if (section) {
      e.preventDefault()

      let navbar = select('#navbar')
      let header = select('#header')
      let sections = select('section', true)
      let navlinks = select('#navbar .nav-link', true)

      navlinks.forEach((item) => {
        item.classList.remove('active')
      })

      this.classList.add('active')

      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }

      if (this.hash == '#header') {
        header.classList.remove('header-top')
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        return;
      }

      if (!header.classList.contains('header-top')) {
        header.classList.add('header-top')
        setTimeout(function() {
          sections.forEach((item) => {
            item.classList.remove('section-show')
          })
          section.classList.add('section-show')

        }, 350);
      } else {
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        section.classList.add('section-show')
      }

      scrollto(this.hash)
    }
  }, true)

  /**
   * Activate/show sections on load with hash links
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      let initial_nav = select(window.location.hash)

      if (initial_nav) {
        let header = select('#header')
        let navlinks = select('#navbar .nav-link', true)

        header.classList.add('header-top')

        navlinks.forEach((item) => {
          if (item.getAttribute('href') == window.location.hash) {
            item.classList.add('active')
          } else {
            item.classList.remove('active')
          }
        })

        setTimeout(function() {
          initial_nav.classList.add('section-show')
        }, 350);

        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

})()

/* form validation*/

var nameError = document.getElementById('name-error')
var emailError = document.getElementById('email-error');
var subjectError = document.getElementById('subject-error')
var messageError = document.getElementById('message-error');
var submitError = document.getElementById('submit-error');
  
  
function validateName() {            
    var name= document.getElementById('name').value;

    if(name.length == 0){
        nameError.innerHTML = 'field is required';
        return false;
    }
    if(!name.match(/^[A-Za-z]+ [A-Za-z]+$/)) {
        nameError.innerHTML = 'write full name';
        return false;
    }
    nameError.innerHTML = '';
        return true;
}

function validateEmail(){
var email = document.getElementById('email').value;

if(email.length==0){
emailError.innerHTML = 'Email is required';
return false;
}
if(!email.match(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/)){
emailError.innerHTML = 'Email invalid';
return false;
}
emailError.innerHTML = '';
return true;
}

function validateSubject() {
var subject = document.getElementById('subject').value;

if(subject.length==0){
//subjectError.style.display = 'block';
subjectError.innerHTML = 'Enter a valid message';
return false
 }
 subjectError.innerHTML='';
 return true;
}

function validateMessage(){
var message = document.getElementById('message').value;

if(message.length==0){
//messageError.style.display = 'block';
messageError.innerHTML = 'Enter a valid message';
return false
}
messageError.innerHTML='';
return true;
}


function validateForm(){




var name= document.getElementById('name').value;
if(name.length == 0){


document.getElementById('name-error').innerHTML='Name is required'
}

var email = document.getElementById('email').value;

if(email.length == 0) {

document.getElementById('email-error').innerHTML = 'Email is required'

}

if(document.getElementById('subject').value.length == 0){
document.getElementById('subject-error').innerHTML='This field is required'
}
if(document.getElementById('message').value.length == 0){
document.getElementById('message-error').innerHTML='This field is required'
}


if(!validateEmail() || !validateMessage() || !validateName() || !validateSubject()){
submitError.style.display = 'block';
        submitError.innerHTML = 'Please fix all errors to submit.';
        setTimeout(function() {submitError.style.display = 'none';}, 3000);
return false;
}

}
//  function preventNumberInput(e){
//   var keycode=(e.keycode? e.keycode:e.whch)
//   if(keycode > 47 && keycode < 58||keycode > 95 && keycode < 107){
//     e.preventDefault();
//   }

// }

