$(document).ready(function() {
    $(".number-picker").dpNumberPicker({
        min: 1, // Minimum value.
        max: false, // Maximum value.
        value: 333, // Initial value
        step: 1, // Incremental/decremental step on up/down change.
        format: false,
        editable: true,
        addText: "+",
        subText: "-",
        formatter: function (val) {
            return val + " шт";
        },
        beforeIncrease: function () {
        },
        afterIncrease: function () {
        },
        beforeDecrease: function () {
        },
        afterDecrease: function () {
        },
        beforeChange: function () {
        },
        afterChange: function () {
        },
        onMin: function () {
        },
        onMax: function () {
        }
    });
});