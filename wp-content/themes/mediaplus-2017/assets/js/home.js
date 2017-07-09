(function(document, window, undefined){
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
      homeScrollBtn = document.createElement('button');

      homeScrollBtn.classList.add('scroll-home');
      homeScrollBtn.setAttribute('id', 'js-menu-toggle');
      homeScrollBtn.setAttribute('aria-label', 'View case studies');
      homeScrollBtn.innerHTML = '<span>Learn more</span><svg class="arrow" role="none"><use xlink:href="/wp-content/themes/mediaplus-2017/assets/images/sprite.svg#arrow"/></svg>';
      homeIntro.appendChild(homeScrollBtn);

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
        afterAll = (overlays.length * 1600) + 800;
    for (var i = 0; i < overlays.length; i++) {
      var thisOverlay = overlays[i],
          thisTiming = (i * 1600);
      slideOverlay(thisOverlay, thisTiming);
    }

    // Fade in scroll button at end
    setTimeout(function(){
      fade(homeScrollBtn, 0, 1, 400);
      loadFirstCaseStudy();
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

  var loadFirstCaseStudy = function() {
    $.ajax({
      url: loadNextCaseStudy.ajaxurl,
      type: 'post',
      data: {
        action: 'next_case_study',
        query_vars: loadNextCaseStudy.query_vars
      },
      success: function(newPosts) {
        setTimeout(function(){
          $('#flow').append(newPosts);
          setUpGalleries();
          resetCaseStudy();
        }, 200);
      }
    });
  };

})(document, window);