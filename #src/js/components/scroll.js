(function ($) {
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

  const width = $(window).width();
  $(window).on("load resize scroll", function () {
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

    // customScroll()

    // $(window).on('resize', function () {
    // customScroll();
    // });

  });

  // let simpleScroll = document.querySelectorAll('.select');

  // simpleScroll.forEach(item => {
  //   item = new SimpleBar();
  // })



})(jQuery);


// new SimpleBar(document.getElementById('myElement'));

// if(document.querySelector('#myElement')) {
//   const simpleBar = new SimpleBar(document.getElementById('myElement'), { autoHide: false });
// }


// Array.prototype.forEach.call(
//   document.querySelectorAll('.category__filter-dropdown-wrapper'),
//   el => new SimpleBar()
// );

// for (let scroll of document.querySelectorAll('.category__filter-dropdown-wrapper')) {
//   new SimpleBar(scroll, {
//     autoHide: false,
//   });
// }

document.querySelectorAll('.category__filter-dropdown-wrapper').forEach(function (el, i) {
  new SimpleBar(el, {
    autoHide: false,
  });
});
// const simplebar = document.querySelectorAll('.category__filter-dropdown-wrapper');

// simplebar.forEach(el => {
//   el = new SimpleBar();
// });