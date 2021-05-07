$(function () {
    // глобальные переменные
    const body = $('body');
    const scrollWidth = $(window).outerWidth() - $(window).width();
    const mediaWidth = $(window).width();


    // плагины старт
    /* This is basic - uses default settings */

    // для галлереи
    $('[data-fancybox="gallery"]').fancybox({
        loop: true,
        keyboard: true,
    });

    // для попап
    $(".link-for-fancybox-modal").fancybox({
        'hideOnContentClick': true,
        touch: false,
        afterShow: function (callback) {
            document.querySelectorAll('.scrollY').forEach(function (el, i) {
                new SimpleBar(el, {
                    autoHide: false,
                });
            });
            const settings = {
                slidesToShow: 5,
                slidesToScroll: 1,
                arrows: true,
                responsive: [
                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 4,
                        }
                    },
                    {
                        breakpoint: 500,
                        settings: {
                            slidesToShow: 3,
                        }
                    },
                    {
                        breakpoint: 460,
                        settings: {
                            slidesToShow: 3,
                            arrows: false
                        }
                    }
                ]
            };
            if ($('.preview-basket-add-duo').hasClass('fancybox-content')) {
                $('.duo__slider-basket--inner').slick(settings);
            } else if ($('.preview-popup-duo').hasClass('fancybox-content')) {
                $('.duo__slider-modal--inner').slick(settings);
            }
        },
        afterClose: function () {
            if ($('.duo__slider-basket--inner').hasClass('slick-initialized')) {
                $('.duo__slider-basket--inner').slick('unslick');
            } else if ($('.duo__slider-modal--inner').hasClass('slick-initialized')) {
                $('.duo__slider-modal--inner').slick('unslick');
            }
        }
    });

    // для картинок
    $(".fancybox-link-img").fancybox({
        'hideOnContentClick': true
    });


    // для слайдера
    //инициализируем галерею ДО запуска слайдера
    const gallery = $('.slider__for-item .fancybox-link-slider');
    //при клике на ссылку в слайде запускаем галерею
    gallery.on('click', function (e) {
        e.preventDefault();
        //узнаём индекс слайда без учёта клонов
        let trueIndex;
        if (mediaWidth > 1199) {
            let totalSlides = +$(this).parents('.product__slider-for').slick("getSlick").slideCount,
                dataIndex = +$(this).parents('.slider__for-item').data('slick-index');

            switch (true) {
                case (dataIndex < 0):
                    trueIndex = totalSlides + dataIndex;
                    break;
                case (dataIndex >= totalSlides):
                    trueIndex = dataIndex % totalSlides;
                    break;
                default:
                    trueIndex = dataIndex;
            }
            $.fancybox.open(gallery, {
                loop: true
            }, trueIndex);
        } else {
            $.fancybox.open(gallery, {
                loop: true
            });
        }
        //вызывается элемент галереи, соответствующий индексу слайда
        return false;
    });


    // слайдеры карточка товара
    if (mediaWidth > 1199) {
        if ($('.product').hasClass('product-onyx')) {
            $('.product__slider-for').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
            });
        } else {
            $('.product__slider-for').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                fade: true,
                asNavFor: '.product__slider-nav'
            });

            $('.product__slider-nav').slick({
                slidesToShow: 5,
                slidesToScroll: 1,
                asNavFor: '.product__slider-for',
                dots: false,
                centerMode: true,
                focusOnSelect: true,
                vertical: true,
                infinite: true
            })
        }
    }

    if (mediaWidth <= 1200) {
        $(".rating-block.static-rating").starRating({readOnly: true, starSize: 16});
        $(".rating-block.no-static-rating").starRating({initialRating: 3, starSize: 16});
        $(".rating-block.empty-rating").starRating({initialRating: 0, starSize: 16, readOnly: true});
    } else {
        $(".rating-block.static-rating").starRating({readOnly: true});
        $(".rating-block.no-static-rating").starRating({initialRating: 3});
        $(".rating-block.empty-rating").starRating({initialRating: 0, readOnly: true});
    }


    $(".text-comment-hide").elimore({maxLength: 322});
    // плагины конец
    //<a class="more-comment-text" href="#">Читать польностью</a>

    // фото на превью в комментарии (5)
    const itemsCont = $('.product__comment-images').children();
    const items = document.querySelectorAll('.comment-img-item');
    const counterCreate = document.createElement('span');
    if (itemsCont.length > 5) {
        items.forEach(function (el, i) {
            switch (true) {
                case (i > 4):
                    el.style.display = 'none';
                    break;
                case (i === 4):
                    el.appendChild(counterCreate).classList.add('counter-commit-photo');
                    document.querySelector('.counter-commit-photo').innerHTML = `+${itemsCont.length - 4}`;
                    break;
            }
        });
    }

    // доп нажите
    body.on('click', '.product__tools-item', function () {
        const text = $(this).find('span').text();
        body.find('.additional-popup__inner-title.current-title').text(text)
    });

    //product icons (color, glazing)
    body.on('click', '.product-icon', function () {
        productIconChoise($(this));
    });

    body.on('click', '.select-me', function () {
        let likeCounter = +$(this).find('.interview-btn-counter').text();

        $(this).find('.interview-btn-counter').text(likeCounter + 1);
        $(this).addClass('current').removeClass('select-me').siblings().removeClass('select-me').addClass('sibling-selected');
    });
    // выбор комплекта (смена цены и названия)
    body.on('click', '.choice-set', function () {
        const currentSet = $(this).text();
        const parent = $(this).parents('.product__choose');
        const newTitle = parent.find('.change-text-set');
        const startText = parent.find('.without-set-text').text();
        const counterPrice = parent.find('.price-counter-sum');
        const setPrice = +$(this).attr('data-price');
        const totalPrice = +counterPrice.attr('data-start-price')

        if ($(this).hasClass('without-text')) {
            newTitle.text(startText);
            counterPrice.text(counterPrice.attr('data-start-price'))
        } else {
            newTitle.text(`${currentSet}`);
            counterPrice.text((totalPrice + setPrice))
        }
    });

    //test
    body.on('click', '.link-for-fancybox-modal', function (e) {

    })

    // показываем элементы скрытые функцией showSomeItems
    body.on('click', '.show-all-btn', function () {
        const elem = $(this).parents('.hidden-body-simple').find('div[data-show="hidden"]');
        const text = $(this).text();

        elem.toggle();
        $(this).text(text === 'Показать всё' ? 'Скрыть' : 'Показать всё');
    });

    // скролл на отзывы
    body.on('click', '.js-scroll-reviews', function () {
        window.scrollTo({
            top: body.find('.product__review').position().top + 50,
            behavior: 'smooth'
        });
    });
    // функции вызова
    const showSomeItems = (num, el) => {
        el.each((i, elem) => {
            if (i > num) {
                $(elem).hide().addClass('hidden-elem-simple').attr('data-show', 'hidden');
            }
        })
    }
    // скрываем ненужные элементы и открываем их по кнопке '.show-all-btn'
    showSomeItems(7, $('.product__characteristics-row'));

    // // переключатель current класса дочерних элементов
    const productIconChoise = (elem) => {
        elem.addClass('current').siblings().removeClass('current');
    }

    window.addEventListener('resize', function (e) {
        $('.product__slider-nav').find('.slick-track').css({'transform': 'translate3d(0px, 0, 0px)'});
    });
});
