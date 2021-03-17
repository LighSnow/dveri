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
    // $(window).on("resize", function (e) {
    //     navigationTree();
    // });
    navigationTree();
    function navigationTree(){
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
                body.removeClass('lock');
            });
        }
    }
});