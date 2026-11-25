// JavaScript Document

$(document).ready(function(){
    var $box=$('#content .business_box'); // 사업분야 카드 전체 영역
    var $cards=$box.children('li');       // 건축, 토목, 주택 카드 3개
    var origin=390;                       // 카드의 기본 너비
    var min_width=234;                    // 선택되지 않은 카드 너비
    var max_width=702;                    // 마우스를 올린 카드 너비
    var mouseX=null;                      // 마지막 마우스 가로 위치
    var mouseY=null;                      // 마지막 마우스 세로 위치

    // =========================
    // 선택한 카드 펼치기
    // =========================
    function openCard($card){
        // 이미 펼쳐진 카드에서는 애니메이션을 다시 실행하지 않음
        if($card.hasClass('active'))return;

        // 모든 카드를 축소 상태로 만든 후 선택한 카드만 활성화
        $cards.removeClass('active').addClass('contract');
        $card.removeClass('contract').addClass('active');

        // 진행 중인 애니메이션과 대기열을 정리한 후 새로운 너비로 변경
        $cards.not($card).stop(true, false).animate({width:min_width},300).clearQueue();
        $card.stop(true, false).animate({width:max_width},300).clearQueue();
    }

    // =========================
    // 모든 카드 기본 상태로 복귀
    // =========================
    function resetCards(){
        $cards.removeClass('active contract');
        $cards.stop(true, false).animate({width:origin},300).clearQueue();
    }

    // 카드의 움직이는 경계에서 같은 hover가 반복되는 현상 방지
    $cards.on('mouseenter mousemove',function(e){
        if(mouseX===e.clientX && mouseY===e.clientY)return;

        mouseX=e.clientX;
        mouseY=e.clientY;
        openCard($(this));
    });

    // 개별 카드가 아닌 카드 묶음 전체를 벗어났을 때만 초기화
    $box.on('mouseleave',function(){
        mouseX=null;
        mouseY=null;

        var $focused=$cards.has(document.activeElement);

        if($focused.length){
            openCard($focused);
        }else{
            resetCards();
        }
    });

    // 키보드로 자세히보기 링크에 접근할 때도 해당 카드 펼치기
    $cards.on('focusin',function(){
        openCard($(this));
    });

    $box.on('focusout',function(){
        setTimeout(function(){
            if(!$box.find(document.activeElement).length && !$box.is(':hover')){
                resetCards();
            }
        },0);
    });
});
