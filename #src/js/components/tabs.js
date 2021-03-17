$(document).ready(function () {

    'use strict';

    const tab = $('.tabs-link');
    const tabLink = '.tabs-link';
    const tabContent = '.tabs-content';

    tab.on('click', function (e) {
        e.preventDefault();

        let thisTab = $(this).attr('href');
        let thisContent = $(this).attr('data-target');

        $(thisContent + ' ' + tabLink).removeClass('active');
        $(thisContent + ' ' + tabContent).removeClass('active');
        $(this).addClass('active');
        $(thisContent + ' ' + thisTab).addClass('active');

    });


    const body = $('body');
    body.on('click', '.tab-link', function () {
        const parent = $(this).parents('.tab');
        let dataBlock = $(this).attr('data-block');
        $(this).addClass('active').siblings().removeClass('active');
        parent.find('.tab-content[data-block="' + dataBlock + '"').addClass('active').siblings().removeClass('active');
    });


    const toggleBtn = () => {
        const btns = document.querySelectorAll('.btns-toggle .btn');
        const column = document.querySelector('.form-method__column-toggle');

        const toggleClassActive = (btns, btn) => {
            btns.forEach(btn => {
                btn.classList.remove('active');
            });
            btn.classList.add('active');
        };



        btns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                if (btn.classList.contains('btn-toggle')) {
                    column.classList.add('active');
                    toggleClassActive(btns, btn);

                } else {
                    column.classList.remove('active');
                    toggleClassActive(btns, btn);
                }
            });
        });
    };


    toggleBtn();
});