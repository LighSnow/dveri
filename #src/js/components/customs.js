$(function () {


    'use strict';

    $('.js-toggle').on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('active');
    });


    // Toggle
    const toggle = $('.toggle__item');
    toggle.on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('active');
    });


    // Accordion
    const accordionLink = $('.js-accordion-link');
    // const accordionContent = $('.js-accordion-content');
    accordionLink.on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('active');
        let thisAccordionContent = $(this).attr('href');
        // accordionContent.slideUp();
        $(thisAccordionContent).slideToggle();
    });


    // Скрол на початок сторінки
    $(document).on('scroll', function () {
        let documentScroll = $(this).scrollTop();
        if (documentScroll >= 124) {
            $('.scroll-top').addClass('active');
        } else {
            $('.scroll-top').removeClass('active');
        }
    });
    $('.scroll-top').on('click', function () {
        $('html, body').animate({
            scrollTop: 0
        }, 2000);
    });


    // Modal
    const body = $('body');
    const modal = $('.modal');
    const modalLink = $('.js-modal-link');
    const modalClose = $('.modal__close');
    modalLink.on('click', function (e) {
        e.preventDefault();
        let thisModal = $(this).attr('href');
        body.addClass('overflow-hidden');
        $(thisModal).fadeIn();
    });
    modalClose.on('click', function (e) {
        e.preventDefault();
        body.removeClass('overflow-hidden');
        modal.fadeOut();
    });
    modal.click(function (e) {
        if ($(e.target).closest('.modal__content').length) {
            return;
        }
        body.removeClass('overflow-hidden');
        modal.fadeOut();
    });


    // Alert
    const alertLink = $('.js-alert-link');
    const alertClose = $('.alert__close');
    alertLink.on('click', function (e) {
        e.preventDefault();
        let thisAlert = $(this).attr('href');
        $(thisAlert).fadeIn();
        function alertFade() {
            $(thisAlert).fadeOut();
        }
        setTimeout(alertFade, 5000);
    });
    alertClose.on('click', function (e) {
        e.preventDefault();
        let thisAlert = $(this).attr('href');
        $(thisAlert).fadeOut();
    });


    $('select').niceSelect();

    $.validator.messages.required = '';
    $("#delivery-form").validate({
        rules: {
            onfocusout: false,
            company: {
                required: true,
                minlength: 3
            },
            name: {
                required: true,
                minlength: 3
            },
            phone: {
                required: true,
                minlength: 11,
            },
            email: {
                required: true,
                email: true
            },
            onfocusout: function (element) {
                if (!this.checkable(element) && (element.name in this.submitted || !this.optional(element))) {
                    this.element(element);
                }
            }
        },
    });

    $('#phone').mask('+7 (000) 000-00-00');

    $("#pay-form").validate({
        rules: {
            onfocusout: false,
            address: {
                required: true,
                minlength: 3
            },
            inn: {
                required: true,
                minlength: 3
            },
            kpp: {
                required: true,
                minlength: 3,
            },
            orgn: {
                required: true,
                minlength: 3,
            },
            index: {
                required: true,
                minlength: 3,
            },
            bik: {
                required: true,
                minlength: 3,
            },
            bank: {
                required: true,
                minlength: 3,
            },
            city: {
                required: true,
                minlength: 3,
            },
            ['correspondent-account']: {
                required: true,
                minlength: 3,
            },
            ['checking-account']: {
                required: true,
                minlength: 3,
            },
            onfocusout: function (element) {
                if (!this.checkable(element) && (element.name in this.submitted || !this.optional(element))) {
                    this.element(element);
                }
            }
        },
    });




});