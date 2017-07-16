'use strict';

/*
 *	=============================================
 *	MISC HELPERS
 *	=============================================
 */

// JS is available
document.documentElement.classList.remove('no-js');
document.documentElement.classList.add('js');

// Find ancestor
function findAncestor (el, cls) {
  while ((el = el.parentElement) && !el.classList.contains(cls));
  return el;
}

// Get offset of element relative to document, not window
function docOffset(el) {
  var rect = el.getBoundingClientRect(),
  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

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

/*
 *	=============================================
 *	HOOK UP GLOBAL SUBTLE CSS TRANSITIONS
 *	=============================================
 */
var afterLoadTiming = 200, /* Give user a little bit of time to cognitively recognize page load */
    pageBanner = document.querySelector('.page-banner__media');

// Fade in banner on page load
if (pageBanner) {
  setTimeout(function(){
    pageBanner.classList.add('animated');
  }, afterLoadTiming);
}

// Buoyant grid items
var bobInRows = function() {
  var scrolledTo = window.pageYOffset + window.innerHeight,
      buoyantRows = document.querySelectorAll('.buoyant-parent:not(.animated)');
  for (var i = 0; i < buoyantRows.length; i++) {
    var thisParent = buoyantRows[i],
        thisTop = thisParent.getBoundingClientRect().top;

    // If in view or page is scrolled to the bottom
    if (thisTop < window.innerHeight || scrolledTo >= document.body.clientHeight) {
      var theseKids = thisParent.querySelectorAll('.buoyant-kid:not(.animated)');

      // If there are buoyant cols inside the row, animate in one by one
      if (theseKids.length) {
        var kidsInView = [];

        // Reduce set to just those in view
        for (var k = 0; k < theseKids.length; k++) {
          var thisKid = theseKids[k],
              thisTop = thisKid.getBoundingClientRect().top;
          if (thisTop < window.innerHeight  || scrolledTo >= document.body.clientHeight) {
            kidsInView.push(thisKid);
          }
        }

        for (var n = 0; n < kidsInView.length; n++) {
          kidsInView[n].classList.add('animated');
        }

      // Otherwise animate the whole row
      } else {
        thisParent.classList.add('animated');
      }
    }
  }
};

// Add this buoyancy to all pages that don't have another event listener
if (!document.body.classList.contains('flow') && !document.body.classList.contains('blog')) {
  setTimeout(function(){
    bobInRows();
  }, 200);

  window.addEventListener('scroll', bobInRows, false);
  window.addEventListener('touchmove', bobInRows, false);
  window.addEventListener('touchend', bobInRows, false);
}

/*
 *	=============================================
 *	HEADER TOGGLE
 *	=============================================
 */

function supportedTransform() {
  var prefixes = 'transform WebkitTransform msTransform'.split(' ');
  var div = document.createElement('div');
  for (var i = 0; i < prefixes.length; i++) {
    if (div && div.style[prefixes[i]] !== undefined) {
      return true;
    }
  }
  return false;
}

// Only add header toggle functionality if transforms are supported
if (supportedTransform()) {
  // Vars
  var bpHeaderSmall = 800,
      header = document.querySelector('.header'),
      headerTray = document.querySelector('.header__tray'),
      headerTrayContent = document.querySelector('.header__tray-content'),
      menu = document.querySelector('.header__menu'),
      menuContents = document.getElementById('js-menu-contents'),
      headerContact = document.querySelector('.header__contact'),
      menuBtn = document.createElement('button'),
      headerOverlay = document.createElement('span');

  // Button properties
  menuBtn.classList.add('menu-toggle');
  menuBtn.setAttribute('id', 'js-menu-toggle');
  menuBtn.setAttribute('aria-label', 'Site menu');
  menuBtn.setAttribute('aria-controls', 'js-menu');
  menuBtn.innerHTML = '<svg class="menu-toggle__open" role="none" viewBox="0 0 33 33"><circle class="st0" fill="#E9E9E9" cx="16.5" cy="16.5" r="16"/><path class="st1" fill="#909090" d="M7 21.6h12.1v1.5H7zM7 17.7h19.1v1.5H7zM7 13.8h15.8v1.5H7zM7 9.9h19.1v1.5H7z"/></svg><svg class="menu-toggle__close" viewBox="0 0 33 33"><circle class="st0" fill="#E9E9E9" cx="16.5" cy="16.5" r="16"/><path class="st1" fill="#949494" d="M9.217 22.652L22.722 9.146l1.06 1.06-13.505 13.506z"/><path class="st1" fill="#949494" d="M9.217 10.348l1.06-1.06 13.506 13.505-1.06 1.06z"/></svg>';

  // Page overlay properties
  headerOverlay.classList.add('page-overlay');
  headerOverlay.classList.add('page-overlay--header');
  headerOverlay.setAttribute('role', 'none');

  // Menu properties
  menu.setAttribute('aria-labelledby', 'js-menu-toggle');

  // Hide menu on page load if mobile or in main flow
  if (window.outerWidth > bpHeaderSmall && !document.body.classList.contains('flow')) {
    menuBtn.setAttribute('aria-expanded', 'true');
    menu.removeAttribute('aria-hidden');
    header.classList.add('menu-active');
  } else {
    menuBtn.setAttribute('aria-expanded', 'false');
  }

  // Add button to page
  headerTray.insertBefore(menuBtn, headerTrayContent);
  headerTray.insertBefore(headerOverlay, headerTrayContent);

  var hideMenu = function() {
    var menuItems = menu.querySelectorAll('li.visible');
    for (var i = 0; i < menuItems.length; i++) {
      menuItems[i].classList.remove('visible');
    }

    if (window.outerWidth <= bpHeaderSmall || document.body.classList.contains('flow')) {
      header.classList.remove('menu-active');
      fade(headerOverlay, 1, 0, 200);
      setTimeout(function(){
        headerOverlay.style.display = 'none';
        headerOverlay.style.height = '0';
      }, 200);
      menu.setAttribute('aria-hidden', 'true');
      menuBtn.setAttribute('aria-expanded', 'false');
      headerContact.setAttribute('aria-hidden', 'true');
    } else {
      sendToFlow();
    }
  };

  var sendToFlow = function(e) {
    if (e) {
      e.preventDefault();
    }
    var recentPage = localStorage.getItem('recentPage');
    if (recentPage === 'home' || !recentPage) {
      window.location.href = '/';
    } else {
      var recentUrl = localStorage.getItem('recentUrl');
      window.location.href = recentUrl;
    }
  };

  var showMenu = function() {
    header.classList.add('menu-active');
    headerOverlay.style.display = 'block';
    fade(headerOverlay, 0, 1, 200);
    menu.removeAttribute('aria-hidden');
    menuBtn.setAttribute('aria-expanded', 'true');

    var menuItems = menu.querySelectorAll('li');
    setTimeout(function(){
      for (var i = 0; i < menuItems.length; i++) {
        var thisItem = menuItems[i],
            thisTiming = 400 * i;
        showMenuItem(thisItem, thisTiming);
      }
    }, 600);

    // Fade in contact info at the end
    var afterAll = 400 * (menuItems.length + 1);

    if (window.outerWidth <= bpHeaderSmall) {
      headerOverlay.style.height = '100%';

      setTimeout(function(){
        headerContact.removeAttribute('aria-hidden');
        fade(headerContact, 0, 1, 400);
      }, afterAll);
    }

    // Set focus on first link
    menu.children[0].children[0].children[0].focus();
  };

  var showMenuItem = function(thisItem, thisTiming) {
    setTimeout(function(){
      thisItem.classList.add('visible');
    }, thisTiming);
  };

  // Handle button click event
  menuBtn.addEventListener('click', function () {
    
    // If menu transitions not yet initialized
    if (!menu.classList.contains('anim-init')) {
      menu.classList.add('anim-init')
    }

    // If active...
    if (header.classList.contains('menu-active')) {
      hideMenu();
    } else {
      showMenu();
    }
  }, false);

  // Close header if clicked on overlay
  window.addEventListener('click', function(e){
    if (e.target == headerOverlay) {
      hideMenu();
    }
  }, false);

  // Handle header design differences when resizing
  var resizeMenu = debounce(function() {
    // Desktop
    if (window.outerWidth > bpHeaderSmall) {
      headerContact.setAttribute('aria-hidden', 'true');
      if (!document.body.classList.contains('flow')) {
        showMenu();
      }
    // Mobile 
    } else {
      if (header.classList.contains('menu-active')) {
        headerContact.removeAttribute('aria-hidden');
        var menuItems = menu.querySelectorAll('li');
        for (var i = 0; i < menuItems.length; i++) {
          menuItems[i].classList.add('visible');
        }
        headerContact.removeAttribute('aria-hidden');
        fade(headerContact, 0, 1, 400);
      }
    }
  }, 100);

  window.addEventListener('resize', resizeMenu);

// If transforms are not supported, show the nav
} else {

}

/*
 *	=============================================
 *	HEADER LOGO / SIDEBAR NAV
 *	=============================================
 */

/*
 *  ADD CSS ANIM TO HEADER LOGO ON HOVER
 *  Prevents @keyframes from blasting away the
 *  simple hover transition
 *  ----------------------------------------------
 */

var logoBtn = document.getElementById('logo-btn');

logoBtn.addEventListener('mouseenter', function(){
  logoBtn.classList.add('pulse');
}, false);

// Pause the animation, grab the current state, return the teaser to inital state
logoBtn.addEventListener('mouseleave', function(){
  logoBtn.classList.add('pause-pulse');
  
  var teaser = logoBtn.querySelector('.teaser'),
      teaserWidth = teaser.offsetWidth;

  teaser.style.width = teaserWidth + 'px';
  logoBtn.classList.remove('pause-pulse');
  logoBtn.classList.remove('pulse');
  setTimeout(function(){
    teaser.style.removeProperty('width');
  }, 100);
}, false);

/*
 *  LOGO BUTTON TAKES YOU BACK TO RECENT FLOW PAGE
 *  ----------------------------------------------
 */

if (!document.body.classList.contains('flow')) {
  logoBtn.addEventListener('click', sendToFlow, false);
}