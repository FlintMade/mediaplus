(function(document, window, undefined){
  'use strict';

  /*
   *	=============================================
   *	HOME PAGE
   *	=============================================
   */

  /*
   *  FADE IN HOME TEXT ELEMENTS
   *	---------------------------------------------
   */

   /*
  var fadeInTextItems = function() {
    var textItems = document.querySelectorAll('.timeline-process__item');
    for (var i = 0; i < textItems.length; i++) {
      var thisItem = textItems[i],
          thisTiming = (i * 600) + 300;
      fadeItem(thisItem, thisTiming);
    }
  };

  var fadeItem = function(item, timing) {
    setTimeout(function(){
      item.classList.add('revealed');
    }, timing);
  };

  fadeInTextItems();
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
          thisTiming = (i * 1000) + 500;
      slideOverlay(thisOverlay, thisTiming);
    }
  };

  var slideOverlay = function(overlay, timing) {
    setTimeout(function(){
      overlay.classList.add('open');
    }, timing);
  };

  createOverlays();
  slideOverlays();

})(document, window);