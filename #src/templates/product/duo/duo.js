const mediaWidth = $(window).width();

if (mediaWidth > 610) {
    $('.duo__slider-pc .duo__slider-inner').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 5,
                }
            },
        ]
    });
} else {
    $('.duo__slider-pc').hide();
    $('.duo__slider-mob').show();
    $('.duo__slider-mob .duo__slider-inner').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 450,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 3,
                    arrows: false
                }
            }
        ]
    });
}


// выбор второй двери
if($('._wrapper-duo').length > 0) {
    $('body').on('click', '.duo__slider-item--img', function () {
        const elem = $(this);
        const door = $(this).attr('data-door');
        const parent = $(this).parents('._wrapper-duo');

        elem.addClass('current').parents('.slick-slide').siblings().find('.duo__slider-item--img').removeClass('current');
        elem.siblings().removeClass('current');
        parent.find('.second-door-look').attr('src', `../../img/product/product-duo-slider-for-${door}.jpg`);
        parent.find('.second-door-fancy').attr('href', `../../img/product/product-duo-slider-for-${door}.jpg`);
    });
}


