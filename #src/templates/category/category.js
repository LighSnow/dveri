$(function () {
    const body = $('body');
    // plugins
    // range slider
    let range = $(".js-range-slider"),
        inputFrom = $(".js-input-from"),
        inputTo = $(".js-input-to"),
        instance,
        min = 500,
        max = 70000,
        from = 500,
        to = 50000;

    range.ionRangeSlider({
        skin: "round",
        type: "double",
        min: min,
        max: max,
        from: 500,
        to: 50000,
        onStart: updateInputs,
        onChange: updateInputs
    });
    instance = range.data("ionRangeSlider");

    function updateInputs(data) {
        from = data.from;
        to = data.to;

        inputFrom.prop("value", from);
        inputTo.prop("value", to);
    }

    inputFrom.on("input", function () {
        let val = $(this).prop("value");

        // validate
        if (val < min) {
            val = min;
        } else if (val > to) {
            val = to;
        }

        instance.update({
            from: val
        });
    });

    inputTo.on("input", function () {
        let val = $(this).prop("value");

        // validate
        if (val < from) {
            val = from;
        } else if (val > max) {
            val = max;
        }

        instance.update({
            to: val
        });
    });

    // показать все checkbox
    body.on('click', '.category__filter-checkbox--more', function () {
        const text = $(this).text();
        const scrollPrevEl = $(this).parents('.category__filter-dropdown').find('.scroll');

        $(this).text(text === 'Показать всё' ? 'Скрыть' : 'Показать всё');
        if ($(this).prev().hasClass('category__filter-dropdown-wrapper')) {
            $(this).prev().toggleClass('show-all-block');
        }
        if (scrollPrevEl.length > 0) {
            !scrollPrevEl.hasClass('show-all-block') ?
                scrollPrevEl.mCustomScrollbar("destroy") : scrollPrevEl.mCustomScrollbar({theme: "dark-3"});
            scrollPrevEl.toggleClass('show-all-block');
        }
    });
});