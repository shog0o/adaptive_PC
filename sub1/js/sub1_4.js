// JavaScript Document

var cnt=$('.tabs .tab_menu a').size(); // 탭메뉴 개수

function tab_call(){
    $('.tabs .contlist').hide();
    $('.tabs .contlist:eq(0)').fadeIn('slow'); // 첫 번째 탭 내용만 표시

    $('.tabs .tab').click(function(e){
        e.preventDefault(); // a 태그의 href 기본 이동 방지

        var ind=$(this).index('.tabs .tab'); // 클릭한 탭의 순서: 0, 1

        $('.tabs .contlist').hide(); // 모든 탭 내용 숨기기
        $('.tabs .contlist:eq('+ind+')').fadeIn('slow'); // 선택한 탭 내용만 표시
        $('.tabs .tab').removeClass('active'); // 모든 탭메뉴 비활성화
        $(this).addClass('active'); // 클릭한 탭메뉴 활성화
    });
}

// 본사와 나주지사 지도가 그려진 다음 탭 기능 실행
setTimeout(tab_call,2000);
