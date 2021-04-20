$(function () {

    'use strict';

    // Пошук в навігації
    $('.navigation__search_close').on('click', function (e){
        e.preventDefault();
        $('.navigation__search').fadeOut().removeClass('active');
    });

    $('.navigation__search_link').on('click', function (e){
        e.preventDefault();
        $('.navigation__search').fadeIn().addClass('active');
    });




    $(document).on('mouseup', function (e) {
        const t = e.target;
        const searchBlock = $('.navigation__search');

        if(searchBlock.hasClass('active') && !searchBlock.is(t) && searchBlock.has(t).length === 0) {
            searchBlock.removeClass('active');
            searchBlock.fadeOut();
        }
    })
});