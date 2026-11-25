// JavaScript Document

var career=$('.career_item'); // 건축, 토목플랜트, 주택, 안전 항목

// 페이지에 처음 진입하면 모든 항목을 닫힌 상태로 설정
career.removeClass('active show').addClass('hide');
career.find('.career_detail').hide();
career.find('.career_more').attr('aria-expanded','false');

// =========================
// 대분류 아코디언
// =========================
$('.career_more').click(function(){
    var myCareer=$(this).parents('.career_item'); // 클릭한 버튼이 들어 있는 항목
    var icon=myCareer.find('.career_icon img, .detail_icon img'); // 요약·상세 아이콘

    if(myCareer.hasClass('hide')){
        // 닫힌 항목을 클릭하면 해당 항목 열기
        myCareer.removeClass('hide').addClass('show active');
        myCareer.find('.career_detail').slideDown(300);
        $(this).attr('aria-expanded','true').attr('aria-label','세부 직무 닫기');

        // 흑백 아이콘을 컬러 이미지로 변경
        icon.each(function(){
            $(this).attr('src',$(this).attr('data-color'));
        });
    }else{
        // 열린 항목을 다시 클릭하면 해당 항목 닫기
        myCareer.removeClass('show active').addClass('hide');
        myCareer.find('.career_detail').slideUp(300);
        $(this).attr('aria-expanded','false').attr('aria-label','세부 직무 열기');

        // 컬러 아이콘을 흑백 이미지로 변경
        icon.each(function(){
            $(this).attr('src',$(this).attr('data-gray'));
        });
    }
});

// =========================
// 각 대분류 내부의 세부 직무 탭
// =========================
$('.role_list a').click(function(e){
    e.preventDefault(); // a 태그의 href="#" 기본 이동 방지

    var ind=$(this).parent().index(); // 클릭한 탭의 순서
    var detail=$(this).parents('.career_detail'); // 현재 탭이 들어 있는 상세 패널

    // 현재 상세 패널 안의 탭만 변경
    detail.find('.role_list li').removeClass('active');
    $(this).parent().addClass('active');

    // 클릭한 탭과 순서가 같은 내용만 표시
    detail.find('.role_content').removeClass('active');
    detail.find('.role_content:eq('+ind+')').addClass('active');
});
