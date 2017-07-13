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
    text = document.getElementById('homeText'),
    textLines = text.querySelectorAll('.home-intro__line'),
    overlays = text.querySelectorAll('.overlay'),
    homeScrollLink = document.getElementById('scroll-home');

var revealTextLine = function(overlay, timing) {
  setTimeout(function(){
    overlay.classList.add('hidden');
  }, timing);
};

var revealText = function() {
  var revealInterval = 1600,
      slide = false;

  // Determine if any lines wrap; if so, fade instead of slide
  for (var i = 0; i < textLines.length; i++) {
    if (textLines[i].getClientRects().length === 1) {
      slide = true;
    } else {
      slide = false;
      break;
    }
    if (slide = true) {
      revealInterval = 2400;
      text.classList.remove('fade');
      text.classList.add('slide');
    }
  }

  // Reveal lines
  for (var i = 0; i < overlays.length; i++) {
    var thisOverlay = overlays[i],
        thisTiming = (i * revealInterval);
    revealTextLine(thisOverlay, thisTiming);
  }

  // Fade in scroll button at end
  setTimeout(function(){
    fade(homeScrollLink, 0, 1, 400);
    loadFirstCaseStudy();

    // Attach scroll past intro event
    window.addEventListener('mousewheel', scrollAwayIntro, false);
    window.addEventListener('DOMMouseScroll', scrollAwayIntro, false);
    window.addEventListener('touchmove', scrollAwayIntro, false);
    window.addEventListener('touchend', scrollAwayIntro, false);
  }, (overlays.length * revealInterval) + (revealInterval / 2));
};

revealText();

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
    currentCS.classList.remove('case-study--new');

    window.removeEventListener('mousewheel', scrollAwayIntro, false);
    window.removeEventListener('DOMMouseScroll', scrollAwayIntro, false);

    window.addEventListener('mousewheel', scrollEvents, false);
    window.addEventListener('DOMMouseScroll', scrollEvents, false);
    window.addEventListener('touchmove', scrollEvents, false);
    window.addEventListener('touchend', scrollEvents, false);

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