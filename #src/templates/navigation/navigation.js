// Пошук в навігації
$('.navigation__search_close').on('click', function (e) {
    e.preventDefault();
    $('.navigation__search').fadeOut();
});
$('.navigation__search_link').on('click', function (e) {
    e.preventDefault();
    $('.navigation__search').fadeIn();
});


// Фіксація навігації при скролі
$(document).on('scroll', function () {
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
    navigationTree();

    function navigationTree() {
        let newWindowWidth = $(window).width();
        if (newWindowWidth < 1200) {
            const catalogLink = $('.navigation__catalog');
            const navTabletLink = $('.navigation-tablet__arrow');
            const navTabletTitle = $('.navigation-tablet__title');
            const navTabletContent = $('.navigation-tablet__list');
            const navTabletOverflow = $('.overflow-navigation');
            const body = $('body');

            catalogLink.on('click', function (e) {
                e.preventDefault();
                navTabletOverflow.fadeToggle();
                $(this).toggleClass('active');
                $('.catalog-menu').toggleClass('active');
                body.toggleClass('lock');
            });
            navTabletLink.on('click', function (e) {
                e.preventDefault();
                let thisContent = $(this).attr('href');
                navTabletContent.removeClass('active');
                $(thisContent).addClass('active');
            });
            navTabletTitle.on('click', function (e) {
                e.preventDefault();
                let thisContent = $(this).attr('href');
                navTabletContent.removeClass('active');
                $(thisContent).addClass('active');
            });
            navTabletOverflow.on('click', function (e) {
                e.preventDefault();
                catalogLink.removeClass('active');
                navTabletOverflow.fadeOut();
                $('.catalog-menu').removeClass('active');
                body.removeClass('lock');
            });
        }
    }

    filterToggle();

    function filterToggle() {
        const navTabletOverflow = $('.overflow-navigation');
        const filterBtn = $('.category__main-filters__btn');
        const filterWrapper = $('.category__aside');
        const body = $('body');
        const closeBtn = $('.category__filter-close');
        let scrollTo;
        filterBtn.on('click', function (e) {
            filterWrapper.toggleClass('active');
            navTabletOverflow.fadeToggle();
            body.toggleClass('lock');
            $(this).parents('.category__main-select').length > 0 ?
                scrollTo = 0 : scrollTo = $('.category__main-filters').position().top - 30;
            window.scrollTo({
                top: scrollTo,
                behavior: 'smooth'
            });
        });

        navTabletOverflow.on('click', function (e) {
            filterWrapper.removeClass('active');
            navTabletOverflow.fadeOut();
            body.removeClass('lock');
        });

        closeBtn.on('click', function (e) {
            filterWrapper.removeClass('active');
            navTabletOverflow.fadeOut();
            body.removeClass('lock');
        });
    }
});