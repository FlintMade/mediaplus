(function(document, window, undefined){
  'use strict';

  /*
   *	=============================================
   *	CLIENTS PAGE
   *	=============================================
   */

  /*
   *	HELPER FUNCTIONS
   *	---------------------------------------------
   */

  // Find ancestor
  function findAncestor (el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
  }

  // Check for media query support
  function mediaQueriesSupported() {
    return (typeof window.matchMedia != "undefined" || typeof window.msMatchMedia != "undefined");
  }

  /*
   *  CLICK ON PROCESS / EXPERTISE TO LIGHT UP
   *  RELEVANT CLIENTS
   *	---------------------------------------------
   */

  var bizAttributesWrap = document.querySelector('.biz-attributes'),
      bizAttributesLists = document.querySelectorAll('.biz-attributes ul'),
      bizAttributes = document.querySelectorAll('.biz-attributes li[data-attr-slug]');

  var filterClients = function(e) {
    var currentAttr = e.target.getAttribute('data-attr-slug');

    // Deselect this filter
    if (e.target.classList.contains('current')) {
      resetClients();
      bizAttributesWrap.classList.remove('filtered');
      e.target.classList.remove('current');

    // Select this filter
    } else {
      resetClients();
      bizAttributesWrap.classList.add('filtered');
      
      var currentlyCurrent = bizAttributesWrap.querySelector('.current');
      if (currentlyCurrent) {
        currentlyCurrent.classList.remove('current');
      }
      e.target.classList.add('current');

      // Light up related clients
      var detailsSections = document.querySelectorAll('.client__details-section');
      for (var i = 0; i < detailsSections.length; i++) {
        if (detailsSections[i].getAttribute('data-clientAttr').indexOf(currentAttr) > -1) {
          findAncestor(detailsSections[i], 'client').classList.add('filtered');
        }
      }
    }
  };

  // Deactivate clients
  var resetClients = function(e) {
    var activeClients = document.querySelectorAll('.client.filtered');
    for (var i = 0; i < activeClients.length; i++) {
      activeClients[i].classList.remove('filtered');
    }
  };

  // Attach functionality to biz attributes
  for (var i = 0; i < bizAttributes.length; i++) {
    bizAttributes[i].addEventListener('click', filterClients, false);
  }

  // Activate business attributes area
  for (var i = 0; i < bizAttributesLists.length; i++) {
    var thisList = bizAttributesLists[i];

    thisList.addEventListener('mouseenter', function(){
      bizAttributesWrap.classList.add('active');
    }, false);

    thisList.addEventListener('mouseleave', function(){
      bizAttributesWrap.classList.remove('active');
    }, false);
  }

  /*
   *  CLIENT ACCORDIONS
   *	---------------------------------------------
   */

  /* These scripts depend on media query styles. Old browsers will just get a version
   * of the page without the accordions, all content available. */
  if (mediaQueriesSupported()) {
    var bpClientRow = 1200,
        clients = document.querySelectorAll('.client'),
        clientDetails = document.querySelectorAll('.client__details');
    
    // Toggle functionality
    var toggleClient = function(e) {
      var btn = e.currentTarget,
          client = findAncestor(btn, 'client'),
          clientDetails = client.querySelector('.client__details'),
          moreLink = client.querySelector('.more-link');

      // Collapse client
      if (btn.getAttribute('aria-expanded') === 'true') {
        btn.setAttribute('aria-expanded', 'false');
        client.classList.remove('expanded');
        collapsedSizing(clientDetails);
        clientDetails.setAttribute('aria-hidden', true);

        if (moreLink) {
          moreLink.setAttribute('tabindex', '-1');
        }

      // Expand client
      } else {
        btn.setAttribute('aria-expanded', 'true');
        client.classList.add('expanded');
        expandedSizing(clientDetails);
        clientDetails.removeAttribute('aria-hidden');

        if (moreLink) {
          moreLink.removeAttribute('tabindex');
        }
      }
    };

    // Sizing functions
    var collapsedSizing = function(theseDetails) {
      if (window.outerWidth <= bpClientRow) {
        theseDetails.style.height = 0;
      } else {
        var theseDetailLists = theseDetails.querySelectorAll('.client__details-list li:first-child'),
            newHeight = 0;
        for (var k = 0; k < theseDetailLists.length; k++) {
          if (newHeight < theseDetailLists[k].offsetHeight) {
            newHeight = theseDetailLists[k].offsetHeight;
          }
        }
        theseDetails.style.height = newHeight + 'px';
      }
    };

    var expandedSizing = function(theseDetails) {
      theseDetails.style.height = theseDetails.querySelector('.client__details-interior').offsetHeight + 'px';
    };

    // ON LOAD

      // Show toggle buttons and add functionality to them
      var toggleBtns = document.querySelectorAll('.row-toggle');
      for (var i = 0; i < toggleBtns.length; i++) {
        toggleBtns[i].style.display = 'block';
        toggleBtns[i].addEventListener('click', toggleClient, false);
      }

      // Collapse clients
      for (var i = 0; i < clientDetails.length; i++) {
        var theseDetails = clientDetails[i];
        var moreLink = theseDetails.querySelector('.more-link');
        theseDetails.setAttribute('aria-hidden', true);
        if (moreLink) {
          moreLink.setAttribute('tabindex', '-1');
        }
        collapsedSizing(theseDetails);
      }

    // ON RESIZE
      var resizeClientDetails = function(){
        for (var i = 0; i < clientDetails.length; i++) {
          var theseDetails = clientDetails[i],
              client = findAncestor(theseDetails, 'client');
          if (client.classList.contains('expanded')) {
            expandedSizing(theseDetails);
          } else {
            collapsedSizing(theseDetails);
          }
        }
      };

      window.addEventListener('resize', resizeClientDetails);
  }

})(document, window);