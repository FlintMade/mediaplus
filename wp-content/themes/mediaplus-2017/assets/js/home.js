(function(document, window, undefined){
  'use strict';

  /*
   *	=============================================
   *	HOME PAGE
   *	=============================================
   */

  /*
   *  REVEAL TEXT
   *  Slide-fade across home page text to create
   *  letter-by-letter animation effect
   *	---------------------------------------------
   */

  var timelineWrap = document.querySelector('.timeline-process'),
      text = document.getElementById('homeText'),
      textHeight = text.offsetHeight,
      lineHeight = parseInt(window.getComputedStyle(text, null).getPropertyValue('line-height')),
      numOverlays = Math.round(textHeight / lineHeight);

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
    var overlays = timelineWrap.querySelectorAll('.overlay');
    for (var i = 0; i < overlays.length; i++) {
      var thisOverlay = overlays[i],
          thisTiming = (i * 1600);
      slideOverlay(thisOverlay, thisTiming);
    }
  };

  var slideOverlay = function(overlay, timing) {
    setTimeout(function(){
      overlay.classList.add('open');
      console.log(timing);
    }, timing);
  };

  createOverlays();
  slideOverlays();

})(document, window);