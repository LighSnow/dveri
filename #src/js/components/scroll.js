(function ($) {
 const width = $(window).width;
 $(window).on("load", function () {
  const parent = $('.body-product');
  if (parent.find('.scroll').length > 0) {
   if (width > 610) {
    $(".scroll").mCustomScrollbar({
     theme: "dark-3"
    });
   }
  } else {
   $(".scroll").mCustomScrollbar({
    theme: "dark-3"
   });
  }
 });

})(jQuery);