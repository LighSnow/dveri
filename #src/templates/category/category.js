$(function () {
    const body = $('body');
    // plugins
    // range slider
    let range = $('.js-range-slider'),
        inputFrom = $('.js-input-from'),
        inputTo = $('.js-input-to'),
        instance,
        min = 500,
        max = 70000,
        from = 500,
        to = 70000;

    range.ionRangeSlider({
        skin: 'round',
        type: 'double',
        min: min,
        max: max,
        from: 500,
        to: 70000,
        onStart: updateInputs,
        onChange: updateInputs,
        onFinish: updateValPriceFilter,
    });
    instance = range.data('ionRangeSlider');

    function updateInputs(data) {
        from = data.from;
        to = data.to;

        inputFrom.val(from);
        inputTo.val(to);
    }

    function updateValPriceFilter(data) {
        const wrapperForFilters = body.find('.category__main-filters');
        $('#price-from').text(data.from);
        $('#price-to').text(data.to);
        let html = `<div class="category__main-filters__item active category__main-filters__price">` +
            `<span>Цена: от <span id="price-from">${data.from}</span> до <span id="price-to">${data.to}</span>` +
            `</span><span class="category__main-filters__item--delete"></span></div>`;
        if (wrapperForFilters.find('.category__main-filters__price').length === 0) {
            wrapperForFilters.prepend(html);
        }
        if (window.innerWidth < 1200) {
            body.find('.category__filter-discharge').show();
        }
        if (wrapperForFilters.find('.category__main-filters__item--reset').length === 0) {
            addFilterHtml('', 'reset-btn', wrapperForFilters);
        }
    }

    function resetInputs() {
        inputFrom.val(inputFrom.attr('value'));
        inputTo.val(inputTo.attr('value'));
    }

    inputFrom.on('input', function () {
        let val = $(this).val();
        // validate
        if (val < min) {
            val = min;
        } else if (val > to) {
            val = to;
        }

        instance.update({
            from: val
        });
        $('#price-from').text(val);
    });

    inputTo.on('input', function () {
        let val = $(this).val();
        // validate
        if (val < from) {
            val = from;
        } else if (val > max) {
            val = max;
        }

        instance.update({
            to: val
        });
        $('#price-to').text(val);
    });

    // скрываем лишние global filters
    $('.toggle__item').each((i, el) => {
        if (i > 14) {
            if (!$(el).hasClass('toggle__item--hide')) {
                $(el).hide().addClass('hidden-item');
            }
        }
    });

    // показать все checkbox
    body.on('click', '.category__filter-checkbox--more', function () {
        const text = $(this).text();
        const scrollPrevEl = $(this).parents('.category__filter-dropdown').find('.scroll');

        $(this).text(text === 'Показать всё' ? 'Скрыть' : 'Показать всё');
        !scrollPrevEl.hasClass('show-all-block') ?
            scrollPrevEl.mCustomScrollbar("destroy") : scrollPrevEl.mCustomScrollbar({theme: "dark-3"});
        scrollPrevEl.toggleClass('show-all-block');
    });

    // добавляем выбранный фильт на страницу
    body.on('click', '.choice__line-radio', function () {
        const parent = $(this).parents('.category__filter-dropdown');
        const allCheckInput = parent.find('input[data-choose="all"]');
        const inputsFilter = parent.find('.choice__line-radio:not([data-choose="all"]');
        const currentFiltersWrapper = body.find('.category__main-filters');
        const textCurrent = $(this).next().text();

        // добавляем кнопку сбросить фильтры
        if (currentFiltersWrapper.find('.category__main-filters__item--reset').length === 0) {
            addFilterHtml('', 'reset-btn', currentFiltersWrapper);
        }

        if (window.innerWidth < 1200) {
            body.find('.category__filter-discharge').show();
        }
        // если нажат input Все
        if ($(this).attr('data-choose')) {
            // input Все checked
            if ($(this).prop('checked')) {
                inputsFilter.prop('checked', true);
                inputsFilter.each((i, el) => {
                    if (!$(el).attr('data-choose') && !$(el).parent().hasClass('active')) {
                        $(el).parent().addClass('active');
                        addFilterHtml($(el).next().text(), 'filter', currentFiltersWrapper);
                    }
                });
            } else { // input Все !checked
                inputsFilter.prop('checked', false);
                body.find('.category__main-filters__item').each((i, el) => {
                    parent.find('.category__filter-label').each((i, elem) => {
                        if ($(el).text().trim() === $(elem).text().trim()) {
                            $(el).remove();
                            $(elem).parent().removeClass('active');
                        }
                    })
                });
                if (currentFiltersWrapper.find('.category__main-filters__item').length < 2) {
                    currentFiltersWrapper.find('.category__main-filters__item--reset').remove();
                }
            }
            parent.find('.category__filter-checkbox--more').trigger('click');
        } else { // нажатие любого другово input
            $(this).parent().toggleClass('active');
            allCheckInput.prop('checked', false);

            if ($(this).parent().hasClass('active')) {
                addFilterHtml($(this).next().text(), 'filter', currentFiltersWrapper);
            } else {
                currentFiltersWrapper.find('.category__main-filters__item:contains(' + textCurrent + ')').remove();
                if (currentFiltersWrapper.find('.category__main-filters__item').length < 2) {
                    currentFiltersWrapper.find('.category__main-filters__item--reset').remove();
                    if (window.innerWidth < 1200) {
                        body.find('.category__filter-discharge').hide();
                    }
                }
            }
        }
    });

    // убираем фильт по кнопке х
    body.on('click', '.category__main-filters__item--delete', function () {
        const parent = $(this).parents('.category__main-filters');
        const currentFilter = $(this).parent().text().trim();
        if (parent.find('.category__main-filters__item').length < 3) {
            parent.empty();
        }
        if (!$(this).parents('.category__main-filters__item').hasClass('category__main-filters__item--reset')) {
            body.find('.category__filter-label:contains(' + currentFilter + ')')
                .prev('.choice__line-radio').prop('checked', false).parent().removeClass('active');
            body.find('.category__filter-label:contains(' + currentFilter + ')').parents('.category__filter-dropdown')
                .find('[data-choose="all"]').prop('checked', false);
            $(this).parent().remove();
        }
    });

    // убираем все фильтры
    body.on('click', '#reset-all-filters', function () {
        const filtersParent = body.find('.category__filter');

        $(this).parents('.category__main-filters').empty();
        filtersParent.find('.choice__line-radio').prop('checked', false).parent().removeClass('active');
        instance.update({
            from: 500,
            to: 70000,
        }, resetInputs());
    });


    $('.toggle__list').on('click', '.toggle__item--hide', function (e) {
        const text = $(this).find('.toggle__item-text').text();
        const imgSpan = $(this).find('.toggle-item-img');

        $(this).find('.toggle__item-text').text(text === 'Показать' ? 'Скрыть' : 'Показать');
        if (imgSpan.hasClass('show')) {
            imgSpan.removeClass('show').addClass('hide');
            body.find('.toggle__list').find('.toggle__item').show();
        } else {
            imgSpan.removeClass('hide').addClass('show');
            body.find('.toggle__list').find('.toggle__item.hidden-item').hide();
        }
    });

    // планшет сброс фильтров
    body.on('click', '.category__filter-discharge', function () {
        $('#reset-all-filters').trigger('click');
        $(this).hide();
    });

    const addFilterHtml = (text, block, wrapperForFilters) => {
        let html = '';
        switch (block) {
            case 'filter':
                html = `<div class="category__main-filters__item active"><span>${text}</span>` +
                    `<span class="category__main-filters__item--delete"></span></div>`;
                wrapperForFilters.prepend(html);
                break;
            case 'reset-btn':
                html = `<div class="category__main-filters__item category__main-filters__item--reset active">` +
                    `<span>Сбросить фильтры</span><span id="reset-all-filters"` +
                    `class="category__main-filters__item--delete"></span></div>`;
                wrapperForFilters.append(html);
                break;
        }
    };
});