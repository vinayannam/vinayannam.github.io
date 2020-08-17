(function ($) {
    "use strict";

    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: (target.offset().top)
                }, 1000, "easeInOutExpo");
                return false;
            }
        }
    });
    $('.js-scroll-trigger').click(function () {
        $('.navbar-collapse').collapse('hide');
    });
    $('body').scrollspy({
        target: '#sideNav'
    });

    // var abrevations = {
    //     'IIIT': 'International Institute of Technology',
    //     // 'International Institute of Technology': 'IIIT',
    //     'ASU': 'Arizona State University',
    //     // 'Arizona State University': 'ASU',
    //     'NER': 'Natural Entity Recognition',
    //     // 'Natural Entity Recognition': 'NER',
    //     'CTF': 'Capture the Flag',
    //     // 'Capture the Flag': 'CTF'
    // }

    var abrevations = {
        'IIIT': 'International Institute of Technology',
        'ASU': 'Arizona State University',
        'NER': 'Natural Entity Recognition',
        'CTF': 'Capture the Flag',
        'CNN': 'Convolutional Neural Network',
        'SA': 'Short Answer',
        'LA': 'Long Answer',
        'IOT': 'Internet of Things',
        'ERP': 'Enterprise Resource Planning',
        'ADAA': 'Advanced Design and Analysis of Algorithms'
    }
    for (var k in abrevations) {
        abrevations[abrevations[k]] = k
    }

    $('.expand').mouseenter(function () {
        $(this).text(abrevations[$(this).text()])
        $(this).css('color', 'yellow')
    }).mouseleave(function () {
        $(this).text(abrevations[$(this).text()])
        $(this).css('color', 'white')
    })


})(jQuery);
var figure = $(".video").hover(hoverVideo, hideVideo);

function hoverVideo(e) {
    $('video', this).get(0).play();
}

function hideVideo(e) {
    $('video', this).get(0).pause();
}