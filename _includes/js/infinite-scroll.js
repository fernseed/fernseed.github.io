$(function() {
  
  var posts,
      isFetchingPosts = false,
      shouldFetchPosts = true,
      postsToLoad = $(".posts").children().length,
      loadNewPostsThreshold = 3000;
  
  $.getJSON('/api/search', function(postData) {
    posts = postData["posts"];
    
    if (posts.length <= postsToLoad)
      disableFetching();
  });
  
  if ($(".infinite-spinner").length < 1)
    shouldFetchPosts = false;
  
  $(window).scroll(function(e){
    if (!shouldFetchPosts || isFetchingPosts) return;
    
    var windowHeight = $(window).height(),
        windowScrollPosition = $(window).scrollTop(),
        bottomScrollPosition = windowHeight + windowScrollPosition,
        documentHeight = $(document).height();
    
    if ((documentHeight - loadNewPostsThreshold) < bottomScrollPosition) {
      fetchPosts();
    }
  });
  
  function fetchPosts() {
    if (!posts) return;
    
    isFetchingPosts = true;
    
    var loadedPosts = 0,
        postCount = $(".posts").children().length,
        callback = function() {
          loadedPosts++;
          var postIndex = postCount + loadedPosts;
          
          if (postIndex > posts.length-1) {
            disableFetching();
            return;
          }
          
          if (loadedPosts < postsToLoad) {
            fetchPostWithIndex(postIndex, callback);
          } else {
            isFetchingPosts = false;
          }
        };
    
    fetchPostWithIndex(postCount + loadedPosts, callback);
  }
  
  function fetchPostWithIndex(index, callback) {
    var postURL = posts[index].url;
    
    $.get(postURL, function(data) {
      $(data).find(".excerpt").appendTo(".posts");
      callback();
    });
  }
  
  function disableFetching() {
    shouldFetchPosts = false;
    isFetchingPosts = false;
    $(".infinite-spinner").fadeOut();
  }
  
});