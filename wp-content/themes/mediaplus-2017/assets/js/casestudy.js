'use strict';

/*
 *	=============================================
 *	CASE STUDIES
 *  single-expertise.php & single-offerings.php
 *	=============================================
 */

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
      currentLink.classList.remove('no-highlight');
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
var fetchTheCS = function(nextID, nextLink, currentCS, loaderValue, successFunction) {
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
      loaderValue.style.display = 'none';
      loaderValue.style.width = '0';
      loaderValue.style.display = 'block';
      $('#flow').append(newPosts);
      setUpGalleries();
      showNextLink(nextLink);

      if (successFunction) {
        if (successFunction == fadeReplaceCS) {
          fadeReplaceCS(currentCS);
        }
      }
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
    if (window.pageYOffset < lastScroll) {
      if ((thisTop + thisHeight - window.innerHeight / 3) >= 0) {
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

// Pop in link like a toast
var showNextLink = function(nextLink) {
  if (!nextLink.classList.contains('visible')) {
    var nextID = nextLink.getAttribute('data-postid');
    nextLink.classList.add('visible');

    // Link at end of case studies doesn't get this function
    if (nextID) {
      nextLink.addEventListener('click', clickToLoadCS, false);
    }
  }
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
      if (window.pageYOffset < lastScroll && spaceBelow > 1) {
        loaderValue.style.width = 0;
      }
    }
  }
};

/*
 *	SCROLL TO FADE IN
 *	---------------------------------------------
 */

// Unset as new if scrolled down far enough
var scrollToFadeIn = function() {
  var newCS = document.querySelector('.case-study--new');
  if (newCS) {
    if (newCS.getBoundingClientRect().top <= window.innerHeight * .75) {
      newCS.classList.remove('case-study--new');
      hideNextLink();
      resetCaseStudy();
    }
  }
};

/*
 *	SCROLL TO LOAD
 *	---------------------------------------------
 */

var scrollThruCS = debounce(function(scrolledTo, loaderValue) {
  var currentCS = document.querySelector('.case-study--current');
  resetCaseStudy();

  // If scrolling up
  if (window.pageYOffset < lastScroll) {
    // Hide the visible "next" link
    hideNextLink();

  // Scrolling down
  } else {    
    var newCS = document.querySelector('.case-study--new'),
        numCS = document.querySelectorAll('.case-study').length;

    // If new case study loaded
    if (newCS) {
      // Show the next link (might have been scrolled away) unless scrolled down far enough
      if (newCS.getBoundingClientRect().top > window.innerHeight - 100) {
        nextLink = newCS.previousElementSibling;
        if (nextLink) {
          showNextLink(nextLink);
        }
      }
    }
  
    // If reached the end of the document
    if (scrolledTo >= document.body.clientHeight - 50) {
      if (!newCS) {
        if (currentCS) {
          var currentID = currentCS.getAttribute('id').replace('cs-', ''),
              nextLink = document.getElementById('after-' + currentID),
              nextID = nextLink.getAttribute('data-postid');
          if (nextID) {
            // Ajax in a new case study
            fetchTheCS(nextID, nextLink, currentCS, loaderValue);
          } else {
            showNextLink(nextLink);
          }
        }
      }
    }

    // Set new scroll top
    lastScroll = window.pageYOffset;
  }
}, 200);

/*
 *	HOOK UP SCROLL EVENTS
 *	---------------------------------------------
 */

// These are separate because they need different intervals
var scrollEvents = function(){
  var scrolledTo = window.pageYOffset + window.innerHeight;
  animateLoader(scrolledTo, loaderValue);
  scrollToFadeIn();
  scrollThruCS(scrolledTo, loaderValue);
};

var attachScrollEvents = function() {
  window.addEventListener('scroll', scrollEvents, false);
  window.addEventListener('DOMMouseScroll', scrollEvents, false);
  window.addEventListener('touchend', scrollEvents, false);
};

var detachScrollEvents = function() {
  window.removeEventListener('scroll', scrollEvents, false);
  window.removeEventListener('DOMMouseScroll', scrollEvents, false);
  window.removeEventListener('touchend', scrollEvents, false);
};

if (document.body.classList.contains('single-case-study')) {
  attachScrollEvents();
}

/*
 *	CLICK TO LOAD
 *	---------------------------------------------
 */

// Visually load in next case study
var scrollToCS = function() {
  var nextLink = document.querySelector('.next-case-study.visible'),
      newCS = document.querySelector('.case-study--new'),
      currentTop = docOffset(newCS).top;

  detachScrollEvents();

  setTimeout(function(){
    newCS.classList.remove('case-study--new');
    newCS.scrollIntoView({behavior: 'smooth'});
    nextLink.removeEventListener('click', clickToLoadCS, false);
    hideNextLink();

    // Fade to case study
    setTimeout(function(){
      newCS.style.opacity = 1;
      attachScrollEvents();
    }, 400);
  }, 600);
};

var clickToLoadCS = function(e) {
  e.preventDefault();
  scrollToCS();
  resetCaseStudy();
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

  if (link.classList.contains('current')) {
    if (window.innerWidth < bpSidebarL) {
      closeSidebar();
      link.classList.remove('no-highlight');
    }
  } else {
    // Check to see if a new case study was previously loaded but not scrolled to
    var previouslyLoadedCS = flow.querySelector('.case-study--new');
    
    if (previouslyLoadedCS) {
      var previouslyLoadedID = currentCS.getAttribute('id').replace('cs-', ''),
          nextLink = document.getElementById('after-' + previouslyLoadedID);
      previouslyLoadedCS.parentNode.removeChild(previouslyLoadedCS);
      nextLink.parentNode.removeChild(nextLink);
    }
    
    // Ajax in new case study
    fetchTheCS(nextID, link, currentCS, loaderValue, fadeReplaceCS);

    if (window.innerWidth < bpSidebarL) {
      setTimeout(closeSidebar, 600);
    }

    attachScrollEvents();
  }
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