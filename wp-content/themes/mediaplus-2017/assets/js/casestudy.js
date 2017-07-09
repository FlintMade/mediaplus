(function(document, window, undefined){
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

  var setRecentCS = function() {
    var recent = document.querySelector('.case-study--current'),
        recentID = recent.getAttribute('id').replace('cs-', ''),
        recentUrl = recent.getAttribute('data-fullurl'),
        currentLink = document.querySelector('.case-study-list .current'),
        sidebarLink = document.getElementById('link-' + recentID);

    if (currentLink === null || currentLink !== sidebarLink) {
      history.replaceState({}, 'foo', recentUrl);
      console.log(recentUrl);
      localStorage.setItem('recentPage', recentID);
      localStorage.setItem('recentUrl', recentUrl);

      if (currentLink) {
        currentLink.classList.remove('current');
      }

      sidebarLink.classList.add('current');
    }
  };

  setRecentCS();

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
   *	LOAD NEXT CASE STUDY
   *	---------------------------------------------
   */
  var scrollToNextCS = debounce(function() {
    var currentCS = document.querySelector('.case-study--current'),
        scrolledTo = window.scrollY + window.outerHeight;

    // Hide next link if one is already in view
    hideNextLink();

    if (scrolledTo >= document.body.clientHeight) {
      if (currentCS) {
        var currentID = currentCS.getAttribute('id').replace('cs-', ''),
          nextLink = document.getElementById('after-' + currentID);
          
        if (nextLink) {
          var nextID = nextLink.getAttribute('data-postid');

          // Pop up next link like a toast
          nextLink.classList.add('visible');

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
            },
            success: function(newPosts) {
              $('#flow').append(newPosts);
              setUpGalleries();
              setRecentCS();

              var currentCS = document.querySelector('.case-study--current');
              if (scrolledTo > (window.scrollY + currentCS.getBoundingClientRect().top + 400)) {
                console.log(currentCS.getBoundingClientRect().top);
                hideNextLink();
              }
            }
          });
        }
      }
    }
  }, 200);

  var hideNextLink = function(){
    var visibleLink =  document.querySelector('.next-case-study.visible');
    if (visibleLink !== null) {
      visibleLink.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', scrollToNextCS, false);

})(document, window);