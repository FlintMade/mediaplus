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
      afterAll = (overlays.length * 1600) + 400;
  for (var i = 0; i < overlays.length; i++) {
    var thisOverlay = overlays[i],
        thisTiming = (i * 1600);
    slideOverlay(thisOverlay, thisTiming);
  }

  // Fade in scroll button at end
  setTimeout(function(){
    fade(homeScrollLink, 0, 1, 400);
    loadFirstCaseStudy();

    // Attach scroll past intro event
    window.addEventListener('mousewheel', scrollAwayIntro, false);
    window.addEventListener('DOMMouseScroll', scrollAwayIntro, false);
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
  *  SCROLL TO FIRST CASE STUDY
  *	---------------------------------------------
  */

// Load first case study
var loadFirstCaseStudy = function() {
  $.ajax({
    url: firstCaseStudy.ajaxurl,
    type: 'post',
    data: {
      action: 'first_case_study',
      query_vars: firstCaseStudy.query_vars
    },
    success: function(newPosts) {
      setTimeout(function(){
        $('#flow').prepend(newPosts);
        setUpGalleries();
      }, 200);
    }
  });
};

/*
  * SCROLL AWAY HOME INTRO
  * Background: https://www.sitepoint.com/html5-javascript-mouse-wheel/
  * Sidebar-related functions are in scripts.js
  *	-------------------------------------------------------------------
  */
var delta = 0;

var setUpFirstCS = function() {
  var currentCS = document.querySelector('.case-study--current');
  setRecentCS(currentCS);
  if (window.outerWidth >= bpSidebarL) {
    openSidebar();
  } else {
    logoTextWrap.classList.add('abbreviated');
  }

  setTimeout(function(){
    document.body.classList.add('intro-scrolled');
    window.addEventListener('mousewheel', scrollEvents, false);
    window.addEventListener('DOMMouseScroll', scrollEvents, false);
    if (homeIntro.parentNode) {
      homeIntro.parentNode.removeChild(homeIntro);
    }
  }, 200);
};

var scrollAwayIntro = function(e) {
  delta++;
  var scrollAmount = 5 * Math.abs(delta);
  homeIntro.style.top = '-' + scrollAmount + '%';
  if (scrollAmount >= 100) {
    setUpFirstCS();
  }
};

var clickAwayIntro = function(e) {
  e.preventDefault();
  document.body.classList.add('intro-clicked-past');
  setTimeout(function(){
    setUpFirstCS();
  }, 400);
};

homeScrollLink.addEventListener('click', clickAwayIntro, false);