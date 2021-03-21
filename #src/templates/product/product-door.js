$(function () {
 // global variables
 const body = $('body');
 const scrollWidth = $(window).outerWidth() - $(window).width();
 const mediaWidth = $(window).width();
 if (mediaWidth < 1200) {
  $('.product__slider-for').slick({
   slidesToShow: 1,
   slidesToScroll: 1,
   arrows: false,
   fade: true,
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
  });
 }
 $(".rating-block").rateYo({
  rating: 3.5,
  starWidth: '15px',
  normalFill: "#dbdbdb",
  ratedFill: "#fe8a61",
  spacing: "2px",
 });






 // comment preview photo (5)
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

 // comment fancybox
 $('[data-fancybox="gallery"]').fancybox({
  loop: true,
  keyboard: true,
 });

 //product icons (color, glazing)
 body.on('click', '.product-icon', function () {
  productIconChoise($(this));
 });

 // product card set choice
 body.on('click', '.choice-set', function () {
  const currentSet = $(this).text();
  const newTitle = $(this).parents('.product__choose').find('.current-set');
  if($(this).hasClass('without-text')) {
   $('#without-text').show();
  } else {
   newTitle.text(`В комплекте: ${currentSet}`);
  }
  
 });


 //popyp product preview
 body.on('click', '.modal-link', function () {
  const thisBtn = $(this).attr('data-modal');
  const thisName = $(this).find('span').text();

  body.addClass('smoke').css({
   'padding-right': scrollWidth + 'px'
  });
  body.find('.modal-block[data-modal="' + thisBtn + '"]').addClass('active');

  if ($('.modal-block').hasClass('popup-additional__wrapper') && $(this).parents('.product__tools-items').length > 0) {
   $('.modal-block').find('.current-title').text(thisName);
  }

 })
 body.on('click', '.close-btn', function () {
  $(this).parents('.modal-block').removeClass('active');
  if (!$('.popup-additional__wrapper').hasClass('active')) {
   body.removeClass('smoke').css({
    'padding-right': '0px'
   });
  }
 });


 //closes blocks
 $(document).on('mouseup', function (e) {
  const modal = body.find('.modal-block');
  const additionalContent = body.find('.additional-popup');
  const additionalModal = body.find('.popup-additional__wrapper');
  const addAdditionalModal = body.find('.add-addittional-popup');
  // close modalPreview
  if (modal.hasClass('active') && !modal.is(e.target) && modal.has(e.target).length === 0) {
   modal.removeClass('active');
   body.removeClass('smoke').css({
    'padding-right': '0px'
   });
  }
  // close scroll popup additional
  if (addAdditionalModal.hasClass('active')) {
   if (!addAdditionalModal.is(e.target) && addAdditionalModal.has(e.target).length === 0) {
    addAdditionalModal.removeClass('active')
   }
  } else if (additionalModal.hasClass('active')) {
   if (!additionalContent.is(e.target) && additionalContent.has(e.target).length === 0) {
    additionalModal.removeClass('active');
    body.removeClass('smoke').css({
     'padding-right': '0px'
    });
   }
  }
 });







 const productIconChoise = (elem) => {
  elem.addClass('current').siblings().removeClass('current');
 }
});