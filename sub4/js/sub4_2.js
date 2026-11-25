$(document).ready(function () {
    $('.small_photo button').click(function () {
        var clickImg = $(this).find('img');
        var bigImg = $('.big_photo img');
        var oldSrc = bigImg.attr('src');
        var oldAlt = bigImg.attr('alt');

        bigImg.fadeOut(200, function () {
            bigImg.attr('src', clickImg.attr('src'));
            bigImg.attr('alt', clickImg.attr('alt'));
            clickImg.attr('src', oldSrc);
            clickImg.attr('alt', oldAlt);
            bigImg.fadeIn(300);
        });
    });
});
