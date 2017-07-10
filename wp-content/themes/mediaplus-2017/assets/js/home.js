'use strict';

/*
  *	=============================================
  *	HOME PAGE
  *	=============================================
  */

/*
  *  SET RECENT PAGE
  *  Remember home as last "case study flow" page
  *	---------------------------------------------
  */

localStorage.setItem('recentPage', 'home');

/*
  *  REVEAL TEXT
  *  Slide-fade across home page text to create
  *  letter-by-letter animation effect
  *	---------------------------------------------
  */

var homeIntro = document.querySelector('.home-intro'),
    timelineWrap = document.querySelector('.timeline-process'),
    text = document.getElementById('homeText'),
    textHeight = text.offsetHeight,
    lineHeight = parseInt(window.getComputedStyle(text, null).getPropertyValue('line-height')),
    numOverlays = Math.round(textHeight / lineHeight),
    homeScrollLink = document.getElementById('scroll-home');

var createOverlays = function(){
  for (var i = 0; i < numOverlays; i++){
    var overlay = document.createElement('span'),
        division = (100 / numOverlays),
        topPos =  division * i;
    overlay.classList.add('overlay');
    overlay.style.top = topPos + '%';
    overlay.style.height = division + '%';
    timelineWrap.appendChild(overlay);
  }
};

var slideOverlays = function() {
  var overlays = timelineWrap.querySelectorAll('.overlay'),
      afterAll = (overlays.length * 0) + 400;
  for (var i = 0; i < overlays.length; i++) {
    var thisOverlay = overlays[i],
        thisTiming = (i * 0);
    slideOverlay(thisOverlay, thisTiming);
  }

  // Fade in scroll button at end
  setTimeout(function(){
    fade(homeScrollLink, 0, 1, 400);
  }, afterAll);
};

var slideOverlay = function(overlay, timing) {
  setTimeout(function(){
    overlay.classList.add('open');
  }, timing);
};

createOverlays();
slideOverlays();

/*
  *  SCROLL AWAY HOME INTRO
  *  Background: https://www.sitepoint.com/html5-javascript-mouse-wheel/
  *	-------------------------------------------------------------------
  */
var delta = 0;

var setUpFirstCS = function() {
  var currentCS = document.querySelector('.case-study--current');
  setRecentCS(currentCS);
  openSidebar();
  document.body.classList.add('intro-scrolled');

  setTimeout(function(){
    if (homeIntro.parentNode) {
      homeIntro.parentNode.removeChild(homeIntro);
    }
  }, 200);
};

var clickAwayIntro = function(e) {
  e.preventDefault();
  document.body.classList.add('intro-clicked-past');
  setTimeout(function(){
    setUpFirstCS();
  }, 400);
};

homeScrollLink.addEventListener('click', clickAwayIntro, false);