$(function () {

    'use strict';



    $('.intro__slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        focusOnSelect: true,
        autoplay: true,
        autoplaySpeed: 3000,
        fade: true,
        arrows: true,
        dots: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    arrows: false
                }
            }
        ]
    });



});