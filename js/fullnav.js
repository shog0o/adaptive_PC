var smh = $('.visual').height();   // 비주얼 이미지 높이
var on_off = false;                // false = 마우스 아웃 / true = 마우스 오버


// =========================
// Header mouse enter
// =========================

$('#headerArea').mouseenter(function(){

    $(this).css({'background': 'rgba(255,255,255,.85)','border-bottom': '1px solid rgba(255,255,255,.55)'});
    //헤더영역의 텍스트 색상과 로고이미지 경로 등을 교체
    on_off = true;
});


// =========================
// Header mouse leave
// =========================

$('#headerArea').mouseleave(function(){
    var scroll = $(window).scrollTop(); //스크롤의 거리

    if(scroll < smh - 50){// 비주얼 영역 위        
        $(this).css({'background': 'rgba(255,255,255,.5)','border-bottom': 'none'});
    }else{// 비주얼 영역을 지나간 경우        
        $(this).css({'background': '#fff','border-bottom': '1px solid rgba(0,0,0,.08)'});
    }
    on_off = false;
});


// =========================
// Scroll
// =========================

var visual_height = $('.visual').height();

// TOP 버튼 원형 게이지의 전체 길이
// circle의 반지름이 28.5이므로 원 둘레는 약 179.1이다.
var topCircleLength=179.1;

// 현재 스크롤 위치를 원형 진행 게이지에 표시하는 함수
function topScrollProgress(){
    var scrollTop=$(window).scrollTop(); // 현재 세로 스크롤 위치
    var scrollTotal=$(document).height()-$(window).height(); // 끝까지 이동할 수 있는 전체 거리
    var scrollRatio=0; // 0은 페이지 시작, 1은 페이지 끝

    // 문서가 화면보다 길 때만 나누어 0으로 나누는 오류를 방지한다.
    if(scrollTotal>0){
        scrollRatio=scrollTop/scrollTotal;
    }

    // 계산 결과가 0~1 범위를 벗어나지 않도록 제한한다.
    if(scrollRatio<0)scrollRatio=0;
    if(scrollRatio>1)scrollRatio=1;

    // 페이지 시작에서는 원을 숨기고, 끝으로 갈수록 원 전체가 보이게 한다.
    $('.progress_bar').css('stroke-dashoffset',topCircleLength-(topCircleLength*scrollRatio));
}

// 새로고침했을 때 현재 스크롤 위치부터 게이지를 표시한다.
topScrollProgress();

$(window).on('scroll', function(){
    var scroll = $(window).scrollTop(); //스크롤의 거리를 리턴하는 함수

    // 스크롤할 때마다 TOP 버튼의 원형 게이지를 갱신한다.
    topScrollProgress();

    if(scroll > smh - 50){
        $('#headerArea').css({'background': '#fff','border-bottom': '1px solid rgba(0,0,0,.08)'});
    }else{
        if(on_off == false){
            $('#headerArea').css({'background': 'rgba(255,255,255,.5)','border-bottom': 'none'});
        }
    };

    //탑버튼 처리

    if(scroll>visual_height){ //
        $('.top_move').fadeIn('slow');  //top보여라~~~~
    }else{
        $('.top_move').fadeOut('fast');//top안보여라~~~~
    }    
});

// 브라우저 크기가 바뀌면 전체 스크롤 거리도 달라지므로 다시 계산한다.
$(window).on('resize',function(){
    topScrollProgress();
});


// top 버튼 클릭시 상단으로 부드럽게 이동
$('.top_move').click(function(e){
    e.preventDefault();
    $('html, body').stop().animate({'scrollTop': 0}, 600);
});


// =========================
// 2depth 열기 / 닫기
// =========================

    $('ul.dropdownmenu').hover(
       function() { 
          $('.dropdownmenu .menu ul').fadeIn('normal',function(){$(this).stop();}); //모든 서브를 다 열어라
          $('#headerArea').animate({height:300},'fast').clearQueue();
       },function() {
          $('.dropdownmenu .menu ul').hide(); //모든 서브를 다 닫아라
          $('#headerArea').animate({height:90},'fast').clearQueue();
     });


// =========================
// 1depth hover 효과
// =========================


    $('.dropdownmenu .menu').hover( //각각의 1depth 메뉴에 호버하면 
    function() { 
        $('.depth1',this).addClass('active'); //
    },function() {
        $('.depth1',this).removeClass('active');
    });


// =========================
// 키보드 Tab 처리
// =========================

     //tab 처리
     $('.dropdownmenu .menu .depth1').on('focus', function () {        
        $('.dropdownmenu .menu ul').slideDown('normal');
        $('#headerArea').animate({height:300},'fast').clearQueue();
     });

    $('.dropdownmenu .m6 li:last').find('a').on('blur', function () {        
        $('.dropdownmenu .menu ul').slideUp('fast');
        $('#headerArea').animate({height:90},'normal').clearQueue();
    });


// ========================================================
// 푸터 이메일무단수집거부 / 개인정보처리방침 모달 팝업
// ========================================================

