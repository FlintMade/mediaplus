(function(document, window, undefined){
  'use strict';

  /*
   *	=============================================
   *	ABOUT PAGE
   *	=============================================
   */
  
  /*
   *  PEOPLE BIOS
   *	---------------------------------------------
   */

  // Person toggle functionality
  var toggleBio = function(e) {
    var btn = e.currentTarget,
        person = findAncestor(btn, 'person'),
        personName = btn.getAttribute('data-name'),
        bio = person.querySelector('.person__more');

    // Hide bio
    if (btn.getAttribute('aria-expanded') === 'true') {
      btn.setAttribute('aria-expanded', 'false');
      btn.innerHTML = '<span aria-label="View more info about ' + personName + '">More info+</span>';

      bio.setAttribute('aria-hidden', 'true');
      person.classList.remove('active');

    // Show bio
    } else {
      btn.setAttribute('aria-expanded', 'true');
      btn.innerHTML = '<span aria-label="Close ' + personName + '’s info">-Close info</span>';

      person.classList.add('active');

      setTimeout(function(){
        bio.removeAttribute('aria-hidden');
      }, 100);
    }
  };

  // ON LOAD

    // Hide bios
    var bios = document.querySelectorAll('.person__more');
    for (var i = 0; i < bios.length; i++) {
      bios[i].setAttribute('aria-hidden', 'true');
    }

    // Show toggle buttons and add functionality to them
    var toggleBtns = document.querySelectorAll('.person__toggle');
    for (var i = 0; i < toggleBtns.length; i++) {
      toggleBtns[i].style.display = 'block';
      toggleBtns[i].addEventListener('click', toggleBio, false);
    }

})(document, window);