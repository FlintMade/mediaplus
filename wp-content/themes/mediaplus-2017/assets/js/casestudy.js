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

if (document.body.classList.contains('single-expertise') && recent) {
  setRecentCS(recent);
}

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

/*
  *	SCROLL TO LOAD NEXT CASE STUDY
  *	---------------------------------------------
  */

var lastScroll = 0;

// Hide next link
var hideNextLink = function(){
  var visibleLink = document.querySelector('.next-case-study.visible');
  if (visibleLink !== null) {
    visibleLink.classList.remove('visible');
    visibleLink.removeEventListener('click', clickToLoadCS, false);
  }
};

// See which case study is in view and set it to current
var resetCaseStudy = function() {
  var caseStudies = document.querySelectorAll('.case-study');
  for (var i = 0; i < caseStudies.length; i++) {
    var thisTop = caseStudies[i].getBoundingClientRect().top,
        thisHeight = caseStudies[i].offsetHeight;

    // Scrolling up
    if (window.scrollY < lastScroll) {
      if ((thisTop + thisHeight - window.outerHeight / 2) >= 0) {
        setRecentCS(caseStudies[i]);
        break;
      }
    } else {
      if (thisTop > window.outerHeight / 4) {
        setRecentCS(caseStudies[i]);
        break;
      }
    }
  }
};

// Scroll to load and activate case studies
var scrollToNextCS = debounce(function(scrolledTo, loaderValue) {
  var currentCS = document.querySelector('.case-study--current');

  hideNextLink();
  resetCaseStudy();

  // Load next case study
  if (scrolledTo >= document.body.clientHeight) {
    if (currentCS) {
      var currentID = currentCS.getAttribute('id').replace('cs-', ''),
        nextLink = document.getElementById('after-' + currentID);
        
      if (nextLink) {
        var nextID = nextLink.getAttribute('data-postid');

        // Pop up next link like a toast
        nextLink.classList.add('visible');
        nextLink.addEventListener('click', clickToLoadCS, false);

        // Load the next case study
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
            loaderValue.style.width = '100%';
          },
          success: function(newPosts) {
            setTimeout(function(){
              loaderValue.style.display = 'none';
              loaderValue.style.width = '0';
              loaderValue.style.display = 'block';
              $('#flow').append(newPosts);
              setUpGalleries();
              resetCaseStudy();
            }, 200);
          }
        });
      }
    }
  }

  // Set new scroll top
  lastScroll = window.scrollY;
}, 200);

// Fade in next case study - needs to fire more often than scrollToNextCS
var fadeInNextCS = function() {
  var current = document.querySelector('.case-study--current:not(:first-child)');
  if (current) {
    if (!current.style.opacity || current.style.opacity < 1) {
      current.style.opacity = 1 - ((current.getBoundingClientRect().top / window.outerHeight) * 1.25);
    }
  }
};

// Animate fake loading bar
var animateLoader = function(scrolledTo, loaderValue) {
  var current = document.querySelector('.case-study--current');
  if (current) {
    var currentID = current.getAttribute('id').replace('cs-', ''),
        nextLink = document.getElementById('after-' + currentID),
        currentBottom = current.getBoundingClientRect().top + current.offsetHeight,
        spaceBelow = ((document.body.clientHeight - scrolledTo) * 1.5) / window.outerHeight;
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

var scrollEvents = function() {
  var scrolledTo = window.scrollY + window.outerHeight,
      loaderValue = document.getElementById('loader-value');
  console.log(scrolledTo, document.body.clientHeight);
  animateLoader(scrolledTo, loaderValue);
  scrollToNextCS(scrolledTo, loaderValue);
  fadeInNextCS();
};

window.addEventListener('scroll', scrollEvents, false);

/*
  *	CLICK TO LOAD NEXT CASE STUDY
  *	---------------------------------------------
  */

var clickToLoadCS = function(e) {
  e.preventDefault();
  var nextLink = e.currentTarget,
      current = document.querySelector('.case-study--current'),
      currentTop = docOffset(current).top;

  window.removeEventListener('scroll', scrollEvents, false);
  nextLink.style.height = '100%';
  nextLink.querySelector('.arrow').style.opacity = 0;

  // After grow
  setTimeout(function(){
    window.scrollTo(0, currentTop - 50);
    nextLink.style.opacity = 0;

    // Fade to case study
    setTimeout(function(){
      current.style.opacity = 1;
      window.addEventListener('scroll', scrollEvents, false);
    }, 400);
  }, 600);
};