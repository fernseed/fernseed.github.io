function adjustBehaviourForScreenSize() {
  var windowsize = $(window).width();
  var articlesize = $("article").width();

  if(windowsize >= 1366){
     $('body').addClass('sidebar-overlay');
     if(windowsize >= 1680){
     		document.querySelector('#sidebar-checkbox').checked = true
     }
  }
  else{
     $('body').removeClass('sidebar-overlay');
  }

  /* Big image centering */
  $("img").each(function(i, img) {

      var mysize = ($(img).width());

      if (mysize > (windowsize-(windowsize/10))) { 
          mysize = windowsize-(windowsize/10);
      }

      var leftadjustment = (articlesize/2) - (mysize/2);

      $(img).css({
          'max-width': mysize,
          'position': 'relative',
          'margin-left': '0',
          'margin-right': '0',
          'left': leftadjustment
      });
  });
}