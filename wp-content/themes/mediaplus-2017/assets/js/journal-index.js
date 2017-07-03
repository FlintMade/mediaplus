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

  var pageNumber = 1;

  $('#postPreviews').append('<p class="load-status" id="loader" aria-hidden="true">Loading More &hellip;</p>');
  var loader = document.getElementById('loader');

  var morePosts = debounce(function() {
    var reachedEnd = document.getElementById('emptyPosts');
    if (reachedEnd) {
      window.removeEventListener('scroll', morePosts, false);
    } else {
      if ((window.scrollY + window.outerHeight) >= document.body.clientHeight - 200) {
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
            loader.setAttribute('aria-hidden', 'true');
            $(newPosts).insertBefore(loader);

            setTimeout(function(){
              var invisiblePosts = document.querySelectorAll('.post-preview:not(.loaded)');
              for (var i = 0; i < invisiblePosts.length; i++) {
                invisiblePosts[i].classList.add('loaded');
              }
            }, 200);
          }
        });
      }
    }
  }, 200);

  window.addEventListener('scroll', morePosts, false);

})(document, window);