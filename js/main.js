jQuery(document).ready(function ($) {
    $("body").on('click', 'ul.side-nav li a', function () {
        if ($(window).width() <= 992) {
            $('.button-collapse').sideNav('hide');
        }
    });
    $(".button-collapse").sideNav();
});

function initParallax () {
	$('.parallax').parallax();
}
