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
    menuBtn = document.createElement('button'),
    pageOverlay = document.createElement('span');

  // Button properties
  menuBtn.classList.add('menu-toggle');
  menuBtn.setAttribute('id', 'js-menu-toggle');
  menuBtn.setAttribute('aria-label', 'Site menu');
  menuBtn.setAttribute('aria-expanded', 'false');
  menuBtn.setAttribute('aria-controls', 'js-menu');
  menuBtn.innerHTML = '<svg class="menu-toggle__open" role="none"><use xlink:href="/wp-content/themes/mediaplus-2017/assets/images/sprite.svg#menu"/></svg><svg class="menu-toggle__close" role="none"><use xlink:href="/wp-content/themes/mediaplus-2017/assets/images/sprite.svg#x"/></svg>';

  // Page overlay properties
  pageOverlay.classList.add('page-overlay');
  pageOverlay.setAttribute('role', 'none');
  
  // Menu properties
  menu.setAttribute('aria-hidden', 'true');
  menu.setAttribute('aria-labelledby', 'menu-button');
  
  // Add button to page
  headerTray.insertBefore(menuBtn, headerTrayContent);
  headerTray.insertBefore(pageOverlay, headerTrayContent);

  var hideMenu = function() {
    header.classList.remove('menu-active');
    fade(pageOverlay, 1, 0, 200, function(){
      pageOverlay.style.display = 'block';
    });
    menu.setAttribute('aria-hidden', 'true');
    menuBtn.setAttribute('aria-expanded', 'false');
    headerContact.setAttribute('aria-hidden', 'true');
  };

  var showMenu = function() {
    header.classList.add('menu-active');
    pageOverlay.style.display = 'block';
    fade(pageOverlay, 0, 1, 200);
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
   *	CLIENTS PAGE
   *	=============================================
   */

  /*
   *  HOVER ON PROCESS / EXPERTISE TO LIGHT UP
   *  RELEVANT CLIENTS
   *	---------------------------------------------
   */

  var bizAttributesWrap = document.querySelector('.biz-attributes');

  if (bizAttributesWrap) {
    var bizAttributesLists = document.querySelectorAll('.biz-attributes ul'),
        bizAttributes = document.querySelectorAll('.biz-attributes li[data-attr-slug]');

    var lightUpClients = function(e) {
      var currentAttr = e.target.getAttribute('data-attr-slug');

      // Activate business attributes area
      bizAttributesWrap.classList.add('active');

      // Remove clients that might already be lit up
      var activeClients = document.querySelectorAll('.client.active');
      for (var i = 0; i < activeClients.length; i++) {
        activeClients[i].classList.remove('active');
      }

      // Light up related clients
      var clientDetailsLists = document.querySelectorAll('.client__details-list');
      for (var i = 0; i < clientDetailsLists.length; i++) {
        if (clientDetailsLists[i].getAttribute('data-clientAttr').indexOf(currentAttr) > -1) {
          findAncestor(clientDetailsLists[i], 'client').classList.add('active');
        }
      }
    };

    var resetClients = function(e) {
      // Deactivate biz attributes
      bizAttributesWrap.classList.remove('active');

      // Deactivate clients
      var activeClients = document.querySelectorAll('.client.active');
      for (var i = 0; i < activeClients.length; i++) {
        activeClients[i].classList.remove('active');
      }
    };

    for (var i = 0; i < bizAttributes.length; i++) {
      bizAttributes[i].addEventListener('mouseenter', lightUpClients, false);
    }

    for (var i = 0; i < bizAttributesLists.length; i++) {
      bizAttributesLists[i].addEventListener('mouseleave', resetClients, false);
    }
  }

  /*
   *  CLIENT ACCORDIONS
   *	---------------------------------------------
   */

  var clients = document.querySelectorAll('.client'),
      clientDetailsLists = document.querySelectorAll('.client__details-list');

  if (clients.length > 0) {
    var clientHeaders = document.querySelectorAll('.client__header');

    // Client details toggling functionality
    var toggleClient = function(e) {
      var btn = e.currentTarget,
          client = findAncestor(btn, 'client'),
          clientDetailsLists = client.querySelectorAll('.client__details-list');

      // Collapse client
      if (btn.getAttribute('aria-expanded') === 'true') {
        btn.setAttribute('aria-expanded', 'false');
        client.classList.remove('expanded');

        for (var i = 0; i < clientDetailsLists.length; i++) {
          var detailsList = clientDetailsLists[i];
          detailsList.style.height = detailsList.children[0].offsetHeight + 'px';
          for (var k = 1; k < detailsList.children.length; k++) {
            detailsList.children[k].style.display = 'none';
            detailsList.children[k].setAttribute('aria-hidden', 'true');
          }
        }

      // Expand client
      } else {
        btn.setAttribute('aria-expanded', 'true');
        client.classList.add('expanded');

        for (var i = 0; i < clientDetailsLists.length; i++) {
          var expandedHeight = 0;
          var detailsList = clientDetailsLists[i];
          for (var k = 0; k < detailsList.children.length; k++) {
            detailsList.children[k].style.display = 'block';
            detailsList.children[k].removeAttribute('aria-hidden');
            expandedHeight += detailsList.children[k].offsetHeight;
          }
          detailsList.style.height = expandedHeight + 'px';
        }
      }
    };

    // Show only the first process/expertise items for each client
    for (var i = 0; i < clientDetailsLists.length; i++) {
      var detailsList = clientDetailsLists[i];
      detailsList.style.height = detailsList.children[0].offsetHeight + 'px';
      for (var k = 1; k < detailsList.children.length; k++) {
        detailsList.children[k].style.display = 'none';
        detailsList.children[k].setAttribute('aria-hidden', 'true');
      }
    }

    // Show toggle buttons and add functionality to them
    var toggleBtns = document.querySelectorAll('.row-toggle');
    for (var i = 0; i < toggleBtns.length; i++) {
      toggleBtns[i].style.display = 'block';
      toggleBtns[i].addEventListener('click', toggleClient, false);
    }

    // Resize detail list heights on window resize
    var resizeDetailLists = debounce(function() {
      for (var i = 0; i < clientDetailsLists.length; i++) {
        var detailsList = clientDetailsLists[i],
            client = findAncestor(detailsList, 'client'),
            currentHeight = detailsList.style.height,
            listItems = detailsList.children;
        if (client.classList.contains('expanded')) {
          var expandedHeight = 0;
          for (var k = 0; k < listItems.length; k++) {
            expandedHeight += detailsList.children[k].offsetHeight;
          }
          if (currentHeight !== expandedHeight) {
            detailsList.style.height = expandedHeight + 'px';
          }
        } else {
          detailsList.style.height = listItems[0].offsetHeight + 'px';
        }
      }
    }, 100);

    window.addEventListener('resize', resizeDetailLists);
  }

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

  // Find ancestor
  function findAncestor (el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
  }

})(document, window);