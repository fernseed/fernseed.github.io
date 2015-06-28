function adjustBehaviourForScreenSize() {
   var width = $(window).width();
   if(width >= 1366){
       $('body').addClass('sidebar-overlay');
       if(width >= 1680){
       		document.querySelector('#sidebar-checkbox').checked = true
       }
   }
   else{
       $('body').removeClass('sidebar-overlay');
   }
}