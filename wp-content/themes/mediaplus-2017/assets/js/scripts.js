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
  menuBtn = document.createElement('button'),
  headerOverlay = document.createElement('span');

// Button properties
menuBtn.classList.add('menu-toggle');
menuBtn.setAttribute('id', 'js-menu-toggle');
menuBtn.setAttribute('aria-label', 'Site menu');
menuBtn.setAttribute('aria-expanded', 'false');
menuBtn.setAttribute('aria-controls', 'js-menu');
menuBtn.innerHTML = '<svg class="menu-toggle__open" role="none"><use xlink:href="/wp-content/themes/mediaplus-2017/assets/images/sprite.svg#menu"/></svg><svg class="menu-toggle__close" role="none"><use xlink:href="/wp-content/themes/mediaplus-2017/assets/images/sprite.svg#x"/></svg>';

// Page overlay properties
headerOverlay.classList.add('page-overlay');
headerOverlay.classList.add('page-overlay--header');
headerOverlay.setAttribute('role', 'none');

// Menu properties
menu.setAttribute('aria-hidden', 'true');
menu.setAttribute('aria-labelledby', 'menu-button');

// Add button to page
headerTray.insertBefore(menuBtn, headerTrayContent);
headerTray.insertBefore(headerOverlay, headerTrayContent);

var hideMenu = function() {
  header.classList.remove('menu-active');
  fade(headerOverlay, 1, 0, 200, function(){
    headerOverlay.style.display = 'block';
  });
  menu.setAttribute('aria-hidden', 'true');
  menuBtn.setAttribute('aria-expanded', 'false');
  headerContact.setAttribute('aria-hidden', 'true');
};

var showMenu = function() {
  header.classList.add('menu-active');
  headerOverlay.style.display = 'block';
  fade(headerOverlay, 0, 1, 200);
  menu.removeAttribute('aria-hidden');
  menuBtn.setAttribute('aria-expanded', 'true');

  if (window.outerWidth <= bpHeaderSmall) {
    headerContact.removeAttribute('aria-hidden');
  }

  // Set focus on first link
  menu.children[0].children[0].children[0].focus();
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
  // Mobile 
  } else {
    if (header.classList.contains('menu-active')) {
      headerContact.removeAttribute('aria-hidden');
    }
  }
}, 100);

window.addEventListener('resize', resizeMenu);

/*
  *	=============================================
  *	SIDEBAR NAV
  *	=============================================
  */

var bpSidebarM = 901,
    bpSidebarL = 1101,
    sidebarBtn = document.getElementById('sidebar-toggle'),
    logoTextWrap = sidebarBtn.querySelector('.logo__text-wrap'),
    sidebar = document.getElementById('sidebar-nav'),
    sidebarContent = sidebar.querySelector('.site-sidebar__content'),
    navOverlay = document.createElement('span');

/*
  *  TOGGLE SIDEBAR
  *	---------------------------------------------
  */

// Nav overlay properties
navOverlay.classList.add('page-overlay');
navOverlay.classList.add('page-overlay--nav');
navOverlay.setAttribute('role', 'none');
document.body.insertBefore(navOverlay, sidebar);

/* Toggle sidebar nav */
var openSidebar = function() {
  sidebar.classList.remove('closed');
  sidebarBtn.setAttribute('aria-expanded', 'true');
  logoTextWrap.classList.add('abbreviated');

  // Stagger CSS transitions
  setTimeout(function(){
    sidebar.removeAttribute('aria-hidden');
    navOverlay.style.display = 'block';
    fade(navOverlay, 0, 1, 200);

    setTimeout(function(){
      sidebarContent.classList.add('active');
    }, 300);
  }, 200);
};

var closeSidebar = function() {
  sidebarBtn.setAttribute('aria-expanded', 'false');
  sidebarContent.classList.remove('active');
  
  // Stagger CSS transitions
  setTimeout(function(){
    sidebar.setAttribute('aria-hidden', 'true');
    fade(navOverlay, 1, 0, 200);

    setTimeout(function(){
      navOverlay.style.display = 'none';
    }, 200);

    setTimeout(function(){
      if (!document.body.classList.contains('single-expertise')) {
        logoTextWrap.classList.remove('abbreviated');
      }
    }, 200);
  }, 100);

  setTimeout(function(){
    sidebar.classList.add('closed');
  }, 800);
};

var toggleSidebar = function() {
  sidebar.classList.remove('tease');
  if (sidebar.getAttribute('aria-hidden') == 'true') {
    openSidebar();
  } else {
    closeSidebar();
  }
};

var resizeSidebar = debounce(function() {
  if (window.outerWidth >= bpSidebarL) {
    openSidebar();
  } else {
    closeSidebar();
  }
}, 400);

var teaseSidebar = debounce(function(e) {
  if (sidebar.getAttribute('aria-hidden') == 'true') {
    if (e.clientX < 400) {
      sidebar.classList.remove('closed');
      sidebar.classList.add('tease');
      sidebar.addEventListener('click', toggleSidebar, false);
    } else {
      sidebar.classList.remove('tease');
      setTimeout(function(){
        sidebar.classList.add('closed');
        sidebar.removeEventListener('click', toggleSidebar, false);
      }, 400);
    }
  }
}, 100);

// ON LOAD

  // Hook up sidebar button
  sidebarBtn.addEventListener('click', toggleSidebar, false);

  if (document.body.classList.contains('single-expertise')) {
    // Persist sidebar on case study pages
    resizeSidebar();
    window.addEventListener('resize', resizeSidebar);
  } else {
    // Clicking overlay closes sidebar
    navOverlay.addEventListener('click', closeSidebar, false);

    // Tease sidebar on hover, but not on home
    if (window.outerWidth >= bpSidebarL && !document.body.classList.contains('home')) {
      window.addEventListener('mousemove', teaseSidebar, false);
    }
  }