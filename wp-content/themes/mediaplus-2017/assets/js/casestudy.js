'use strict';

/*
 *	=============================================
 *	CASE STUDIES
 *  single-expertise.php & single-offerings.php
 *	=============================================
 */

/*
 *  HELPER FUNCTIONS
 *	---------------------------------------------
 */

// Get offset of element relative to document, not window
function docOffset(el) {
  var rect = el.getBoundingClientRect(),
  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

/*
 *  SET RECENT PAGE
 *  Remember as last "case study flow" page
 *	---------------------------------------------
 */

var recent = document.querySelector('.case-study--current');

var setRecentCS = function(recent) {
  var recentID = recent.getAttribute('id').replace('cs-', ''),
      recentUrl = recent.getAttribute('data-fullurl'),
      currentLink = document.querySelector('.case-study-list .current'),
      sidebarLink = document.getElementById('link-' + recentID);

  if (currentLink === null || currentLink !== sidebarLink) {
    history.replaceState({}, 'foo', recentUrl);
    localStorage.setItem('recentPage', recentID);
    localStorage.setItem('recentUrl', recentUrl);

    if (currentLink) {
      currentLink.classList.remove('current');
    }

    sidebarLink.classList.add('current');
  }
};

if (document.body.classList.contains('single-case-study') && recent) {
  setRecentCS(recent);
  document.querySelector('.case-study--new').classList.remove('case-study--new');
}

/*
 *	LOAD NEW CASE STUDIES
 *	=============================================
 */

var lastScroll = 0,
    loaderValue = document.getElementById('loader-value');

/*
 *	SHARED FUNCTIONS
 *	---------------------------------------------
 */

// Ajax case study
var fetchTheCS = function(nextID, currentCS, loaderValue, successFunction) {
  $.ajax({
    url: loadNextCaseStudy.ajaxurl,
    type: 'post',
    data: {
      action: 'next_case_study',
      query_vars: loadNextCaseStudy.query_vars,
      p: nextID
    },
    beforeSend: function() {
      currentCS.classList.remove('case-study--current');
      if (parseInt(loaderValue.style.width) < 90) {
        loaderValue.style.width = '90%';
      }
    },
    success: function(newPosts) {
      loaderValue.style.width = '100%';
      setTimeout(function(){
        loaderValue.style.display = 'none';
        loaderValue.style.width = '0';
        loaderValue.style.display = 'block';
        $('#flow').append(newPosts);
        setUpGalleries();

        if (successFunction) {
          if (successFunction == fadeReplaceCS) {
            fadeReplaceCS(currentCS);
          }
        } else {
          resetCaseStudy();
        }
      }, 200);
    }
  });
};

// See which case study is in view and set it to current
var resetCaseStudy = function() {
  var caseStudies = document.querySelectorAll('.case-study');
  for (var i = 0; i < caseStudies.length; i++) {
    var thisTop = caseStudies[i].getBoundingClientRect().top,
        thisHeight = caseStudies[i].offsetHeight;

    // Scrolling up
    if (window.scrollY < lastScroll) {
      if ((thisTop + thisHeight - window.innerHeight / 2) >= 0) {
        setRecentCS(caseStudies[i]);
        break;
      }
    } else {
      if (thisTop > window.innerHeight / 4) {
        setRecentCS(caseStudies[i]);
        break;
      }
    }
  }
};

// Hide next link
var hideNextLink = function(){
  var visibleLink = document.querySelector('.next-case-study.visible');
  if (visibleLink !== null) {
    visibleLink.classList.remove('visible');
    visibleLink.removeEventListener('click', clickToLoadCS, false);
  }
};

// Visually load in next case study
var slideUpCS = function() {
  var nextLink = document.querySelector('.next-case-study.visible'),
      newCS = document.querySelector('.case-study--new'),
      currentTop = docOffset(newCS).top;

  // Grow link to fill screen
  detachScrollEvents();
  nextLink.style.height = '100%';
  nextLink.querySelector('.arrow').style.opacity = 0;

  // After grow
  setTimeout(function(){
    newCS.classList.remove('case-study--new');
    window.scrollTo(0, currentTop - 50);
    nextLink.style.opacity = 0;
    nextLink.classList.remove('visible');
    nextLink.removeEventListener('click', clickToLoadCS, false);

    // Fade to case study
    setTimeout(function(){
      nextLink.style.height = 0;
      newCS.style.opacity = 1;
      attachScrollEvents();
    }, 400);
  }, 600);
};

/*
 *	ANIMATE FAKE LOADING BAR
 *	---------------------------------------------
 */

var animateLoader = function(scrolledTo, loaderValue) {
  var currentCS = document.querySelector('.case-study--current');
  if (currentCS && !currentCS.classList.contains('case-study--new')) {
    var currentID = currentCS.getAttribute('id').replace('cs-', ''),
        nextLink = document.getElementById('after-' + currentID),
        currentBottom = currentCS.getBoundingClientRect().top + currentCS.offsetHeight,
        spaceBelow = ((document.body.clientHeight - scrolledTo) * 1.5) / window.innerHeight;
    if (nextLink && spaceBelow > 0 && spaceBelow <= 1) {
      loaderValue.style.width = (1 - spaceBelow) * 100 + '%';
    } else {
      // Scrolling up
      if (window.scrollY < lastScroll && spaceBelow > 1) {
        loaderValue.style.width = 0;
      }
    }
  }
};

/*
 *	SCROLL TO LOAD
 *	---------------------------------------------
 */

var scrollThruCS = debounce(function(scrolledTo, loaderValue) {
  var currentCS = document.querySelector('.case-study--current');

  // Reset recent case study
  resetCaseStudy();

  // If scrolling up
  if (window.scrollY < lastScroll) {
    // Hide the visible "next" link
    hideNextLink();

  // Scrolling down
} else {    
    // If new case study loaded
    var newCS = document.querySelector('.case-study--new');
  
    // If reached the end of the document
    if (scrolledTo >= document.body.clientHeight) {
      if (newCS) {
        slideUpCS();
      } else {
        if (currentCS) {
          var currentID = currentCS.getAttribute('id').replace('cs-', ''),
              nextLink = document.getElementById('after-' + currentID);
          if (nextLink) {
            // Pop up next link like a toast
            if (!nextLink.classList.contains('visible')) {
              var nextID = nextLink.getAttribute('data-postid');
              nextLink.classList.add('visible');
              nextLink.addEventListener('click', clickToLoadCS, false);
            }

            // Ajax in a new case study
            fetchTheCS(nextID, currentCS, loaderValue);
          }
        }
      }
    }

    // Set new scroll top
    lastScroll = window.scrollY;
  }
}, 200);

/*
 *	HOOK UP SCROLL EVENTS
 *	---------------------------------------------
 */

// These are separate because they need different intervals
var scrollEvents = function(){
  var scrolledTo = window.scrollY + window.innerHeight;
  animateLoader(scrolledTo, loaderValue);
  scrollThruCS(scrolledTo, loaderValue);
};

var attachScrollEvents = function() {
  window.addEventListener('scroll', scrollEvents, false);
  window.addEventListener('touchmove', scrollEvents, false);
  window.addEventListener('touchend', scrollEvents, false);
};

var detachScrollEvents = function() {
  window.removeEventListener('scroll', scrollEvents, false);
  window.removeEventListener('touchmove', scrollEvents, false);
  window.removeEventListener('touchend', scrollEvents, false);
};

if (document.body.classList.contains('single-case-study')) {
  attachScrollEvents();
}

/*
 *	CLICK TO LOAD
 *	---------------------------------------------
 */

var clickToLoadCS = function(e) {
  e.preventDefault();

  // Swipe up the next link and then fade in the case study
  slideUpCS();
};

/*
 *	LOAD NEW FROM SIDEBAR
 *	---------------------------------------------
 */

var navigateNewCS = function(e) {
  e.preventDefault();
  detachScrollEvents();

  var link = e.currentTarget,
      nextID = link.getAttribute('id').replace('link-', ''),
      currentCS = document.querySelector('.case-study--current');
  
  // Ajax in new case study
  fetchTheCS(nextID, currentCS, loaderValue, fadeReplaceCS);
  attachScrollEvents();
};

// Do the actual replacement of current CS => new CS
var fadeReplaceCS = function(currentCS) {
  var flow = document.getElementById('flow'),
      caseStudies = flow.querySelectorAll('.case-study:not(.case-study--new)'),
      newCS = document.querySelector('.case-study--new'),
      currentTop = docOffset(newCS).top;

  // Fade out flow to hide processes
  fade(flow, 1, 0, 400);

  setTimeout(function(){
    window.scrollTo(0, 0);

    // Remove all the other case studies
    for (var i = 0; i < caseStudies.length; i++) {
      var thisCS = caseStudies[i],
          thisID = thisCS.getAttribute('id').replace('cs-', ''),
          nextLink = document.getElementById('after-' + thisID);
      if (nextLink) {
        thisCS.parentNode.removeChild(nextLink);
      }
      thisCS.parentNode.removeChild(thisCS);
    }

    // Fade in the new one + flow
    fade(flow, 0, 1, 100);
    newCS.classList.remove('case-study--new');
    newCS.style.opacity = 1;
    setRecentCS(newCS);
    lastScroll = 0;
  }, 400);
};

var sidebarNavLinks = document.querySelectorAll('.case-study-list a');
for (var i = 0; i < sidebarNavLinks.length; i++) {
  sidebarNavLinks[i].addEventListener('click', navigateNewCS, false);
}

/*
 *	CASE STUDY SECTIONS
 *	=============================================
 */

/*
 *	SECTION: GALLERY
 *	---------------------------------------------
 */

/* Advance slide */
var advanceSlide = function(e) {
  var gallery = findAncestor(e.currentTarget, 'gallery'),
      currentSlide = gallery.querySelector('.current'),
      labelIndex = gallery.querySelector('.gallery__index');
  
  /* Next slide */
  if (e.currentTarget.classList.contains('gallery__next')) {
    if (currentSlide.nextElementSibling) {
      var newSlide = currentSlide.nextElementSibling;
    } else {
      var newSlide = gallery.querySelector('.slide:first-child');
    }

  /* Previous slide */
  } else {
    if (currentSlide.previousElementSibling) {
      var newSlide = currentSlide.previousElementSibling;
    } else {
      var newSlide = gallery.querySelector('.slide:last-child');
    }
  }
    
  currentSlide.classList.remove('current');
  currentSlide.setAttribute('aria-hidden', 'true');

  newSlide.classList.add('current');
  newSlide.removeAttribute('aria-hidden');
  labelIndex.innerText = newSlide.getAttribute('data-slideIndex');
};

/* Set up galleries */
var setUpGalleries = function() {
  var galleries = document.querySelectorAll('.gallery');
  for (var i = 0; i < galleries.length; i++) {
    var gallery = galleries[i];
    if (gallery.querySelectorAll('.slide').length > 1) {
      var prev = gallery.querySelector('.gallery__prev'),
          next = gallery.querySelector('.gallery__next'),
          label = gallery.querySelector('.gallery__label');

      prev.removeAttribute('aria-hidden');
      prev.removeAttribute('tabindex');
      prev.addEventListener('click', advanceSlide, false);

      next.removeAttribute('aria-hidden');
      next.removeAttribute('tabindex');
      next.addEventListener('click', advanceSlide, false);

      label.removeAttribute('aria-hidden');
      label.setAttribute('aria-live', 'polite');
      label.setAttribute('aria-atomic', 'true');

      gallery.classList.remove('initial');
    }
  }
};

setUpGalleries();

/*
 *	SECTION: LISTS
 *	---------------------------------------------
 */

/* Toggle lists */
var toggleLists = function(e) {
  var btn = e.currentTarget,
      listsSection = findAncestor(btn, 'row--lists'),
      listsWrap = listsSection.querySelector('.lists-wrapper'),
      lists = listsSection.querySelectorAll('ul'); 

  // Collapse lists
  if (btn.getAttribute('aria-expanded') === 'true') {
    btn.innerText = 'View all+';
    btn.setAttribute('aria-expanded', 'false');
    listsWrap.setAttribute('aria-hidden', true);
    listsWrap.classList.remove('expanded');
    listsWrap.removeAttribute('tabindex');

  // Expand lists
  } else {
    btn.innerText = 'View less';
    btn.setAttribute('aria-expanded', 'true');
    listsWrap.removeAttribute('aria-hidden');
    listsWrap.classList.add('expanded');
    listsWrap.setAttribute('tabindex', '0');
    listsWrap.focus();
  }

  for (var i = 0; i < lists.length; i++) {
    resizeList(lists[i]);
  }
};

/* Resize lists */
var resizeList = function(list) {
  var newHeight = 0,
      listChildren = list.children;
  for (var i = 0; i < listChildren.length; i++) {
    newHeight += listChildren[i].offsetHeight;
  }
  list.style.height = newHeight + 'px';
};

/* Show toggle buttons if the lists are long enough */
var listsSections = document.querySelectorAll('.row--lists');
for (var i = 0; i < listsSections.length; i++) {
  var lists = listsSections[i].querySelectorAll('ul'),
      long = false,
      button = listsSections[i].querySelector('.toggle-lists'),
      listsWrap = listsSections[i].querySelector('.lists-wrapper');
  for (var k = 0; k < lists.length; k++) {
    if (lists[k].childNodes.length > 6) {
      long = true;
    }
  }
  if (long === true) {
    listsWrap.classList.remove('expanded');
    button.style.display = 'block';
    button.removeAttribute('aria-hidden');
    button.addEventListener('click', toggleLists, false);
  }

  for (var k = 0; k < lists.length; k++) {
    resizeList(lists[k]);
  }
}

/* Resize lists on window resize */
window.addEventListener('resize', function(){
  var lists = document.querySelectorAll('.row--lists ul');
  for (var i = 0; i < lists.length; i++) {
    resizeList(lists[i]);
  }
});