$(document).ready(function(){
    // 모든 페이지에서 공통으로 사용하는 푸터의 두 링크를 선택한다.
    var policyLink=$('#footerArea .footer_link a');
    var emailPolicyLink=$('#footerArea .footer_link li:first-child a');
    var privacyPolicyLink=$('#footerArea .footer_link li:last-child a');
    var lastPolicyFocus=null; // 팝업을 닫았을 때 돌아갈 링크를 저장한다.

    // 푸터가 없는 페이지에서는 아래 모달 코드를 실행하지 않는다.
    if(policyLink.length<2)return;

    // 긴 약관 마크업은 공통 JavaScript에서 한 번만 만들고 모든 페이지의 body 끝에 삽입한다.
    // 따라서 index와 모든 sub 페이지가 같은 내용과 같은 동작을 사용한다.
    var policyModalHtml=''
        +'<div class="footer_policy_modal" id="footerPolicyModal" role="dialog" aria-modal="true" aria-labelledby="footerPolicyTitle" aria-hidden="true">'
            +'<div class="footer_policy_inner">'
                +'<button class="footer_policy_close" type="button" aria-label="팝업 닫기">'
                    +'<i class="fa-solid fa-xmark"></i>'
                +'</button>'
                +'<p class="footer_policy_title" id="footerPolicyTitle"></p>'
                +'<div class="footer_policy_scroll">'
                    +'<div class="footer_policy_panel email_policy" id="emailPolicyText">'
                        +'<p>본 사이트에 게시된 이메일 주소가 전자우편 수집 프로그램이나 그 밖의 기술적 장치를 이용하여 무단으로 수집되는 것을 거부합니다.</p>'
                        +'<p>또한 본 사이트에 게시된 이메일 주소의 무단 수집·판매·유통 및 영리 목적의 이용을 금지합니다.</p>'
                    +'</div>'
                    +'<div class="footer_policy_panel privacy_policy" id="privacyPolicyText">'
                        +'<p>금호건설은 이용자의 개인정보를 중요하게 생각하며, 관련 법령을 준수하기 위하여 다음과 같이 개인정보처리방침을 안내합니다.</p>'
                        +'<p class="policy_notice">본 개인정보처리방침은 포트폴리오 제작을 위한 예시 콘텐츠이며 실제 금호건설의 개인정보처리방침과 다를 수 있습니다.</p>'
                        +'<strong class="footer_policy_subtitle">제1조 개인정보의 처리 목적</strong>'
                        +'<p>회사는 다음의 목적을 위하여 개인정보를 처리합니다.</p>'
                        +'<ol><li>고객 문의 및 상담에 대한 답변</li><li>서비스 이용에 따른 본인 확인</li><li>고객 의견 및 문의사항 처리</li><li>서비스 개선 및 이용 통계 분석</li></ol>'
                        +'<p>수집된 개인정보는 위 목적 외의 용도로 이용되지 않으며, 이용 목적이 변경되는 경우 사전에 안내하고 필요한 동의를 받습니다.</p>'
                        +'<strong class="footer_policy_subtitle">제2조 처리하는 개인정보 항목</strong>'
                        +'<p>회사는 고객 문의 및 서비스 제공을 위해 다음과 같은 개인정보를 수집할 수 있습니다.</p>'
                        +'<ul><li>이름</li><li>이메일 주소</li><li>전화번호</li><li>문의 내용</li><li>서비스 이용 기록 및 접속 정보</li></ul>'
                        +'<p>필수 항목과 선택 항목은 서비스 이용 과정에서 별도로 안내합니다.</p>'
                        +'<strong class="footer_policy_subtitle">제3조 개인정보의 처리 및 보유기간</strong>'
                        +'<p>회사는 개인정보의 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.</p>'
                        +'<p>다만 관련 법령에 따라 일정 기간 보관이 필요한 경우에는 해당 법령에서 정한 기간 동안 개인정보를 보관할 수 있습니다.</p>'
                        +'<strong class="footer_policy_subtitle">제4조 개인정보의 제3자 제공</strong>'
                        +'<p>회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다.</p>'
                        +'<p>다만 다음의 경우에는 예외로 할 수 있습니다.</p>'
                        +'<ol><li>이용자가 사전에 동의한 경우</li><li>법령에 따라 개인정보 제공이 요구되는 경우</li><li>서비스 제공을 위해 필요한 범위 내에서 관련 업무를 위탁하는 경우</li></ol>'
                        +'<strong class="footer_policy_subtitle">제5조 개인정보 처리의 위탁</strong>'
                        +'<p>회사는 원활한 서비스 제공을 위하여 개인정보 처리 업무의 일부를 외부 업체에 위탁할 수 있습니다.</p>'
                        +'<p>개인정보 처리 업무를 위탁하는 경우 관련 법령에 따라 개인정보가 안전하게 관리될 수 있도록 필요한 사항을 규정하고 관리·감독합니다.</p>'
                        +'<strong class="footer_policy_subtitle">제6조 개인정보의 파기</strong>'
                        +'<p>회사는 개인정보 보유기간이 경과하거나 개인정보 처리 목적이 달성된 경우 해당 정보를 지체 없이 파기합니다.</p>'
                        +'<p>전자적 파일 형태의 개인정보는 복구가 불가능한 방법으로 삭제하며, 문서 형태의 개인정보는 분쇄 또는 소각 등의 방법으로 파기합니다.</p>'
                        +'<strong class="footer_policy_subtitle">제7조 이용자의 권리</strong>'
                        +'<p>이용자는 언제든지 자신의 개인정보에 대하여 다음과 같은 권리를 행사할 수 있습니다.</p>'
                        +'<ul><li>개인정보 열람 요청</li><li>개인정보 수정 및 정정 요청</li><li>개인정보 삭제 요청</li><li>개인정보 처리 정지 요청</li></ul>'
                        +'<p>관련 요청은 개인정보 보호 담당부서를 통해 접수할 수 있습니다.</p>'
                        +'<strong class="footer_policy_subtitle">제8조 개인정보의 안전성 확보조치</strong>'
                        +'<p>회사는 개인정보가 분실, 도난, 유출, 변조 또는 훼손되지 않도록 다음과 같은 보호조치를 시행합니다.</p>'
                        +'<ol><li>개인정보 접근 권한 관리</li><li>개인정보 보호를 위한 내부 관리계획 수립</li><li>보안 프로그램 운영 및 정기적인 점검</li><li>개인정보 처리 시스템에 대한 접근 통제</li></ol>'
                        +'<strong class="footer_policy_subtitle">제9조 개인정보 보호책임자</strong>'
                        +'<p>회사는 개인정보 처리와 관련한 문의 및 불만 처리를 위하여 개인정보 보호책임자를 지정하고 있습니다.</p>'
                        +'<ul><li>담당부서: 개인정보 보호 담당부서</li><li>연락처: 02-0000-0000</li><li>이메일: privacy@example.com</li></ul>'
                        +'<strong class="footer_policy_subtitle">제10조 개인정보처리방침의 변경</strong>'
                        +'<p>본 개인정보처리방침은 관련 법령 및 회사 정책에 따라 변경될 수 있으며, 변경사항이 있는 경우 웹사이트를 통해 안내합니다.</p>'
                        +'<p class="policy_date">시행일자: 2026년 9월 18일</p>'
                    +'</div>'
                +'</div>'
            +'</div>'
        +'</div>';

    $('body').append(policyModalHtml);

    var policyModal=$('#footerPolicyModal');       // 화면 전체를 덮는 모달 영역
    var policyPanel=$('.footer_policy_panel');     // 이메일 및 개인정보 내용 영역
    var policyTitle=$('#footerPolicyTitle');       // 클릭한 링크에 따라 바뀌는 팝업 제목
    var policyClose=$('.footer_policy_close');     // 팝업 닫기 버튼

    // 푸터 링크가 모달을 여는 버튼이라는 정보를 보조기기에 전달한다.
    emailPolicyLink.attr({
        'href':'#emailPolicyText',
        'aria-haspopup':'dialog',
        'aria-controls':'footerPolicyModal'
    });

    privacyPolicyLink.attr({
        'href':'#privacyPolicyText',
        'aria-haspopup':'dialog',
        'aria-controls':'footerPolicyModal'
    });

    // 선택한 제목과 내용으로 공통 모달을 여는 함수
    function openPolicyModal(title,panelId,openLink){
        lastPolicyFocus=openLink; // 닫은 뒤 돌아갈 현재 링크 저장

        policyTitle.text(title);
        policyPanel.hide();
        $(panelId).show();

        policyModal.stop().fadeIn(200).attr('aria-hidden','false');
        $('body').css('overflow','hidden');
        policyClose.focus();
    }

    // 모달을 닫고 팝업을 열었던 푸터 링크로 포커스를 돌려준다.
    function closePolicyModal(){
        policyModal.stop().fadeOut(200).attr('aria-hidden','true');
        $('body').css('overflow','');

        if(lastPolicyFocus){
            $(lastPolicyFocus).focus();
        }
    }

    // 이메일무단수집거부 링크 클릭
    emailPolicyLink.click(function(e){
        e.preventDefault();
        openPolicyModal('이메일무단수집거부','#emailPolicyText',this);
    });

    // 개인정보처리방침 링크 클릭
    privacyPolicyLink.click(function(e){
        e.preventDefault();
        openPolicyModal('개인정보처리방침','#privacyPolicyText',this);
    });

    // X 닫기 버튼 클릭
    policyClose.click(function(){
        closePolicyModal();
    });

    // 흰색 팝업 바깥의 어두운 배경을 클릭하면 닫는다.
    policyModal.click(function(e){
        if(e.target==this){
            closePolicyModal();
        }
    });

    // 키보드의 ESC 키를 눌러도 팝업을 닫을 수 있다.
    $(document).keydown(function(e){
        if(e.keyCode==27 && policyModal.is(':visible')){
            closePolicyModal();
        }
    });
});





