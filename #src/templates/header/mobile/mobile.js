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
    $('.navigation-tablet__list').removeClass('active');
    $('.navigation-tablet__list').addClass('active');
});


