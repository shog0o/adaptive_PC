// 모든페이지 공통 js

// 스플래시 로고: 위에서 착지해 잠시 머문 뒤 헤더 로고 자리로 이동 (총 2초)
$(function () {
    var splash = $('#splash-screen');
    if(!splash.length)return;
    var splashLogo = splash.find('.splash-logo');
    var headerLogo = $('#headerArea .logo img');
    var splashPlayed = sessionStorage.getItem('splashPlayed');
    var logoWidth = 184;
    var logoHeight = 61;
    var centerTop = ($(window).height() - logoHeight) / 2;

    // 현재 탭에서 스플래시를 이미 실행했다면 바로 숨긴다.
    if (splashPlayed) {
        splash.hide();
        headerLogo.css('visibility', 'visible');
        return;
    }

    // 현재 탭에서 스플래시가 실행되었다는 값을 저장한다.
    // sessionStorage는 탭을 닫으면 초기화되므로 다음 방문에서는 다시 실행된다.
    sessionStorage.setItem('splashPlayed', 'true');

    // 스플래시 로고가 움직이는 동안 헤더 로고는 잠시 가린다.
    headerLogo.css('visibility', 'hidden');
    splashLogo.css({
        left: ($(window).width() - logoWidth) / 2,
        top: -logoHeight
    });

    // 0~0.6초: 위에서 내려와 살짝 튀었다가 가운데에 멈춘다.
    splashLogo.animate({top: centerTop + 12}, 350)
              .animate({top: centerTop - 6}, 150)
              .animate({top: centerTop}, 100);

    // 0.6~1.1초: 가운데에서 머문다.
    // 1.1~1.5초: 헤더 로고의 실제 위치와 크기로 빠르게 이동한다.
    setTimeout(function () {
        var target = headerLogo[0].getBoundingClientRect();

        splashLogo.animate({
            left: target.left,
            top: target.top,
            width: target.width
        }, 400);
    }, 1100);

    // 1.65초부터 흰 배경을 걷어 내고, 2초에 헤더 로고로 교체한다.
    setTimeout(function () {
        splash.addClass('fade-out');
    }, 1650);

    setTimeout(function () {
        headerLogo.css('visibility', 'visible');
        splash.hide();
    }, 2000);
});

// 예제 방식: 어두운 배경 위로 오른쪽 메뉴를 열고 닫는다.
var menuButton = $('#headerArea .menu_ham');
var gnb = $('#gnb');
var menuGroups = gnb.find('.main_menu > .depth1');
var menuScrollTop = 0; // 메뉴를 열기 전의 스크롤 위치

function closeMenu() {
    $('#headerArea .modal').fadeOut('fast');
    gnb.stop(true).animate({right: '-100%', opacity: 0}, 'fast', function () {
        gnb.css('visibility', 'hidden');
    });
    $('#headerArea').removeClass('mn_open');
    // 메뉴가 닫히면 원본 SVG의 active 상태도 해제한다.
    menuButton.find('.ham').removeClass('active');

    // 고정했던 뒤 페이지를 풀고 메뉴를 열기 전 위치로 되돌린다.
    $('body').removeClass('gnb_open').css({
        top: '',
        width: ''
    });
    $(window).scrollTop(menuScrollTop);

    menuButton.attr('aria-expanded', 'false');
    menuButton.find('.hidden').text('메뉴열기');
    gnb.attr('aria-hidden', 'true');
}

menuButton.on('click', function (event) {
    event.preventDefault();

    if ($('#headerArea').hasClass('mn_open')) {
        closeMenu();
    } else {
        // 현재 위치와 너비를 저장한 뒤 뒤 페이지가 움직이지 않도록 고정한다.
        menuScrollTop = $(window).scrollTop();
        $('body').addClass('gnb_open').css({
            top: -menuScrollTop,
            width: '100%'
        });

        $('#headerArea .modal').fadeIn('fast');
        gnb.css('visibility', 'visible').stop(true).animate({right: 0, opacity: 1}, 'fast');
        $('#headerArea').addClass('mn_open');
        // 인라인 onclick 대신 메뉴 열기와 SVG 변형을 한 곳에서 처리한다.
        menuButton.find('.ham').addClass('active');
        menuButton.attr('aria-expanded', 'true');
        menuButton.find('.hidden').text('메뉴닫기');
        gnb.attr('aria-hidden', 'false');
    }
});

