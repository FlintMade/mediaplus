'use strict';

/*
 *	=============================================
 *	MISC HELPERS
 *	=============================================
 */

// JS is available
document.documentElement.classList.remove('no-js');

// Find ancestor
function findAncestor (el, cls) {
  while ((el = el.parentElement) && !el.classList.contains(cls));
  return el;
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
    pageBanner = document.querySelector('.page-banner');

/* Fade in banner on page load */
if (pageBanner) {
  setTimeout(function(){
    pageBanner.classList.add('animated');
  }, afterLoadTiming);
}

/*
 *	=============================================
 *	HEADER TOGGLE
 *	=============================================
 */

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
menu.setAttribute('aria-labelledby', 'menu-button');

// Hide menu on page load if mobile or in main flow
if (window.outerWidth <= bpHeaderSmall || document.body.classList.contains('flow')) {
  menuBtn.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-hidden', 'true');
  header.classList.remove('menu-active');
} else {
  menuBtn.setAttribute('aria-expanded', 'true');
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
    fade(headerOverlay, 1, 0, 200, function(){
      headerOverlay.style.display = 'block';
    });
    menu.setAttribute('aria-hidden', 'true');
    menuBtn.setAttribute('aria-expanded', 'false');
    headerContact.setAttribute('aria-hidden', 'true');
  } else {
    sendToFlow();
  }
};

var sendToFlow = function() {
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

  if (window.outerWidth <= bpHeaderSmall) {
    var menuItems = menu.querySelectorAll('li');
    headerContact.removeAttribute('aria-hidden');
    setTimeout(function(){
      for (var i = 0; i < menuItems.length; i++) {
        var thisItem = menuItems[i],
            thisTiming = 400 * i;
        showMenuItem(thisItem, thisTiming);
      }
    }, 400);
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
    }
  }
}, 100);

window.addEventListener('resize', resizeMenu);

/*
 *	=============================================
 *	SIDEBAR NAV
 *	=============================================
 */

/*
 *  LOGO BUTTON TAKES YOU BACK TO RECENT FLOW PAGE
 *  ----------------------------------------------
 */

var logoBtn = document.getElementById('logo-btn');
logoBtn.addEventListener('click', sendToFlow, false);

/*
 *  SIDEBAR FUNCTIONALITY ON FLOW PAGES
 *  (Home and case studies)
 *  ---------------------------------------------
 */

var sidebar = document.getElementById('sidebar-nav');

if (sidebar) {
  var bpSidebarM = 901,
      bpSidebarL = 1101,
      logoTextWrap = logoBtn.querySelector('.logo__text-wrap'),
      sidebar = document.getElementById('sidebar-nav'),
      sidebarContent = sidebar.querySelector('.site-sidebar__content');

  /* Toggle sidebar nav */
  var openSidebar = function() {
    sidebar.classList.remove('closed');
    logoTextWrap.classList.add('abbreviated');

    // Stagger CSS transitions
    setTimeout(function(){
      sidebar.removeAttribute('aria-hidden');
      setTimeout(function(){
        sidebarContent.classList.add('active');
      }, 600);
    }, 200);
  };

  var closeSidebar = function() {
    sidebarContent.classList.remove('active');
    
    // Stagger CSS transitions
    setTimeout(function(){
      sidebar.setAttribute('aria-hidden', 'true');
    }, 100);

    setTimeout(function(){
      sidebar.classList.add('closed');
    }, 800);
  };

  var resizeSidebar = debounce(function() {
    if (window.outerWidth >= bpSidebarL) {
      openSidebar();
    } else {
      closeSidebar();
    }
  }, 400);

  // Hook up the functions
  if (!document.body.classList.contains('home')) {
    resizeSidebar();
  }
  //window.addEventListener('resize', resizeSidebar);
}