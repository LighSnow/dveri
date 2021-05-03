(function ($) {
    $(".scrollZ").mCustomScrollbar({
        theme: "dark-3"
    });
    // function customScroll() {
    //   $('.product-comparison__inner').mCustomScrollbar({
    //     theme: "dark-3",
    //     axis: 'x',
    //     mouseWheel: { axis: "x" },
    //     scrollInertia: 1000,
    //     documentTouchScroll: true,
    //     callbacks: {
    //       whileScrolling: function () {
    //         let abs = Math.abs(this.mcs.left);
    //         let position = $('.pos');
    //         position.css('left', abs);
    //         console.log($('.pos'));
    //       }
    //     }
    //   });
    // }

    // const width = $(window).width();
    // $(window).on("load resize scroll", function () {
    //   const parent = $('.body-product');
    //   if (parent.find('.scroll').length > 0) {
    //     $(".scroll").mCustomScrollbar({
    //       theme: "dark-3"
    //     });
    //   } else {
    //     $(".scroll").mCustomScrollbar({
    //       theme: "dark-3"
    //     });
    //   }

    //   // customScroll()

    //   // $(window).on('resize', function () {
    //   // customScroll();
    //   // });

    // });



})(jQuery);


document.querySelectorAll('.scroll').forEach(function (el, i) {
    new SimpleBar(el, {
        autoHide: false,
    });
});
