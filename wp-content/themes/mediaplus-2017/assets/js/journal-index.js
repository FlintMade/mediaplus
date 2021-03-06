/*
  *	=============================================
  *	JOURNAL INDEX PAGE
  *  Unlike most pages, this page uses jQuery to 
  *  simplify the Ajax'ing of posts
  * 
  *  Ajax functionality relies on contents of
  *  functions.php file
  *	=============================================
  */

var pageNumber = 1,
    numPosts = document.querySelectorAll('.post-preview').length,
    postPreviews = document.getElementById('postPreviews');

$('#postPreviews').append('<p class="load-status" id="loader" aria-hidden="true">Loading More &hellip;</p>');
var loader = document.getElementById('loader');

var morePosts = debounce(function() {
  console.log('more posts has fired');
  var footerHeight = document.querySelector('.footer').offsetHeight;
  var lastPostHeight = document.querySelector('.post-preview:last-of-type').offsetHeight;
  if ((window.pageYOffset + window.innerHeight) >= document.body.clientHeight - footerHeight - lastPostHeight) {
    console.log('reached bottom of page');
    pageNumber++;
    $.ajax({
      url: ajaxpagination.ajaxurl,
      type: 'post',
      data: {
        action: 'ajax_pagination',
        query_vars: ajaxpagination.query_vars,
        page: pageNumber
      },
      beforeSend: function() {
        loader.removeAttribute('aria-hidden');
        console.log('before worked');
      },
      success: function(newPosts) {
        console.log('great success????');
        $(newPosts).insertBefore(loader);
        var newNumPosts = document.querySelectorAll('.post-preview').length;

        // Check if reached the end
        if (numPosts === newNumPosts) {
          loader.removeAttribute('aria-hidden');
          loader.innerText = 'That’s all for now!';
          window.removeEventListener('scroll', morePosts, false);
        } else {
          numPosts = newNumPosts;
          loader.setAttribute('aria-hidden', 'true');
        }

        setTimeout(function(){
          var invisiblePosts = document.querySelectorAll('.post-preview:not(.loaded)');
          for (var i = 0; i < invisiblePosts.length; i++) {
            invisiblePosts[i].classList.add('loaded');
          }
          bobInRows();
        }, 200);
      }
    });
  }
}, 200);

// Hook up scroll events
var scrollEvents = function() {
  bobInRows();
  morePosts();
};

window.addEventListener('scroll', scrollEvents, false);
window.addEventListener('touchend', scrollEvents, false);

// See scripts.js
bobInRows();