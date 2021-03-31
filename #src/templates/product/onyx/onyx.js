$(function () {
    const body = $('body');
    // обьект картинок для слайдера обратботка стекла--рисунок
    const imgObj = {
        1: '../../../img/product/onyx/onyx-slider/onyx-slider-1-2.png',
        2: '../../../img/product/onyx/onyx-slider/onyx-slider-2-2.png',
        3: '../../../img/product/onyx/onyx-slider/onyx-slider-3-1.png',
        4: '../../../img/product/onyx/onyx-slider/onyx-slider-4-1.png',
        5: '../../../img/product/onyx/onyx-slider/onyx-slider-5-1.png'
    }

    // смена картинок для двери оник(обработка стекла--рисунок)
    const imgForOnyxDoor = {
        1: ['../../../img/product/onyx/onyx-slider/onyx-glass-1-1.png',
            '../../../img/product/onyx/onyx-slider/onyx-glass-1-2.png'],
        2: ['../../../img/product/onyx/onyx-slider/onyx-glass-2-1.png',
            '../../../img/product/onyx/onyx-slider/onyx-glass-2-2.png',
            '../../../img/product/onyx/onyx-slider/onyx-glass-2-3.png',
            '../../../img/product/onyx/onyx-slider/onyx-glass-2-4.png',
            '../../../img/product/onyx/onyx-slider/onyx-glass-2-5.png',
            '../../../img/product/onyx/onyx-slider/onyx-glass-2-6.png',],
        3: ['../../../img/product/onyx/onyx-slider/onyx-glass-3-1.png',
            '../../../img/product/onyx/onyx-slider/onyx-glass-3-2.png'],
        4: ['../../../img/product/onyx/onyx-slider/onyx-glass-4-1.png',
            '../../../img/product/onyx/onyx-slider/onyx-glass-4-2.png',
            '../../../img/product/onyx/onyx-slider/onyx-glass-4-3.png',
            '../../../img/product/onyx/onyx-slider/onyx-glass-4-4.png'],
        5: ['../../../img/product/onyx/onyx-slider/onyx-glass-5-1.png',
            '../../../img/product/onyx/onyx-slider/onyx-glass-5-2.png',
            '../../../img/product/onyx/onyx-slider/onyx-glass-5-3.png',
            '../../../img/product/onyx/onyx-slider/onyx-glass-5-4.png',
            '../../../img/product/onyx/onyx-slider/onyx-glass-5-5.png',]
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
    })

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

        $(this).addClass('current').siblings().removeClass('current');
        $(this).parents('.setting-row').find('#color-choose-input').val(currentColor);
    });

    // onyx смена двери
    body.on('click', '.settings__slider-item', function () {
        const onyx = $(this).attr('data-onyx-main');
        const onyxChoose = $(this).attr('data-onyx-choose');
        const onyxTypeGlass = $(this).attr('data-type-choose');
        const src = `../../../img/product/onyx/onyx-`;
        const currentElementForChoose = body.find('.onyx-item[data-onyx="' + onyx + '"]').find('img');

        // если нет обязательно 1 выбранного элемента двери
        if (!$(this).parents('.settings__slider').hasClass('required')) {
            // glass
            if ($(this).parents('.settings__slider').hasClass('js-slider-glass')) {
                currentElementForChoose.attr('src', `${src}glass-${onyxTypeGlass}-${onyxChoose}.png`);
            } else {
                // toggle
                if ($(this).hasClass('current')) {
                    $(this).removeClass('current').parents('.slick-slide');
                    currentElementForChoose.attr('src', '');
                } else {
                    $(this).addClass('current').parents('.slick-slide').siblings().find('.settings__slider-item').removeClass('current');
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
    });


    // выбор стеклянной или глухой оболочки двери
    body.on('click', '.controls-btn', function () {
        $(this).addClass('active').siblings().removeClass('active');
    });


    // слайдер обработка стекла
    body.on('click', '.glass-select .option', function () {
        const typeGlassProcessing = $(this).attr('data-value');
        const sliderItem = body.find('.js-slider-glass .settings__slider-item');

        sliderItem.attr('data-type-choose', typeGlassProcessing);
        sliderItem.find('img').attr('src', imgObj[`${typeGlassProcessing}`]);

        if (typeGlassProcessing == 0) {
            $('.js-slider-wrapper').hide();
            destroyCarousel();
        } else {
            const countImgInTheArray = imgForOnyxDoor[`${typeGlassProcessing}`].length;
            if (countImgInTheArray > 3) {
                destroyCarousel();
                slickCarousel();
                $('.js-slider-wrapper').show();

            } else {
                destroyCarousel();
                $('.js-slider-wrapper').show();
            }
        }
    });


    // закрытия элементов
    $(document).on('mouseup', function (e) {
        const settings = $('.color__wrapper');
        const settingsBtn = $('.js-setting-input');
        const target = e.target;

        // закрытие блока выбора цвета двери
        if (!settings.is(target) && settings.has(target).length === 0 && !settingsBtn.is(target) && settingsBtn.has(target).length === 0) {
            settings.fadeOut().removeClass('open');
            settingsBtn.removeClass('open');
        }
    });

    function slickCarousel() {
        $('.js-slider-glass').slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1
        });
    }

    function destroyCarousel(callback) {
        if ($('.js-slider-glass').hasClass('slick-initialized')) {
            $('.js-slider-glass').slick('unslick');
        }
    }
})