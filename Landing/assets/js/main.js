import '../css/style.css';
import Pristine from 'pristinejs';
import $ from 'jquery';
import 'slick-carousel'
$(document).ready(() => {
  const isMobile = $(document).width() < 600;
  const isTablet = $(document).width() > 600 && $(document).width() < 1024;
  const isDesktop = $(document).width() > 1024;

  $('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top - (isMobile ? 70 : 100)
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });
  vaidatorForm();
  const phoneInput = document.getElementById('phone');
  phoneInput.onfocus = function(){
    phoneInput.setAttribute('placeholder', '+__')
  }
  phoneInput.onblur = function(){
    console.log(phoneInput.value.lenght)
    if(!phoneInput.value.lenght){
      phoneInput.setAttribute('placeholder', 'Phone')
    }
  }
  window.addEventListener('scroll', () => {
    let scrollDistance = window.scrollY - (isMobile ? 450 : 400);
    if(document.querySelector('header').clientHeight <= scrollDistance){
      document.querySelector('header').classList.add('scroll')
    }else {
      document.querySelector('header').classList.remove('scroll')
    }
    document.querySelectorAll('section').forEach((elSection,i) => {
      if(elSection.offsetTop - document.querySelector('header').clientHeight - 600 <= scrollDistance){
        document.querySelectorAll('nav a ').forEach( elLink => {
          if(elLink.classList.contains('scroll-active') ){
            elLink.classList.remove('scroll-active')
          }
          if(elSection.id === elLink.getAttribute('href').slice(1)){
            elLink.classList.add('scroll-active')
          }
         
        })
      }
    })
  });
  $(".to-top--btn a").click(function() {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
  });
  
});
$(window).resize((event) => {
  if($( window ).width() <= 600) {
    $('.footer').remove($('.footer-container'))
    try {
      $('#slider').slick('getSlick');
    } catch (e) {
      initSlider('init')
    }
  }
});


//TODO:перевірити валідацію
const defaultConfig = {
  classTo: 'field-wrap',
  errorClass: 'field-error',
    successClass: 'field-success',
    errorTextParent: 'field-wrap',
    errorTextTag: 'div',
    errorTextClass: 'field-help'
}
const vaidatorForm = () => {
  const form = document.getElementById("form");
  const pristine =  new Pristine(form, defaultConfig);
  const phone = document.getElementById('phone');
  const firstName = document.getElementById('firstName');
  const lastName = document.getElementById('lastName');
  pristine.addValidator(lastName, function(value){
     const test = /[a-zA-Z]/
    return test.test(value)
  }, "Incorrect last name", 2, false);
  pristine.addValidator(firstName, function(value){
    const test = /[a-zA-Z]/
    return test.test(value)
  }, "Incorrect first name", 2, false)
  pristine.addValidator(phone, function(value){
    const test = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/;
    return test.test(value)
  },"Incorrect telephone", 2, false)
  
  form.addEventListener('submit', event => {
    event.preventDefault();
    var valid = pristine.validate();
  })
}
function initSlider(param){
  window.console.log('init')
  if(param === 'init'){
    $('#slider').slick({
      arrows:true,
      slideToShow:1,
      centerMode: true,
      centerPadding: '60px',
      adaptiveHeight: false,
      variableWidth: false,
      dots:true,
      
    })
  }else{
    $('#slider').slick(param)
  }
  
}
