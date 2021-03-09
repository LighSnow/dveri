
$(function () {


    'use strict';

    $('.js-toggle').on('click', function (e){
        e.preventDefault();
        $(this).toggleClass('active');
    });


    // Toggle
    const toggle = $('.toggle__item');
    toggle.on('click', function (e){
        e.preventDefault();
        $(this).toggleClass('active');
    });


    // Accordion
    const accordionLink = $('.js-accordion-link');
    // const accordionContent = $('.js-accordion-content');
    accordionLink.on('click', function (e){
        e.preventDefault();
        $(this).toggleClass('active');
        let thisAccordionContent = $(this).attr('href');
        // accordionContent.slideUp();
        $(thisAccordionContent).slideToggle();
    });


    // Скрол на початок сторінки
    $(document).on('scroll', function(){
        let documentScroll = $(this).scrollTop();
        if (documentScroll >= 124) {
            $('.scroll-top').addClass('active');
        } else {
            $('.scroll-top').removeClass('active');
        }
    });
    $('.scroll-top').on('click', function(){
        $('html, body').animate({
            scrollTop: 0
        }, 2000);
    });


    // Modal
    const body = $('body');
    const modal = $('.modal');
    const modalLink = $('.js-modal-link');
    const modalClose = $('.modal__close');
    modalLink.on('click', function (e){
        e.preventDefault();
        let thisModal = $(this).attr('href');
        body.addClass('overflow-hidden');
        $(thisModal).fadeIn();
    });
    modalClose.on('click', function (e){
        e.preventDefault();
        body.removeClass('overflow-hidden');
        modal.fadeOut();
    });
    modal.click( function(e){
        if ( $(e.target).closest('.modal__content').length ) {
            return;
        }
        body.removeClass('overflow-hidden');
        modal.fadeOut();
    });


    // Alert
    const alertLink = $('.js-alert-link');
    const alertClose = $('.alert__close');
    alertLink.on('click', function (e){
        e.preventDefault();
        let thisAlert = $(this).attr('href');
        $(thisAlert).fadeIn();
        function alertFade() {
            $(thisAlert).fadeOut();
        }
        setTimeout(alertFade, 5000);
    });
    alertClose.on('click', function (e){
        e.preventDefault();
        let thisAlert = $(this).attr('href');
        $(thisAlert).fadeOut();
    });


    $('select').niceSelect();

});
(function($){
    $(window).on("load",function(){
        $(".scroll").mCustomScrollbar({
            theme:"dark-3"
        });
    });
})(jQuery);
$(document).ready(function() {
    $(".number-picker").dpNumberPicker({
        min: 1, // Minimum value.
        max: false, // Maximum value.
        value: 333, // Initial value
        step: 1, // Incremental/decremental step on up/down change.
        format: false,
        editable: true,
        addText: "+",
        subText: "-",
        formatter: function (val) {
            return val + " шт";
        },
        beforeIncrease: function () {
        },
        afterIncrease: function () {
        },
        beforeDecrease: function () {
        },
        afterDecrease: function () {
        },
        beforeChange: function () {
        },
        afterChange: function () {
        },
        onMin: function () {
        },
        onMax: function () {
        }
    });
});
$(document).ready(function() {

    'use strict';

    const tab = $('.tabs-link');
    const tabLink = '.tabs-link';
    const tabContent = '.tabs-content';

    tab.on('click', function (e) {
        e.preventDefault();

        let thisTab = $(this).attr('href');
        let thisContent = $(this).attr('data-target');

        $(thisContent + ' ' + tabLink).removeClass('active');
        $(thisContent + ' ' + tabContent).removeClass('active');
        $(this).addClass('active');
        $(thisContent + ' ' + thisTab).addClass('active');

    });

});
$(function () {

    'use strict';

    // Пошук в навігації
    $('.navigation__search_close').on('click', function (e){
        e.preventDefault();
        $('.navigation__search').fadeOut();
    });
    $('.navigation__search_link').on('click', function (e){
        e.preventDefault();
        $('.navigation__search').fadeIn();
    });

});
// Пошук в навігації
$('.navigation__search_close').on('click', function (e){
    e.preventDefault();
    $('.navigation__search').fadeOut();
});
$('.navigation__search_link').on('click', function (e){
    e.preventDefault();
    $('.navigation__search').fadeIn();
});


// Фіксація навігації при скролі
$(document).on('scroll', function(){
    let documentScroll = $(this).scrollTop();
    if (documentScroll >= 124) {
        $('.navigation').addClass('fixed');
        $('.header').css('paddingTop', 50);
    } else {
        $('.navigation').removeClass('fixed');
        $('.header').removeAttr('style');
    }
});


// Навігаційне дерево для планшетної версії
$(document).ready(function () {
    $(window).on("resize", function (e) {
        navigationTree();
    });
    navigationTree();
    function navigationTree(){
        let newWindowWidth = $(window).width();
        if (newWindowWidth < 1200) {
            const catalogLink = $('.navigation__catalog');
            const navTabletLink = $('.navigation-tablet__arrow');
            const navTabletTitle = $('.navigation-tablet__title');
            const navTabletContent = $('.navigation-tablet__list');
            const navTabletOverflow = $('.overflow-navigation');
            catalogLink.on('click', function (e) {
                e.preventDefault();
                navTabletOverflow.fadeToggle();
                $(this).toggleClass('active');
                $('.catalog-menu').toggleClass('active');
            });
            navTabletLink.on('click', function (e){
                e.preventDefault();
                let thisContent = $(this).attr('href');
                navTabletContent.removeClass('active');
                $(thisContent).addClass('active');
            });
            navTabletTitle.on('click', function (e){
                e.preventDefault();
                let thisContent = $(this).attr('href');
                navTabletContent.removeClass('active');
                $(thisContent).addClass('active');
            });
            navTabletOverflow.on('click', function (e){
                e.preventDefault();
                catalogLink.removeClass('active');
                navTabletOverflow.fadeOut();
                $('.catalog-menu').removeClass('active');
            });
        }
    }
});
const body = $('body');
const mobileBurger = $('.header-mobile__burger');
const mobileMenu = $('.mobile-menu');
mobileBurger.on('click', function (e){
    e.preventDefault();
    mobileMenu.fadeToggle();
    $(this).toggleClass('active');
    body.toggleClass('overflow-hidden');
});
mobileMenu.click( function(e){
    if ( $(e.target).closest('.mobile-menu__content').length ) {
        return;
    }
    body.removeClass('overflow-hidden');
    mobileMenu.fadeOut();
    mobileBurger.removeClass('active');
});
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
$('.viewed-products__slider').slick({
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    fade: false,
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 4,
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
            }
        }
    ]
});
$('.reviews__slider').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    fade: false,
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 520,
            settings: {
                slidesToShow: 1,
            }
        }
    ]
});