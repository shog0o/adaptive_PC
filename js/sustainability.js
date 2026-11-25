// JavaScript Document

$(document).ready(function(){
    var cnt=$('.sustainability_menu .tab').size(); // 지속가능경영 탭메뉴 개수

    // 모든 이미지를 숨긴 다음 첫 번째 탭 이미지만 표시
    $('.sustainability .contlist').hide();
    $('.sustainability .contlist:eq(0)').show();

    // 모든 탭의 활성 상태를 해제하고 첫 번째 탭만 활성화
    $('.sustainability_menu .tab').removeClass('active');
    $('.sustainability_menu .tab1').addClass('active');

    // 더 알아보기 링크를 클릭하면 탭 클릭 이벤트가 함께 실행되지 않도록 방지
    $('.sustainability_menu .more').click(function(e){
        e.stopPropagation();
    });

    // =========================
    // 지속가능경영 탭 클릭 처리
    // =========================
    $('.sustainability_menu .tab').click(function(){

        // 클릭한 탭이 전체 탭 중 몇 번째인지 확인: 0, 1, 2
        var ind=$(this).index('.sustainability_menu .tab');

        // 모든 이미지를 숨기고 클릭한 탭과 같은 순서의 이미지만 표시
        $('.sustainability .contlist').hide();
        $('.sustainability .contlist:eq('+ind+')').fadeIn('slow');

        // 모든 탭을 비활성화한 뒤 클릭한 탭만 활성화
        $('.sustainability_menu .tab').removeClass('active');
        $(this).addClass('active');
    });
});
