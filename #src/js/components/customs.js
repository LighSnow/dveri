$(function () {
    'use strict';

    $('.js-toggle').on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('active');

        if ($('.brands__item-all').length > 0) {
            (!$('.brands__item-all').is(e.target)) ?
                $('.brands__item-all').removeClass('active') :
                $('.brands__item').removeClass('active');
        }

        if ($(window).width() > 768) {
            if ($('.form-method__row-btns--mob').length > 0) {
                ($('.tab-link-without').is(e.target)) ?
                    $('.tab-link-without').parent()
                        .siblings('.form-method__label')
                        .removeClass('active') :
                    $('.form-method__label').addClass('active');
            }
        }
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
        $(thisModal).addClass('active');
        $('body').addClass('smoke overflow-hidden');
    });
    modalClose.on('click', function (e) {
        e.preventDefault();
        body.removeClass('overflow-hidden');
        modal.removeClass('active');
        $('body').removeClass('smoke overflow-hidden');
    });
    modal.click(function (e) {
        if ($(e.target).closest('.modal__content').length) {
            return;
        }
        body.removeClass('overflow-hidden');
        modal.removeClass('active');
        $('body').removeClass('smoke overflow-hidden');
    });


    // Alert
    const alertLink = $('.js-alert-link');
    const alertClose = $('.alert__close');

    alertLink.on('click', function (e) {

        e.preventDefault();
        if ($(this).hasClass('active')) {
            let thisAlert = $(this).attr('href');
            $(thisAlert).fadeIn();

            function alertFade() {
                $(thisAlert).fadeOut();
            }

            setTimeout(alertFade, 5000);
        }
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
    // const personalAreaClose = $('.personal-area__close');
    // const personaAreaClose = document.querySelector('.personal-area__close');
    // personaAreaClose.addEventListener('click', (e) => {
    //     e.preventDefault();
    //     // console.log(e.target.parentNode);
    //     let step = document.querySelectorAll('.personal-area__step');
    //     if (e.target.parentNode.classList.contains('.personal-area__close-link')) {
    //         console.log(e.target);
    //     };
    //     // step.forEach(item => {

    //     // });
    // });
    let step = document.querySelectorAll('.personal-area__step');
    // console.log(step);

    step.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            if (!item.classList.contains('hide')) {
                step.forEach(item => {
                    item.classList.remove('hide');
                });
                document.querySelector('.delete').addEventListener('click', () => {
                    document.querySelector('.personal-area__block').classList.add('hide');
                })
                item.classList.add('hide');
            }
        });
    });
    // personalAreaClose.on('click', function (e) {
    //     e.preventDefault();
    //     console.log('this');
    //     let target = $(event.target);
    //     let step1 = $('.personal-area__step-1');
    //     if (target.is(step1)) {
    //         step1.addClass('hide');
    //     }
    // });
    $(document).on('mousedown', function (e) {
        const t = e.target;
        const spollerBtn = $('.category__aside-list__title');
        const btnInSpoller = spollerBtn.find('a');
        if (!btnInSpoller.is(t) && spollerBtn.is(t)) {
            $(t).toggleClass('active')
                .next('.category__aside-dropdown')
                .slideToggle();
        }
    });
});