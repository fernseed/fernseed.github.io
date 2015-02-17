function adjustBehaviourForScreenSize() {
   var width = $(window).width();
   if(width >= 1380){
       $('body').addClass('sidebar-overlay');
   }
   else{
       $('body').removeClass('sidebar-overlay');
   }
}