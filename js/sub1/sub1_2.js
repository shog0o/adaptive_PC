// 서브 내비게이션을 클릭하면 해당 연혁 영역으로 부드럽게 이동한다.
$('.subNav a').click(function (e) {
    // a 태그의 기본 링크 이동을 막고 아래에서 계산한 위치로 이동한다.
    e.preventDefault();

    // 클릭한 메뉴에 대응하는 콘텐츠의 세로 위치를 저장한다.
    var value = 0;

    // 고정 헤더에 내용이 가려지지 않도록 영역 위치에서 헤더 여백을 뺀다.
    if ($(this).hasClass('link1')) {
        value = $('#content .sec1').offset().top - 90;
    } else if ($(this).hasClass('link2')) {
        value = $('#content .sec2').offset().top - 90;
    } else if ($(this).hasClass('link3')) {
        value = $('#content .sec3').offset().top - 90;
    } else if ($(this).hasClass('link4')) {
        value = $('#content .sec4').offset().top - 90;
    } else if ($(this).hasClass('link5')) {
        value = $('#content .sec5').offset().top - 90;
    } else if ($(this).hasClass('link6')) {
        // 마지막 영역은 화면 아래쪽 여유를 고려해 간격을 조금 더 확보한다.
        value = $('#content .sec6').offset().top - 120;
    }

    // 진행 중인 스크롤 애니메이션을 멈춘 뒤 선택한 영역으로 이동한다.
    $('html, body').stop().animate({ scrollTop: value }, 1000);
});


// 연혁 탭의 전체 개수를 저장한다.
var cnt = $('.tabs .tab').size();

// 페이지가 처음 열렸을 때 첫 번째 연혁만 보이도록 초기 상태를 설정한다.
$('.tabs .contlist').hide();
$('.tabs .contlist:eq(0)').show();
$('.tabs .tab').removeClass('active');
$('.tabs .tab1').addClass('active');

// 연혁 탭을 클릭하면 같은 순서의 콘텐츠를 화면에 표시한다.
$('.tabs .tab').click(function (e) {
    // 탭 링크의 기본 이동을 막는다.
    e.preventDefault();

    // 클릭한 탭이 전체 탭 중 몇 번째인지 0부터 시작하는 번호로 구한다.
    var ind = $(this).index('.tabs .tab');

    // 기존 콘텐츠를 모두 숨기고 클릭한 탭과 같은 번호의 콘텐츠만 나타낸다.
    $('.tabs .contlist').hide();
    $('.tabs .contlist:eq(' + ind + ')').fadeIn('slow');

    // 모든 탭의 활성 상태를 해제한 뒤 현재 클릭한 탭만 활성화한다.
    $('.tabs .tab').removeClass('active');
    $(this).addClass('active');
});