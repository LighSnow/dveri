$(function () {
	const body = $('body');
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
		const src = `../../../img/product/onyx/onyx-`
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
		$(this).addClass('active').siblings().removeClass('active')
	});


	// слайдер обработка стекла
	body.on('click', '.glass-select .option', function () {
		const typeGlassgProcessing = $(this).attr('data-value');
		const slider = body.find('.js-slider-glass .settings__slider-item');
		if (typeGlassgProcessing !== 0) {
			slider.attr('data-type-choose', typeGlassgProcessing);
			sliderGlass(body.find('.js-slider-glass'));
			$('.js-slider-glass')[0].slick.refresh()
			body.find('.js-slider-glass').parents('.js-slider-wrapper').show();
			
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


	const sliderGlass = (el) => {
		$(el).slick({
			slidesToShow: 3,
			slidesToScroll: 1,
			arrows: true,
		});
	}
})