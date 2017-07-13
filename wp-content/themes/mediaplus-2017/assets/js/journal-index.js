(function(document, window, undefined){
  'use strict';

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
    var footerHeight = document.querySelector('.footer').offsetHeight;
    var lastPostHeight = document.querySelector('.post-preview:last-of-type').offsetHeight;
    if ((window.scrollY + window.outerHeight) >= document.body.clientHeight - footerHeight - lastPostHeight) {
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
        },
        success: function(newPosts) {
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
          }, 200);
        }
      });
    }
  }, 200);

  window.addEventListener('scroll', morePosts, false);
  window.addEventListener('touchmove', morePosts, false);
  window.addEventListener('touchend', morePosts, false);

})(document, window);