(function(document, window, undefined){
  'use strict';

  /*
   *	=============================================
   *	CASE STUDIES
   *  single-expertise.php & single-offerings.php
   *	=============================================
   */

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

})(document, window);