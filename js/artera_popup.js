// JavaScript Document

$(document).ready(function(){
    var $popupOpen=$('.artera_popup_open');          // 아테라 팝업을 여는 화살표 버튼
    var $popup=$('#arteraPopup');                    // 팝업 전체 영역
    var $popupDim=$popup.find('.popup_dim');         // 화면 전체를 덮는 반투명 검정 배경
    var $popupPanel=$popup.find('.artera_popup_layout'); // 오른쪽에서 이동하는 실제 팝업 패널
    var $popupClose=$popup.find('.close');           // 팝업 내부 CLOSE 버튼
    var lastFocus=null;                              // 팝업을 열기 전에 포커스된 요소 저장
    var isPopupOpen=false;                           // false = 닫힘 / true = 열림

    // =========================
    // 아테라 팝업 열기
    // =========================
    function openPopup(){
        if(isPopupOpen)return; // 이미 열려 있으면 중복 실행하지 않음

        isPopupOpen=true; // 현재 팝업 상태를 열림으로 변경
        lastFocus=document.activeElement; // 닫을 때 돌아갈 기존 포커스 위치 저장

        // open 클래스를 추가하면 CSS가 두 가지 효과를 함께 실행
        // 1. 반투명 검정 배경의 opacity가 0에서 1로 변경
        // 2. 팝업 패널이 오른쪽에서 화면 안으로 이동
        $popup.addClass('open');

        // 보조기기에 팝업이 열렸다는 상태 전달
        $popup.attr('aria-hidden','false');
        $popupOpen.attr('aria-expanded','true');

        // 팝업이 나타난 다음 CLOSE 버튼으로 키보드 포커스 이동
        setTimeout(function(){
            // 애니메이션 중에 닫았으면 숨겨진 CLOSE 버튼으로 이동하지 않음
            if(isPopupOpen){
                $popupClose.focus();
            }
        },600);
    }

    // =========================
    // 아테라 팝업 닫기
    // =========================
    function closePopup(){
        if(!isPopupOpen)return; // 이미 닫혀 있으면 중복 실행하지 않음

        isPopupOpen=false; // 현재 팝업 상태를 닫힘으로 변경

        // open 클래스를 제거하면 배경이 투명해지고 패널이 오른쪽으로 이동
        $popup.removeClass('open');

        // 보조기기에 팝업이 닫혔다는 상태 전달
        $popup.attr('aria-hidden','true');
        $popupOpen.attr('aria-expanded','false');

        // 팝업을 열었던 버튼으로 키보드 포커스 복귀
        if(lastFocus){
            $(lastFocus).focus();
        }
    }

    // =========================
    // 화살표 버튼 클릭 처리
    // =========================
    $popupOpen.on('click',function(){
        openPopup();
    });

    // =========================
    // CLOSE 버튼 클릭 처리
    // =========================
    $popupClose.on('click',function(){
        closePopup();
    });

    // =========================
    // 반투명 검정 배경 클릭 처리
    // =========================
    $popupDim.on('click',function(){
        // 패널 바깥의 어두운 배경을 클릭하면 CLOSE와 같은 닫기 함수 실행
        closePopup();
    });

    // 패널 내부 클릭이 팝업 배경 클릭으로 전달되지 않도록 차단
    $popupPanel.on('click',function(e){
        e.stopPropagation();
    });

    // =========================
    // Esc 및 Tab 키 처리
    // =========================
    $(document).on('keydown',function(e){
        if(!isPopupOpen)return; // 팝업이 닫혀 있으면 실행하지 않음

        // Esc 키를 누르면 팝업 닫기
        if(e.key==='Escape'){
            closePopup();
            return;
        }

        // Tab 키가 아니면 포커스 순환 코드를 실행하지 않음
        if(e.key!=='Tab')return;

        // 팝업 안에서 포커스를 받을 수 있는 요소를 현재 상태로 수집
        var $focusable=$popup.find('button:visible, a:visible');
        var firstFocus=$focusable.get(0);                       // 첫 번째 포커스 요소
        var lastPopupFocus=$focusable.get($focusable.length-1); // 마지막 포커스 요소

        // Shift+Tab으로 첫 요소 이전에 가려 하면 마지막 요소로 이동
        if(e.shiftKey && document.activeElement===firstFocus){
            e.preventDefault();
            lastPopupFocus.focus();
        // Tab으로 마지막 요소 다음에 가려 하면 첫 요소로 이동
        }else if(!e.shiftKey && document.activeElement===lastPopupFocus){
            e.preventDefault();
            firstFocus.focus();
        }
    });
});
