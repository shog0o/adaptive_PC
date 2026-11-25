// 메인 비주얼 슬라이드
// 전체 슬라이드 수와 일시 정지 상태를 저장한다.
var visualTotal = $('.visual .hero_swiper .swiper-slide').length;
var visualPaused = false;

// 페이지 표시의 전체 개수 부분을 채운다. (예: 04)
$('.visual .visual_page .total').text('0' + visualTotal);

// 슬라이드가 바뀔 때 진행 막대를 처음부터 다시 움직인다.
function visualProgress() {
    $('.visual .visual_progress span').stop().css('width', '0').animate({ width: '100%' }, 5000, 'linear');
}

// Swiper를 만들고 한 장씩 5초 간격으로 자동 재생한다.
var visualSwiper = new Swiper('.visual .hero_swiper', {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    // 이전/다음 화살표를 연결한다.
    navigation: {
        nextEl: '.visual .visual_next',
        prevEl: '.visual .visual_prev'
    },
    autoplay: {
        delay: 5000,
        disableOnInteraction: false
    },
    // 처음 표시할 때와 슬라이드가 바뀔 때 현재 번호를 갱신한다.
    on: {
        init: function () {
            $('.visual .visual_page .current').text('0' + (this.realIndex + 1));
            visualProgress();
        },
        slideChange: function () {
            $('.visual .visual_page .current').text('0' + (this.realIndex + 1));
            if (!visualPaused) visualProgress();
        }
    }
});

$('.visual .visual_prev, .visual .visual_next').on('click', function (event) {
    // href="#" 클릭으로 페이지 맨 위로 이동하지 않게 한다.
    event.preventDefault();
});

// 일시 정지 버튼을 누를 때마다 자동 재생과 진행 막대를 멈추거나 다시 시작한다.
$('.visual .visual_pause').on('click', function (event) {
    event.preventDefault();

    if (visualPaused) {
        // 정지 중이었다면 다시 재생한다.
        visualSwiper.autoplay.start();
        visualProgress();
        $(this).text('Ⅱ').attr('aria-label', '슬라이드 일시 정지');
        visualPaused = false;
    } else {
        // 재생 중이었다면 현재 위치에서 멈춘다.
        visualSwiper.autoplay.stop();
        $('.visual .visual_progress span').stop();
        $(this).text('▶').attr('aria-label', '슬라이드 재생');
        visualPaused = true;
    }
});


// 사업분야 슬라이드
// 한 번에 카드 한 장을 보여주고 아래 점으로 현재 위치를 표시한다.
var businessSwiper = new Swiper('.business_swiper', {
    slidesPerView: 1,
    spaceBetween: 0,
    pagination: {
        el: '.business_pagination',
        clickable: true
    }
});


// 아테라 슬라이드
// 사업분야와 같은 방식으로 이미지 카드 한 장씩 이동한다.
var arteraSwiper = new Swiper('.artera_swiper', {
    slidesPerView: 1,
    spaceBetween: 0,
    pagination: {
        el: '.artera_pagination',
        clickable: true
    }
});
// 메인 사업분야 검색창 검색 힌트
$(function () {
    var form = $('.business_search');
    var input = $('#business-keyword');
    var hintList = $('#business-hints');
    var hints = ['건축', '토목', '주택', '아테라', '금호'];

    // 메인 페이지에 검색창이 있을 때만 힌트 기능을 실행한다.
    if (!input.length) return;

    function closeHints() {
        hintList.stop(true, true).slideUp(180, function () {
            hintList.prop('hidden', true);
        });
        input.attr('aria-expanded', 'false');
    }

    // 입력한 글자와 일치하는 검색어를 최대 5개까지 보여준다.
    function showHints() {
        var keyword = $.trim(input.val()).toLowerCase();
        var html = '';
        var count = 0;

        for (var i = 0; i < hints.length; i++) {
            if (keyword === '' || hints[i].toLowerCase().indexOf(keyword) >= 0) {
                html += '<li role="option"><button type="button" data-name="' + hints[i] + '">' + hints[i] + '</button></li>';
                count++;

                if (count === 5) break;
            }
        }

        hintList.html(html);

        if (count > 0) {
            hintList.prop('hidden', false).stop(true, true).slideDown(180);
            input.attr('aria-expanded', 'true');
        } else {
            closeHints();
        }
    }

    // 기본 힌트 뒤에 JSON의 실제 프로젝트명을 중복 없이 추가한다.
    $.getJSON('./data/sub2_4.json', function (data) {
        $.each(data.project, function (index, project) {
            if ($.inArray(project.Name, hints) === -1) {
                hints.push(project.Name);
            }
        });
    });

    input.on('focus keyup', function (e) {
        if (e.keyCode !== 27) showHints();
    });

    input.on('keydown', function (e) {
        if (e.keyCode === 27) closeHints();
    });

    hintList.on('click', 'button', function () {
        input.val($(this).attr('data-name'));
        closeHints();
        form.submit();
    });

    $(document).on('click', function (e) {
        if (!$(e.target).closest('.business_search').length) {
            closeHints();
        }
    });
});