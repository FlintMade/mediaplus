(function(document, window, undefined){
  'use strict';

  var bpHeaderSmall = 800;

  /*
   *	=============================================
   *	HEADER TOGGLE
   *	=============================================
   */
  
  // Vars
  var header = document.querySelector('.header'),
    headerTray = document.querySelector('.header__tray'),
    headerTrayContent = document.querySelector('.header__tray-content'),
    menu = document.querySelector('.header__menu'),
    menuContents = document.getElementById('js-menu-contents'),
    headerContact = document.querySelector('.header__contact'),
    menuButton = document.createElement('button'),
    pageOverlay = document.createElement('span');

  // Button properties
  menuButton.classList.add('menu-toggle');
  menuButton.setAttribute('id', 'js-menu');
  menuButton.setAttribute('aria-label', 'Site menu');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-controls', 'menu');
  menuButton.innerHTML = '<svg class="menu-toggle__open" role="none"><use xlink:href="/wp-content/themes/mediaplus-2017/assets/images/sprite.svg#menu"/></svg><svg class="menu-toggle__close" role="none"><use xlink:href="/wp-content/themes/mediaplus-2017/assets/images/sprite.svg#x"/></svg>';

  // Page overlay properties
  pageOverlay.classList.add('page-overlay');
  pageOverlay.setAttribute('role', 'none');
  
  // Menu properties
  menu.setAttribute('aria-hidden', 'true');
  menu.setAttribute('aria-labelledby', 'menu-button');
  
  // Add button to page
  headerTray.insertBefore(menuButton, headerTrayContent);
  headerTray.insertBefore(pageOverlay, headerTrayContent);

  var hideMenu = function() {
    header.classList.remove('menu-active');
    fade(pageOverlay, 1, 0, 200, function(){
      pageOverlay.style.display = 'block';
    });
    menu.setAttribute('aria-hidden', 'true');
    menuButton.setAttribute('aria-expanded', 'false');
    headerContact.setAttribute('aria-hidden', 'true');
  };

  var showMenu = function() {
    header.classList.add('menu-active');
    pageOverlay.style.display = 'block';
    fade(pageOverlay, 0, 1, 200);
    menu.removeAttribute('aria-hidden');
    menuButton.setAttribute('aria-expanded', 'true');

    if (window.outerWidth <= bpHeaderSmall) {
      headerContact.removeAttribute('aria-hidden');
    }

    // Set focus on first link
    menu.children[0].children[0].children[0].focus();
  };

  // Handle button click event
  menuButton.addEventListener('click', function () {
    
    // If active...
    if (header.classList.contains('menu-active')) {
      hideMenu();
    } else {
      showMenu();
    }
  }, false);

  // Close header if clicked on overlay
  window.addEventListener('click', function(e){
    if (e.target == pageOverlay) {
      hideMenu();
    }
  }, false);

  // Handle header design differences when resizing
  var resizeMenu = debounce(function() {
    // Desktop
    if (window.outerWidth > bpHeaderSmall) {
      headerContact.setAttribute('aria-hidden', 'true');
      pageOverlay.style.display = 'none';
    // Mobile
    } else {
      if (header.classList.contains('menu-active')) {
        headerContact.removeAttribute('aria-hidden');
        pageOverlay.style.display = 'block';
      }
    }
  }, 100);

  window.addEventListener('resize', resizeMenu);

  /*
   *	=============================================
   *	MISC HELPERS
   *	=============================================
   */

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  // Fade in
  function fade(el, oldOpacity, newOpacity, timeLapse) {
    el.style.opacity = oldOpacity;
    var last = +new Date();
    var tick = function() {
      if (oldOpacity < newOpacity) {
        el.style.opacity = +el.style.opacity + (new Date() - last) / timeLapse;
        last = +new Date();
        if (+el.style.opacity < newOpacity) {
          (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
        }
      } else {
        el.style.opacity = +el.style.opacity - (new Date() - last) / timeLapse;
        last = +new Date();
        if (+el.style.opacity > newOpacity) {
          (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
        }
      }
    };
    tick();
  }

})(document, window);