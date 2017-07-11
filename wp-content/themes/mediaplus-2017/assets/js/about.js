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
        initialInfo = person.querySelector('.person__initial'),
        bio = person.querySelector('.person__more');

    if (btn.getAttribute('aria-expanded') === 'true') {
      hideBio(btn, person, personName, initialInfo, bio);
    } else {
      // First hide any other bios that might be shown
      var shownBios = document.querySelectorAll('.person__more:not([aria-hidden="true"])');
      for (var i = 0; i < shownBios.length; i++) {
        var shownBio = shownBios[i],
            shownPerson = findAncestor(shownBio, 'person'),
            shownBtn = shownPerson.querySelector('.person__toggle'),
            shownPersonName = shownBtn.getAttribute('data-name'),
            shownInitialInfo = shownPerson.querySelector('.person__initial');
        hideBio(shownBtn, shownPerson, shownPersonName, shownInitialInfo, shownBio);
      }

      // Show new one after shown bios are halfway closed
      if (shownBios.length > 0) {
        setTimeout(function(){
          showBio(btn, person, personName, initialInfo, bio);
        }, 450);
      } else {
        showBio(btn, person, personName, initialInfo, bio);
      }
    }
  };

  // Hide bio
  var hideBio = function(btn, person, personName, initialInfo, bio) {
    // Hide bio and initial
    initialInfo.style.opacity = '0';
    bio.setAttribute('aria-hidden', 'true');

    // Timeout allows for bio CSS transition
    setTimeout(function(){
      person.classList.remove('slidUp');
      
      // Timeout allows for .person:before CSS transition
      setTimeout(function() {
        // Fade in initial info
        initialInfo.style.opacity = '1';

        // Toggle button state
        btn.setAttribute('aria-expanded', 'false');
        btn.innerHTML = '<span aria-label="View more info about ' + personName + '’s info">More Info+</span>';
      }, 300);
    }, 300);
  };

  // Show bio
  var showBio = function(btn, person, personName, initialInfo, bio) {
    // Fade out initial info
    initialInfo.style.opacity = '0';

    // Toggle button state
    btn.setAttribute('aria-expanded', 'true');
    btn.innerHTML = '<span aria-label="Close ' + personName + '’s info">-Close Info</span>';

    // Timeout allows for initialInfo CSS transition
    setTimeout(function() {

      // Slide up overlay :before pseudo-el
      person.classList.add('slidUp');

      // Timeout allows for .person:before CSS transition
      setTimeout(function() {
        // Show bio and initial info
        initialInfo.style.opacity = '1';
        bio.removeAttribute('aria-hidden');
      }, 500);
    }, 300);
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