$('#headerArea .modal').on('click', closeMenu);

// 1차 탭을 누르면 오른쪽에 해당 2차 메뉴를 보여준다.
function selectMenu(group) {
    menuGroups.removeClass('active');
    menuGroups.children('h3').children('a').attr('aria-expanded', 'false');
    group.addClass('active');
    group.children('h3').children('a').attr('aria-expanded', 'true');
}

menuGroups.children('h3').children('a').on('click', function (event) {
    event.preventDefault();
    selectMenu($(this).closest('.depth1'));
});

gnb.find('.gnb_close').on('click', function (event) {
    event.preventDefault();
    closeMenu();
    menuButton.focus();
});
// 아직 연결하지 않은 메뉴 링크는 화면 맨 위로 이동하지 않게 한다.
gnb.find('a[href="#"]').on('click', function (event) {
    event.preventDefault();
});

// 검색어에 맞는 메뉴와 하위 항목을 보여준다.
gnb.find('.gnb_search').on('submit', function (event) {
    event.preventDefault();
});

$('#gnb_keyword').on('input', function () {
    var keyword = $.trim($(this).val()).toLowerCase();
    var firstMatch = null;

    menuGroups.removeClass('active');
    menuGroups.children('h3').children('a').attr('aria-expanded', 'false');

    menuGroups.each(function () {
        var group = $(this);
        var titleMatch = group.children('h3').text().toLowerCase().indexOf(keyword) !== -1;
        var matchCount = 0;

        group.children('ul').children('li').each(function () {
            var match = titleMatch || $(this).text().toLowerCase().indexOf(keyword) !== -1;
            $(this).toggle(match);
            if (match) matchCount++;
        });

        group.toggle(matchCount > 0);
        if (matchCount > 0 && firstMatch === null) firstMatch = group;
    });

    gnb.find('.gnb_empty').toggleClass('show', firstMatch === null);
    if (firstMatch !== null) {
        selectMenu(firstMatch);
    }
});

$(document).on('keydown', function (event) {
    if (event.key === 'Escape' && $('#footerPolicyModal').attr('aria-hidden') !== 'false' && $('#headerArea').hasClass('mn_open')) {
        closeMenu();
        menuButton.focus();
    }
});
var smh = $('.visual').height() || 0;   // 비주얼 이미지 높이
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
        $(this).css({'background': 'rgba(255,255,255,.5)','border-bottom': '1px solid transparent'});
    }else{// 비주얼 영역을 지나간 경우        
        $(this).css({'background': '#fff','border-bottom': '1px solid rgba(0,0,0,.8)'});
    }
    on_off = false;
});

var visual_height = $('.visual').height() || 0;
var topButtonVisible = false; // TOP 버튼의 현재 표시 상태

