$(function () {
    const body = $('body');
    const scrollWidth = $(window).outerWidth() - $(window).width();
    // обьект картинок для слайдера обратботка стекла--рисунок
    const imgObjGlass = {
        1: '../../../img/product/onyx/onyx-slider/onyx-slider-1-1.png',
        2: '../../../img/product/onyx/onyx-slider/onyx-slider-2-1.png',
        3: '../../../img/product/onyx/onyx-slider/onyx-slider-3-1.png',
        4: '../../../img/product/onyx/onyx-slider/onyx-slider-4-1.png',
        5: '../../../img/product/onyx/onyx-slider/onyx-slider-5-1.png'
    }

    const imgObjGrid = {
        1: '../../../img/product/onyx/onyx-grid-1.png',
        2: '../../../img/product/onyx/onyx-grid-2.png',
        3: '../../../img/product/onyx/onyx-grid-3.png',
        4: '../../../img/product/onyx/onyx-grid-4.png',
        5: '../../../img/product/onyx/onyx-grid-5.png'
    }

    // смена картинок для двери оник(обработка стекла--рисунок)
    const imgForOnyxDoor = {
        1: ['../../../img/product/onyx/onyx-glass-1-1.png',
            '../../../img/product/onyx/onyx-glass-1-2.png'],
        2: ['../../../img/product/onyx/onyx-glass-2-1.png',
            '../../../img/product/onyx/onyx-glass-2-2.png',
            '../../../img/product/onyx/onyx-glass-2-3.png',
            '../../../img/product/onyx/onyx-glass-2-4.png',
            '../../../img/product/onyx/onyx-glass-2-5.png',
            '../../../img/product/onyx/onyx-glass-2-6.png',],
        3: ['../../../img/product/onyx/onyx-glass-3-1.png',
            '../../../img/product/onyx/onyx-glass-3-2.png'],
        4: ['../../../img/product/onyx/onyx-glass-4-1.png',
            '../../../img/product/onyx/onyx-glass-4-2.png',
            '../../../img/product/onyx/onyx-glass-4-3.png',
            '../../../img/product/onyx/onyx-glass-4-4.png'],
        5: ['../../../img/product/onyx/onyx-glass-5-1.png',
            '../../../img/product/onyx/onyx-glass-5-2.png',
            '../../../img/product/onyx/onyx-glass-5-3.png',
            '../../../img/product/onyx/onyx-glass-5-4.png',
            '../../../img/product/onyx/onyx-glass-5-5.png',]
    }
    //plugins
    //slider for onyx

    $('.settings__slider').each(function (i, el) {
        if ($(el).find('.settings__slider-item').length > 3) {
            if (!$(el).hasClass('js-slider-glass')) {
                $(el).removeClass('disabled');
                $(el).slick({
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    arrows: true,
                });
            }
        }
    });
    $('.slick-slide.slick-active').next('*:not(.slick-active)').prev().addClass('next');
    body.on('click', '.slick-arrow', function () {
        if ($(this).hasClass('slick-next')) {
            $(this).parents('.settings__slider').find('.slick-slide.next').removeClass('next').next().addClass('next')
        }
    });
    // нажатие на setting input
    body.on('click', '.js-setting-input', function (e) {
        if ($(this).hasClass('open')) {
            $(this).removeClass('open');
        } else {
            $(this).addClass('open');
        }
    });


    // открытие блока выбора цвета двери
    body.on('click', '.js-setting-input', function () {
        const settings = $(this).parents('.setting-row').find('.color__wrapper');

        settings.fadeToggle();
    });


    // выбор двери
    body.on('click', '.color__wrapper-block', function () {
        const currentColor = $(this).find('.color__wrapper-text').text().trim();
        const src = '"../../../img/product/onyx/onyx-color-';
        const onyx = $(this).attr('data-onyx-main');
        const onyxChoose = $(this).attr('data-onyx-choose');
        const currentElementForChoose = body.find('.onyx-item[data-onyx="' + onyx + '"]').find('img');

        currentElementForChoose.attr('src', `${src}${onyxChoose}.png`);
        $(this).addClass('current').siblings().removeClass('current');
        $(this).parents('.setting-row').find('#color-choose-input').val(currentColor);
        $(this).parents('.color__wrapper').fadeOut();
    });

    // onyx смена двери
    body.on('click', '.settings__slider-item', function () {
        const onyx = $(this).attr('data-onyx-main');
        const onyxChoose = $(this).attr('data-onyx-choose');
        const onyxTypeGlass = $(this).attr('data-type-choose');
        // скорее всего сразу будут загружены и можно брать так
        const src = `../../../img/product/onyx/onyx-`;

        const currentElementForChoose = body.find('.onyx-item[data-onyx="' + onyx + '"]').find('img');
        if($(this).hasClass('glasstype__inner-item')) {
            $(this).siblings().removeClass('current')
        }
        // если нет обязательно 1 выбранного элемента двери
        if (!$(this).parents('.settings__slider').hasClass('required')) {
            // toggle
            if ($(this).hasClass('current')) {
                $(this).removeClass('current').parents('.slick-slide');
                currentElementForChoose.attr('src', '');
            } else {
                $(this).addClass('current').parents('.slick-slide').siblings().find('.settings__slider-item').removeClass('current');
                // glass
                if ($(this).parents('.settings__slider').hasClass('js-slider-glass')) {
                    // береться из обьекта imgForOnyxDoor
                    currentElementForChoose.attr('src', imgForOnyxDoor[`${onyxTypeGlass}`][onyxChoose - 1])
                } else {
                    currentElementForChoose.attr('src', `${src}${onyx}-${onyxChoose}.png`);
                }
            }
            //  если есть один обязательный элемент двери
        } else {
            // если слайдер менее 3 айтемов он перестает быть слайдером
            if (!$(this).parents('.settings__slider').hasClass('disabled')) {
                $(this).addClass('current').parents('.slick-slide').siblings().find('.settings__slider-item').removeClass('current');
                currentElementForChoose.attr('src', `${src}${onyx}-${onyxChoose}.png`);
            } else {
                $(this).addClass('current').siblings().removeClass('current');
                currentElementForChoose.attr('src', `${src}${onyx}-${onyxChoose}.png`);
            }
        }
        // onyx

    });


    // выбор стеклянной или глухой оболочки двери
    body.on('click', '.controls-btn', function () {
        $(this).addClass('active').siblings().removeClass('active');
        body.find('.product__settings-row--glasstype' +
            ' .settings__slider-item[data-onyx-choose="1"]').trigger('click');
    });


    body.on('click', '.product__settings-row .option', function () {
        const typeGlassProcessing = $(this).attr('data-value');
        const onyx = $(this).parents('.lattice-type').attr('data-onyx-main');
        const sliderItem = body.find('.js-slider-glass .settings__slider-item');
        const currentElementForChoose = body.find('.onyx-item[data-onyx="' + onyx + '"]').find('img');

        if ($(this).parents('.product__settings-row--outer').length > 0) {
            sliderItem.attr('data-type-choose', typeGlassProcessing);
            sliderItem.find('img').attr('src', imgObjGlass[`${typeGlassProcessing}`]);
            if (typeGlassProcessing == 0) {
                $('.js-slider-wrapper').hide();
                destroyCarousel();
            } else {
                $('.js-slider-wrapper').show();
                destroyCarousel(slickCarousel);
            }
        } else if ($(this).parents('.product__settings-row--inner').length > 0) {
            if (typeGlassProcessing == 0) {
                currentElementForChoose.attr('src', '');
            } else {
                currentElementForChoose.attr('src', imgObjGrid[`${typeGlassProcessing}`]);
            }
        }

    });
    // глухая / со стеклом
    body.on('click', '.product__settings-row--controls .controls-btn', function () {
        const glassShow = $(this).attr('data-glass-show');

        if (glassShow == 2) {
            body.find('[data-glass-show="1"]').show();
        } else {
            body.find('[data-glass-show="1"]').hide();
            body.find('.onyx-item').each(function (i, el) {
                if (i > 5 && i < 9) {
                    $(el).find('img').attr('src', '')
                }
            });
            $('.js-slider-wrapper').find('.settings__slider-item').removeClass('current')
        }
    });

    // // кастомный fancybox для оникса
    body.on('click', '.custom-fancybox', function () {
        const modal = body.find('div[data-block="custom-fancybox"]');
        const door = $('.product__photo-onyx');
        modal.addClass('show');
        door.clone().appendTo(modal.find('.onyx-preview__inner'));
        body.addClass('smoke').css({'padding-right': scrollWidth});
    });
    // закрываем onyx preview
    body.on('click', '#close-onyx-preview', function () {
        const modal = $(this).parent();
        modal.removeClass('show');
        modal.find('.onyx-preview__inner').empty();
        body.removeClass('smoke').css({'padding-right': '0px'});
    });



    // закрытия элементов
    $(document).on('mouseup', function (e) {
        const settings = $('.color__wrapper');
        const settingsBtn = $('.js-setting-input');
        const onyxModal = $('.onyx-preview');
        const target = e.target;

        // закрытие блока выбора цвета двери
        if (!settings.is(target) && settings.has(target).length === 0 && !settingsBtn.is(target) && settingsBtn.has(target).length === 0) {
            settings.fadeOut().removeClass('open');
            settingsBtn.removeClass('open');
        }
        // акрытие кастомного модал
        if (onyxModal.hasClass('show') && !onyxModal.is(target) && onyxModal.has(target).length === 0) {
            onyxModal.removeClass('show');
            onyxModal.find('.onyx-preview__inner').empty();
            body.removeClass('smoke').css({'padding-right': '0px'});
        }
    });


    function slickCarousel() {
        $('.js-slider-glass').slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1
        });
    }

    // slickCarousel();
    function destroyCarousel(callback) {
        if ($('.js-slider-glass').hasClass('slick-initialized')) {
            $('.js-slider-glass').slick('unslick');
        }
        callback();
    }
})