(function ($) {
  const width = $(window).width();
  $(window).on("load", function () {
    const parent = $('.body-product');
    if (parent.find('.scroll').length > 0) {
        $(".scroll").mCustomScrollbar({
          theme: "dark-3"
        });
    } else {
      $(".scroll").mCustomScrollbar({
        theme: "dark-3"
      });
    }
    $('.product-comparison__inner').mCustomScrollbar({
      theme: "dark-3",
      axis: 'x',
      autoHideScrollbar: false,
      // contentTouchScroll: false,
      documentTouchScroll: true,
      // autoDraggerLength: false,
      mouseWheel: {
        enable: false,
      },

    });
  });


})(jQuery);