// 현재 스크롤 위치를 원형 진행 게이지에 표시한다.
function topScrollProgress(){
    // 메뉴가 열려 있을 때는 뒤 페이지가 고정되므로 게이지를 갱신하지 않는다.
    if($('body').hasClass('gnb_open'))return;

    var scrollElement = document.scrollingElement || document.documentElement;
    var scrollTop = Math.max(0, scrollElement.scrollTop);
    var scrollTotal = Math.max(0, scrollElement.scrollHeight - scrollElement.clientHeight);
    var scrollRatio = scrollTotal > 0 ? scrollTop / scrollTotal : 1;

    // Android에서 내비게이션 바 높이 처리 차이로 문서의 스크롤 끝과
    // 실제 보이는 푸터 끝이 어긋나는 경우를 보완한다.
    var footer = document.getElementById('footerArea');
    var footerGap = null;
    var tolerance = 0;
    if(footer && footer.firstElementChild){
        var viewport = window.visualViewport;
        var visualBottom = viewport ? viewport.offsetTop + viewport.height : window.innerHeight;
        var screenBottom = Math.max(visualBottom, window.innerHeight, scrollElement.clientHeight);
        footerGap = footer.getBoundingClientRect().bottom - screenBottom;

        // 모든 브라우저에서 실제 푸터 끝이 보이면 정확히 100%로 처리한다.
        if(footerGap <= 2){
            scrollRatio = 1;
        }else if(/Android/i.test(navigator.userAgent)){
            // 안드로이드에만 적용하는 제한적인 보정: 화면 높이의 약 12%, 최대 100px.
            // 스크롤 위치도 끝에 충분히 가까울 때만 조기 완료로 간주한다.
            tolerance = Math.min(100, Math.max(40, screenBottom * 0.12));
            if(footerGap <= tolerance && scrollTotal - scrollTop <= tolerance){
                scrollRatio = 1;
            }
        }
    }

    if(scrollTotal > 0 && scrollTotal - scrollTop <= 2){
        scrollRatio = 1;
    }
    scrollRatio = Math.max(0, Math.min(1, scrollRatio));

    $('.progress_bar').each(function(){
        var circleLength = this.getTotalLength();
        if(scrollRatio === 1){
            $(this).css({'stroke-dasharray':'none', 'stroke-dashoffset':0});
        }else{
            $(this).css({
                'stroke-dasharray': circleLength + ' ' + circleLength,
                'stroke-dashoffset': circleLength * (1 - scrollRatio)
            });
        }
    });

    // URL에 ?topDebug=1을 붙인 경우에만 모바일 화면에 진단 수치를 표시한다.
    if(/(?:\?|&)topDebug=1(?:&|$)/.test(window.location.search)){
        var panel = document.getElementById('top-progress-debug');
        if(!panel){
            panel = document.createElement('div');
            panel.id = 'top-progress-debug';
            panel.style.cssText = 'position:fixed;z-index:99999;left:8px;bottom:105px;background:rgba(0,0,0,.88);color:white;padding:8px;font:12px/1.5 monospace;pointer-events:none;white-space:pre;border-radius:4px;text-align:left';
            document.body.appendChild(panel);
        }
        panel.textContent = 'ratio: ' + (scrollRatio * 100).toFixed(2) + '%'
            + '\nscrollTop: ' + scrollTop.toFixed(1)
            + '\nmaxScroll: ' + scrollTotal.toFixed(1)
            + '\nfooterGap: ' + (footerGap === null ? 'n/a' : footerGap.toFixed(1))
            + '\ntolerance: ' + tolerance.toFixed(1)
            + '\nclientHeight: ' + scrollElement.clientHeight
            + '\ninnerHeight: ' + window.innerHeight
            + '\nvisualHeight: ' + (window.visualViewport ? window.visualViewport.height.toFixed(1) : 'n/a');
    }
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
            $('#headerArea').css({'background': 'rgba(255,255,255,.5)','border-bottom': '1px solid transparent'});
        }
    };

    // 회사소개가 화면 중간쯤 들어오면 TOP 버튼을 보여준다.
    // 회사소개가 없는 페이지에서는 기존 비주얼 높이를 기준으로 한다.
    var topShowPoint = visual_height;
    if($('.about').length){
        topShowPoint = $('.about').offset().top - $(window).height() / 2;
    }

    if(scroll > topShowPoint && !topButtonVisible){
        $('.top_move').stop(true, false).fadeIn('slow');
        topButtonVisible = true;
    }else if(scroll <= topShowPoint && topButtonVisible){
        $('.top_move').stop(true, false).fadeOut('fast');
        topButtonVisible = false;
    }
});

