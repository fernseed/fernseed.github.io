$(document).ready(function() {
    var vpH = $(window).height();
    var vH = vpH - 350;
    $('.overlay').css("height", vH);
    $('.featured-image').css("height", vH);
});


$(function(){
  $('<img>').attr('src',function(){
      var imgUrl = $('div.featured-image').css('background-image');
      if (!imgUrl) {
        return;
      }
      imgUrl = imgUrl.substring(4, imgUrl.length-1);
      return imgUrl;
  }).load(function(){
    $('img.loading').fadeOut(500);
    $('div.overlay').fadeTo("slow", 0.6);
  });
});