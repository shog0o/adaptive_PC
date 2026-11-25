// 연도 메뉴 클릭 시 해당 섹션으로 부드럽게 이동

$('.subNav a').click(function(e){ //각각의 연도 메뉴를 클릭하면... 
    e.preventDefault(); //href="#" 속성을 막아주는..메소드

    var value=0; //이동할 스크롤의 거리

    if($(this).hasClass('link1')){   //첫번째 메뉴를 클릭했냐?   if($(this).is('#link1')){
        value= $('#content .sec1').offset().top-90;  // 해당 콘테츠의 상단의 거리~~
    }else if($(this).hasClass('link2')){
        value= $('#content .sec2').offset().top-90;
    }else if($(this).hasClass('link3')){
        value= $('#content .sec3').offset().top-90;
    }else if($(this).hasClass('link4')){
        value= $('#content .sec4').offset().top-90;
    }else if($(this).hasClass('link5')){
        value= $('#content .sec5').offset().top-90;
    }else if($(this).hasClass('link6')){
        value= $('#content .sec6').offset().top-120;
    }
    
    
$("html,body").stop().animate({"scrollTop":value},1000);
});

//==========================//
// 년도 메뉴의 sticky 기능 구현//
//==========================//

$(document).ready(function(){
    var navTop = $('.history_nav').offset().top; //메뉴가 고정되는 위치
    var h1 = $('#content .sec2').offset().top - 120;
    var h2 = $('#content .sec3').offset().top - 120;
    var h3 = $('#content .sec4').offset().top - 120;
    var h4 = $('#content .sec5').offset().top - 120;
    var h5 = $('#content .sec6').offset().top - 120;
    var spyIndex = -1; //현재 활성화된 메뉴 번호
    var navTimer; //메뉴 축소가 끝난 뒤 sticky를 해제할 타이머

    //스크롤의 좌표가 변하면 실행
    $(window).on('scroll', function(){
        var scroll = $(window).scrollTop();

        //sticky menu 처리
        if(scroll > navTop){
            //축소 중 다시 스크롤을 내리면 축소 작업을 취소하고 다시 확장
            clearTimeout(navTimer);
            $('.navBox').removeClass('navReturn').css('top', '').addClass('navOn');
            //sticky 메뉴가 나타나면 GNB를 위쪽으로 부드럽게 숨김
            $('#headerArea').addClass('history_header_hide');

            //스크롤의 거리 범위에 따라 연도 메뉴 활성화
            if(scroll >= 0 && scroll < h1){
                if(spyIndex != 0){
                    $('.subNav li').find('a').removeClass('spy').removeAttr('aria-current');
                    $('.subNav li:eq(0)').find('a').addClass('spy').attr('aria-current', 'location');
                    spyIndex = 0;
                }
            }else if(scroll >= h1 && scroll < h2){
                if(spyIndex != 1){
                    $('.subNav li').find('a').removeClass('spy').removeAttr('aria-current');
                    $('.subNav li:eq(1)').find('a').addClass('spy').attr('aria-current', 'location');
                    spyIndex = 1;
                }
            }else if(scroll >= h2 && scroll < h3){
                if(spyIndex != 2){
                    $('.subNav li').find('a').removeClass('spy').removeAttr('aria-current');
                    $('.subNav li:eq(2)').find('a').addClass('spy').attr('aria-current', 'location');
                    spyIndex = 2;
                }
            }else if(scroll >= h3 && scroll < h4){
                if(spyIndex != 3){
                    $('.subNav li').find('a').removeClass('spy').removeAttr('aria-current');
                    $('.subNav li:eq(3)').find('a').addClass('spy').attr('aria-current', 'location');
                    spyIndex = 3;
                }
            }else if(scroll >= h4 && scroll < h5){
                if(spyIndex != 4){
                    $('.subNav li').find('a').removeClass('spy').removeAttr('aria-current');
                    $('.subNav li:eq(4)').find('a').addClass('spy').attr('aria-current', 'location');
                    spyIndex = 4;
                }
            }else if(scroll >= h5){
                if(spyIndex != 5){
                    $('.subNav li').find('a').removeClass('spy').removeAttr('aria-current');
                    $('.subNav li:eq(5)').find('a').addClass('spy').attr('aria-current', 'location');
                    spyIndex = 5;
                }
            }
        }else{
            //원래 메뉴가 있어야 할 화면 위치를 계산하여 축소 중에도 스크롤을 따라 이동
            var returnTop = navTop - scroll;

            //sticky 상태라면 현재 위치를 유지한 채 전체 너비에서 1400px로 축소
            if($('.navBox').hasClass('navOn')){
                $('.navBox').removeClass('navOn').addClass('navReturn').css('top', returnTop);

                //메뉴 축소와 동시에 GNB가 위에서 부드럽게 내려오기 시작
                $('#headerArea').removeClass('history_header_hide');

                //CSS의 너비 전환이 끝나면 원래 문서 흐름으로 복귀
                navTimer = setTimeout(function(){
                    $('.navBox').removeClass('navReturn').css('top', '');
                }, 220);
            }else if($('.navBox').hasClass('navReturn')){
                //축소 중 계속 스크롤하면 메뉴도 원래 자리와 같은 속도로 이동
                $('.navBox').css('top', returnTop);
            }else if(!$('.navBox').hasClass('navReturn')){
                //페이지 최초 진입 상태에서는 GNB가 보이도록 유지
                $('#headerArea').removeClass('history_header_hide');
            }

            $('.subNav li').find('a').removeClass('spy').removeAttr('aria-current');
            spyIndex = -1;
        }
    });
});