// 화면 회전, 스크롤 정지, 뒤로 가기, 이미지 로드 후에도 진행률을 다시 계산한다.
$(window).on('resize scrollend load pageshow',topScrollProgress);

// 주소창 높이 변화는 window의 resize 없이 발생하기도 하므로 별도로 확인한다.
if(window.visualViewport){
    window.visualViewport.addEventListener('resize',topScrollProgress);
    window.visualViewport.addEventListener('scroll',topScrollProgress);
}

// 공통 푸터를 비동기로 불러오거나 이미지 높이가 늦게 결정되는 경우도 반영한다.
$(document).on('ajaxComplete.topProgress',topScrollProgress);
document.addEventListener('load',topScrollProgress,true);


// top 버튼 클릭시 상단으로 부드럽게 이동
$('.top_move').click(function(e){
    e.preventDefault();
    $('html, body').stop().animate({'scrollTop': 0}, 600);
});


$(document).ready(function(){
    var $select=$('.select');             // 패밀리사이트 전체 영역
    var $arrow=$select.find('.arrow');    // 목록을 열고 닫는 링크
    var $list=$select.find('.aList');     // 패밀리사이트 목록
    var isOpen=false;                     // false = 닫힘 / true = 열림

    // =========================
    // 패밀리사이트 목록 열기
    // =========================
    function openList(){
        isOpen=true; // 현재 상태를 열림으로 변경
        // 진행 중이거나 대기 중인 애니메이션을 정리한 후 목록 표시
        $list.stop(true, true).fadeIn(200);
        // 보조기기에 목록이 열렸다는 상태 전달
        $arrow.attr('aria-expanded','true');
        // 열린 상태에 맞게 화살표 아이콘 변경
        $arrow.find('span').html('<i class="fa-solid fa-chevron-down"></i>');
    }

    // =========================
    // 패밀리사이트 목록 닫기
    // =========================
    function closeList(){
        if(!isOpen)return; // 이미 닫혀 있으면 아래 코드를 실행하지 않음
        isOpen=false; // 현재 상태를 닫힘으로 변경
        // 진행 중이거나 대기 중인 애니메이션을 정리한 후 목록 숨김
        $list.stop(true, true).fadeOut(200);
        // 보조기기에 목록이 닫혔다는 상태 전달
        $arrow.attr('aria-expanded','false');
        // 닫힌 상태에 맞게 화살표 아이콘 변경
        $arrow.find('span').html('<i class="fa-solid fa-chevron-up"></i>');
    }

    // =========================
    // Family Site 링크 클릭 처리
    // =========================
    $arrow.on('click',function(e){
        e.preventDefault();  // href="#"으로 인해 화면 상단으로 이동하는 동작 방지
        e.stopPropagation(); // 클릭 이벤트가 document까지 전달되는 것을 방지
        // 현재 상태에 따라 열기와 닫기를 번갈아 실행
        if(isOpen){
            closeList();
        }else{
            openList();
        }
    });

    // =========================
    // 패밀리사이트 내부 클릭 처리
    // =========================
    $select.on('click',function(e){
        // 내부 클릭이 바깥 영역 클릭으로 판단되지 않도록 이벤트 전달 중지
        e.stopPropagation();
    });

    // =========================
    // 패밀리사이트 바깥 영역 클릭 처리
    // =========================
    $(document).on('click',function(){
        // 페이지의 다른 영역을 클릭하면 목록 닫기
        closeList();
    });

    // =========================
    // 키보드 Tab 포커스 처리
    // =========================
    $select.on('focusout',function(){
        // 포커스 이동이 끝난 다음 현재 포커스 위치 확인
        setTimeout(function(){
            // 패밀리사이트 내부에 포커스가 없으면 목록 닫기
            if(!$select.find(document.activeElement).length){
                closeList();
            }
        },0);
    });

    // =========================
    // Esc 키 처리
    // =========================
    $select.on('keydown',function(e){
        if(e.key==='Escape'){
            closeList();  // 목록 닫기
            $arrow.focus(); // 'Family Site' 링크로 포커스 되돌리기
        }
    });
});


