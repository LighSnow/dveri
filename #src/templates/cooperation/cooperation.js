$('.cooperation__slider').slick({
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    fade: false,
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 5,
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 3,
            }
        },
        {
            breakpoint: 520,
            settings: {
                slidesToShow: 2,
            }
        }
    ]
});

// $('.cooperation__slider-column').slick({
//     infinite: true,
//     slidesToShow: 6,
//     slidesToScroll: 1,
//     slidesPerRow: 3,
//     rows: 2,
//     arrows: true,
//     dots: false,
//     fade: false,
//     responsive: [
//         {
//             breakpoint: 1200,
//             settings: {
//                 slidesToShow: 5,
//             }
//         },
//         {
//             breakpoint: 768,
//             settings: {
//                 slidesToShow: 3,
//             }
//         },
//         {
//             breakpoint: 520,
//             settings: {
//                 slidesToShow: 2,
//             }
//         }
//     ]
// });