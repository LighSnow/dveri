$(function () {
 // глобальные переменные
 const body = $('body');
 const scrollWidth = $(window).outerWidth() - $(window).width();
 const mediaWidth = $(window).width();

 console.log(scrollWidth);
 // плагины старт
 /* This is basic - uses default settings */



 $("a.fancybox-link-img").fancybox({
  'hideOnContentClick': true
 });

 //инициализируем галерею ДО запуска слайдера
 const gallery = $('.slider__for-item .fancybox-link');
 //при клике на ссылку в слайде запускаем галерею
 $('.slider__for-item .fancybox-link').on('click', function (e) {
  e.preventDefault();
  //узнаём индекс слайда без учёта клонов
  let totalSlides = +$(this).parents('.product__slider-for').slick("getSlick").slideCount,
   dataIndex = +$(this).parents('.slider__for-item').data('slick-index'),
   trueIndex;
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
  //вызывается элемент галереи, соответствующий индексу слайда
  $.fancybox.open(gallery, {
   loop: true
  }, trueIndex);
  return false;
 });


 // слайдеры карточка товара
 if (mediaWidth < 1200) {
  $('.product__slider-for').slick({
   slidesToShow: 1,
   slidesToScroll: 1,
   arrows: false,
   fade: true,
  });
 } else {
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
    vertical: true
   })
  }
 }

 let starSvg =
  '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16.44" height="17.59" viewBox="0 0 16.44 17.59">' +
  '<defs>' +
  '<style>' +
  '.cls-1 {' +
  'fill: #fe8a61;' +
  'fill-rule: evenodd;' +
  'filter: url(#filter);}' +
  '</style>' +
  '<filter id="filter" x="1433" y="2666.41" width="16.44" height="17.59" filterUnits="userSpaceOnUse">' +
  '<feOffset result="offset" dy="1" in="SourceAlpha"/>' +
  '<feGaussianBlur result="blur"/>' +
  '<feFlood result="flood" flood-opacity="0.18"/>' +
  '<feComposite result="composite" operator="in" in2="blur"/>' +
  '<feBlend result="blend" in="SourceGraphic"/>' +
  '</filter>' +
  '</defs>' +
  '<path id="ико_copy_6" data-name="ико copy 6" class="cls-1" d="M1286.94,2717.54m162.51-44.84-5.68-.87-2.55-5.43-2.54,5.43-5.69.87,4.12,4.22-0.97,5.96,5.08-2.81,5.09,2.81-0.97-5.96Z" transform="translate(-1433 -2666.41)"/>' +
  '</svg>'

 $(".rating-block.static-rating").rateYo({
  rating: 3.5,
  starWidth: '15px',
  normalFill: "#dbdbdb",
  ratedFill: "#fe8a61",
  spacing: "2px",
  readOnly: true,
  starSvg: starSvg

 });

 $(".rating-block.no-static-rating").rateYo({
  rating: 3.5,
  starWidth: '15px',
  normalFill: "#dbdbdb",
  ratedFill: "#fe8a61",
  spacing: "2px",
  starSvg: starSvg
 });



 // comment fancybox
 $('[data-fancybox="gallery"]').fancybox({
  loop: true,
  keyboard: true,
 });


 // плагины конец

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

 //product icons (color, glazing)
 body.on('click', '.product-icon', function () {
  productIconChoise($(this));
 });

 body.on('click', '.interview-btn', function () {
  productIconChoise($(this));
 })
 // выбор комплекта (смена цены и названия)
 body.on('click', '.choice-set', function () {
  const currentSet = $(this).text();
  const newTitle = $(this).parents('.product__choose').find('.change-text-set');
  const startText = $(this).parents('.product__choose').find('.without-set-text').text();
  let counterPrice = $(this).parents('.product__choose').find('.price-counter-sum');
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

 // класс открытия popup
 body.on('click', '.modal-link', function () {
  const thisBtn = $(this).attr('data-modal');
  const thisName = $(this).find('span').text();

  body.find('.modal-block[data-modal="' + thisBtn + '"]').addClass('active');

  $('#scroll-row').css({
   'display': 'block',
   'width': '30px'
  });

  body.addClass('smoke').css({
   'padding-right': scrollWidth + 'px'
  });

  if(mediaWidth < 1200 && $(this).parents('.modal-block').hasClass('popup-additional__wrapper')) {
   body.find('.additional-popup').addClass('smoke')
  }

  if($(this).parents('.additional-popup').length > 0) {
   $('.additional-popup').addClass('smoke')
  }

  if ($('.modal-block').hasClass('popup-additional__wrapper') && $(this).parents('.product__tools-items').length > 0) {
   $('.modal-block').find('.current-title').text(thisName);
  }
  // video
  if(thisBtn == 'video-modal') {
   $('#video-product').attr('src', $(this).attr('data-src-video'));
  }
 });

 // класс закрытия popup
 body.on('click', '.close-btn', function () {
  $(this).parents('.modal-block').removeClass('active');
  body.find('.additional-popup').removeClass('smoke')
  if (!$('.popup-additional__wrapper').hasClass('active')) {
   body.removeClass('smoke').css({
    'padding-right': '0px'
   });
  }
  if ($(this).parents('.modal-block').hasClass('added-popup') && body.find('.preview-popup').hasClass('active')) {
   body.find('.preview-popup').removeClass('active')
  }
 });

 // показываем элементы скрытые функцией showSomeItems
 body.on('click', '.show-all-btn', function () {
  const elem = $(this).parents('.hidden-body-simple').find('div[data-show="hidden"]');
  const text = $(this).text();

  elem.toggle();
  $(this).text(text == 'Показать всё' ? 'Скрыть' : 'Показать всё');
 });

 // закрытие блоков нажатием за пределы
 $(document).on('mouseup', function (e) {
  const modal = body.find('.modal-block');
  const additionalContent = body.find('.additional-popup');
  const additionalModal = body.find('.popup-additional__wrapper');
  const addAdditionalModal = body.find('.add-addittional-popup');
  const addedModal = body.find('.added-popup');
  const previewModal = body.find('.preview-popup');
  const videoModal = body.find('.video-popup');
  let axisPositionX = e.pageX;


  // закрытиеmodalPreview
  if (modal.hasClass('active') && !modal.is(e.target) && modal.has(e.target).length === 0) {
   if(modal.hasClass('video-popup')) {
    videoModal.find('iframe').attr('src', '')
   }
   modal.removeClass('active');
   body.removeClass('smoke').css({
    'padding-right': '0px'
   });
  }
  // быстрый просмотр + добавление в корзину
  if (addedModal.hasClass('active') && previewModal.hasClass('active')) {
   if (!addedModal.is(e.target) && addedModal.has(e.target).length === 0) {
    addedModal.removeClass('active');
   }
  } else if (previewModal.hasClass('active') && !addedModal.hasClass('active')) {
   if (!previewModal.is(e.target) && previewModal.has(e.target).length === 0) {
    previewModal.removeClass('active');
    body.removeClass('smoke').css({
     'padding-right': '0px'
    });
   }
  }

  // закрытие scroll popup additional
  if (addAdditionalModal.hasClass('active')) {
   // закрытие добавление в корзину в попапе с доп элементами
   if (!addAdditionalModal.is(e.target) && addAdditionalModal.has(e.target).length === 0) {
    addAdditionalModal.removeClass('active');
    additionalContent.removeClass('smoke')
   }
  } else if (additionalModal.hasClass('active')) {
   // закрытие попап с просмотром доп эементов
   if (!additionalContent.is(e.target) && additionalContent.has(e.target).length === 0 && axisPositionX < mediaWidth - scrollWidth) {

    additionalModal.removeClass('active');
    body.removeClass('smoke').css({
     'padding-right': '0px'
    });
   }
  }
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
 showSomeItems(1, $('.product__table-item'));
 showSomeItems(7, $('.product__characteristics-row'));

 // переключатель current класса дочерних элементов
 const productIconChoise = (elem) => {
  elem.addClass('current').siblings().removeClass('current');
 }
});