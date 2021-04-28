$(function () {
    'use strict';
    let scrollWidth = $(window).outerWidth();
    function toggleNavigation() {
        scrollWidth = $(window).outerWidth() - $(window).width();

        let body = $('body');
        // Пошук в навігації
        $('.navigation__search_close').on('click', function (e) {
            e.preventDefault();
            $('.navigation__search').fadeOut().removeClass('active');
            body.css({
                'padding-right': '',
            });
            body.removeClass('lock');
        });

        $('.navigation__search_link').on('click', function (e) {
            e.preventDefault();
            $('.navigation__search').fadeIn().addClass('active');
            body.css({
                'padding-right': scrollWidth,
            });
            body.addClass('lock');
        });

        $(document).on('mouseup', function (e) {
            const t = e.target;
            const searchBlock = $('.navigation__search');

            if (searchBlock.hasClass('active') && !searchBlock.is(t) && searchBlock.has(t).length === 0) {
                searchBlock.removeClass('active');
                searchBlock.fadeOut();
                body.css({
                    'padding-right': '',
                });
                body.removeClass('lock');
            }
        });
    }
    toggleNavigation();

    $(window).on('resize', toggleNavigation);
});

