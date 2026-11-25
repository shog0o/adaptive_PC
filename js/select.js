// JavaScript Document

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