$(document).ready(function(){
    var policyModalHtml=''
        +'<div class="footer_policy_modal" id="footerPolicyModal" role="dialog" aria-modal="true" aria-labelledby="footerPolicyTitle" aria-hidden="true">'
            +'<div class="footer_policy_inner">'
                +'<button class="footer_policy_close" type="button" aria-label="팝업 닫기">'
                    +'<span aria-hidden="true">×</span>'
                +'</button>'
                +'<p class="footer_policy_title" id="footerPolicyTitle"></p>'
                +'<div class="footer_policy_scroll" tabindex="0">'
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

    // 공통 JS를 다시 불러와도 모달과 이벤트가 중복되지 않도록 한다.
    if(!$('#footerPolicyModal').length)$('body').append(policyModalHtml);
    var $modal=$('#footerPolicyModal');
    var lastPolicyFocus=null;
    var savedBodyStyle=null;
    var savedScrollTop=0;
    var menuWasOpen=false;

    // 링크 순서 대신 href로 개인정보와 이메일 내용을 정확히 구분한다.
    var policySelector='a[href="#privacyPolicyText"],a[href="#emailPolicyText"]';
    $(policySelector).attr({'aria-haspopup':'dialog','aria-controls':'footerPolicyModal'});

    function closePolicyModal(){
        if($modal.attr('aria-hidden')==='true')return;
        $modal.stop(true,true).fadeOut(180).attr('aria-hidden','true');
        if(savedBodyStyle===null)document.body.removeAttribute('style');
        else document.body.setAttribute('style',savedBodyStyle);
        if(!menuWasOpen)window.scrollTo(0,savedScrollTop);
        if(lastPolicyFocus)lastPolicyFocus.focus();
    }

    // 나중에 불러온 헤더·푸터의 링크도 작동하도록 document에 이벤트를 위임한다.
    $(document).off('click.footerPolicy',policySelector).on('click.footerPolicy',policySelector,function(event){
        event.preventDefault();
        var panelId=$(this).attr('href');
        lastPolicyFocus=this;
        savedScrollTop=window.pageYOffset||document.documentElement.scrollTop;
        savedBodyStyle=document.body.getAttribute('style');
        menuWasOpen=$('body').hasClass('gnb_open');
        // 메뉴가 이미 배경을 고정한 상태라면 그 상태를 유지한다.
        if(!menuWasOpen){
            $('body').css({position:'fixed',top:-savedScrollTop,left:0,width:'100%',overflow:'hidden'});
        }
        $('#footerPolicyTitle').text(panelId==='#privacyPolicyText'?'개인정보처리방침':'이메일무단수집거부');
        $modal.find('.footer_policy_panel').hide().filter(panelId).show();
        $modal.find('.footer_policy_scroll').scrollTop(0);
        $modal.stop(true,true).fadeIn(180).attr('aria-hidden','false');
        $modal.find('.footer_policy_close').focus();
    });
    $modal.off('.footerPolicy').on('click.footerPolicy',function(event){
        if(event.target===this||$(event.target).closest('.footer_policy_close').length)closePolicyModal();
    });
    // Tab 포커스를 모달 안에서 순환시키고 Esc는 모달만 닫도록 한다.
    $(document).off('keydown.footerPolicy').on('keydown.footerPolicy',function(event){
        if($modal.attr('aria-hidden')==='true')return;
        if(event.key==='Escape'||event.keyCode===27){
            event.preventDefault();
            closePolicyModal();
        }else if(event.key==='Tab'||event.keyCode===9){
            var $focusable=$modal.find('button,a[href],input,select,textarea,[tabindex="0"]').filter(':visible');
            var first=$focusable[0],last=$focusable[$focusable.length-1];
            if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
            else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
        }
    });
});
