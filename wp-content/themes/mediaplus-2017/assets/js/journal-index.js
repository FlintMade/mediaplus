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
            $('#postPreviews').append('<p class="load-status" id="loader">Loading More &hellip;</p>');
          },
          success: function(newPosts) {
            $('#loader').fadeOut(200).remove();
            $('#postPreviews').append(newPosts);

            setTimeout(function(){
              var displayedPosts = document.querySelectorAll('.post-preview');
              var newPostIndex = (pageNumber - 1) * 3;
              for (var i = newPostIndex; i < displayedPosts.length; i++) {
                displayedPosts[i].style.opacity = '1';
              }
            }, 200);
          }
        });
      }
    }
  }, 200);

  window.addEventListener('scroll', morePosts, false);

})(document, window);