//==========================//
//      전체 연혁 탭 구성     //
//==========================//

var cnt = $('.tabs .tab').size(); //탭메뉴 개수

$('.tabs .contlist').hide(); //모든 탭 내용을 숨김
$('.tabs .contlist:eq(0)').show(); //첫 번째 탭 내용만 표시
$('.tabs .tab').removeClass('active'); //모든 탭메뉴 비활성화
$('.tabs .tab1').addClass('active'); //첫 번째 탭메뉴 활성화

$('.tabs .tab').click(function(e){ //각각의 탭메뉴를 클릭하면
    e.preventDefault(); //a 태그의 기본 이동을 막음

    var ind = $(this).index('.tabs .tab'); //클릭한 탭의 순서 확인

    $('.tabs .contlist').hide(); //모든 탭 내용을 숨김
    $('.tabs .contlist:eq('+ind+')').fadeIn('slow'); //해당 탭 내용만 표시
    $('.tabs .tab').removeClass('active'); //모든 탭메뉴 비활성화
    $(this).addClass('active'); //클릭한 탭메뉴만 활성화
});



//======================================================//
// 연혁 대표 이미지 카드 확대·축소 GSAP 스크롤 효과
// transform scale을 사용하지 않고 카드의 실제 너비와 높이를 변경해 텍스트 선명도 유지
//======================================================//

$(document).ready(function(){
    // GSAP 또는 ScrollTrigger를 불러오지 못하면 기존 이미지 상태를 유지
    if(typeof gsap==='undefined' || typeof ScrollTrigger==='undefined') return;

    // 브라우저에서 움직임 줄이기를 설정한 경우에는 효과를 실행하지 않음
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    $('.era_visual').each(function(){
        var visual=this; //이미지와 연도·문구를 포함한 카드 전체
        var era=$(this).closest('.history_era')[0]; //현재 카드가 속한 연혁 행
        var scaleValue=parseFloat(getComputedStyle(visual).getPropertyValue('--history-card-scale')) || 1.3;
        var basicWidth=visual.offsetWidth; //카드의 기본 너비
        var basicHeight=visual.offsetHeight; //카드의 기본 높이
        var largeWidth=basicWidth*scaleValue; //최대로 확장될 너비
        var largeHeight=basicHeight*scaleValue; //최대로 확장될 높이

        //연혁 행이 화면 중앙에 가까워지면 확대하고 최대 크기를 잠시 유지
        //유지 구간이 끝난 뒤 부드럽게 원래 크기로 축소
        gsap.timeline({
            scrollTrigger:{
                trigger:era,
                //화면 중앙 전후로 충분한 구간을 확보해 확대 상태가 짧게 끊기지 않도록 처리
                start:'center 80%',
                end:'center 20%',
                //스크롤을 급하게 움직여도 크기 변화가 살짝 따라오도록 부드럽게 처리
                scrub:.35
            }
        })
        .fromTo(visual,
            {width:basicWidth, height:basicHeight},
            {width:largeWidth, height:largeHeight, duration:.3, ease:'power1.inOut'}
        )
        //최대 확대 상태를 일정 구간 유지해 반환점이 튀어 보이지 않도록 처리
        .to(visual,
            {width:largeWidth, height:largeHeight, duration:.4, ease:'none'}
        )
        .to(visual,
            {width:basicWidth, height:basicHeight, duration:.3, ease:'power1.inOut'}
        );
    });
});
