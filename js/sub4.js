// sub4_2 채용프로세스: 화면과 글줄 높이에 맞춰 SVG 연결선을 조정한다.
$(function () {
    var $journey=$('#content .process_journey');

    // 다른 인재채용 페이지에서 공통으로 연결해도 대상이 없으면 실행하지 않는다.
    if($journey.length===0)return;

    var $svg=$journey.find('.process_arrow');
    var $icons=$journey.find('.step_icon');
    var $items=$journey.find('.process_list > li');
    var $lines=$svg.find('.arrow_line');
    var $heads=$svg.find('.arrow_head');

    function drawProcessArrows(){
        var area=$journey[0].getBoundingClientRect();
        var positions=[];

        if(area.width<=0||area.height<=0)return;

        // 1. 각 원형 아이콘의 좌표를 연결선 부모 영역 기준으로 저장한다.
        // 이미지만 AOS로 움직이고 원형 박스는 고정되어 있으므로 선이 흔들리지 않는다.
        $icons.each(function () {
            var icon=this.getBoundingClientRect();
            positions.push({
                left:icon.left-area.left,
                right:icon.right-area.left,
                top:icon.top-area.top,
                x:icon.left-area.left+icon.width/2,
                y:icon.top-area.top+icon.height/2
            });
        });

        // 2. SVG 내부 좌표를 실제 표시 크기와 같게 맞춘다.
        // 가로·세로를 단순히 늘리는 대신 경로를 다시 그려 화살촉과 모서리 크기를 유지한다.
        // jQuery 1.12는 속성명을 소문자로 바꿀 수 있어 대소문자를 구분하는 viewBox는 직접 설정한다.
        $svg[0].setAttribute('viewBox','0 0 '+area.width+' '+area.height);

        for(var i=0;i<positions.length-1;i++){
            var from=positions[i];
            var to=positions[i+1];
            var linePath='';
            var headPath='';

            if(i%2===0){
                // 3. 같은 행의 01→02, 03→04, 05→06은 오른쪽으로 연결한다.
                var tipX=to.left-2;
                linePath='M'+(from.right-1)+' '+from.y+'H'+(tipX-5);
                headPath='M'+(tipX-7)+' '+(to.y-4)+'L'+tipX+' '+to.y+'L'+(tipX-7)+' '+(to.y+4)+'Z';
            }else{
                // 4. 02→03, 04→05는 오른쪽 가장자리를 따라 아래 행의 왼쪽으로 이동한다.
                var rowBottom=$items[i].getBoundingClientRect().bottom-area.top;
                var turnY=(rowBottom+to.top)/2;
                var outerX=area.width-2;
                var radius=Math.min(12,(outerX-from.right)/2,(to.top-turnY-3)/2);
                var tipY=to.top-3;

                // C 명령의 제어점으로 세 번 꺾이는 부분을 둥글게 이어 준다.
                linePath='M'+(from.right-1)+' '+from.y+
                    'H'+(outerX-radius)+
                    'C'+outerX+' '+from.y+' '+outerX+' '+(from.y+radius)+' '+outerX+' '+(from.y+radius)+
                    'V'+(turnY-radius)+
                    'C'+outerX+' '+turnY+' '+(outerX-radius)+' '+turnY+' '+(outerX-radius)+' '+turnY+
                    'H'+(to.x+radius)+
                    'C'+to.x+' '+turnY+' '+to.x+' '+(turnY+radius)+' '+to.x+' '+(turnY+radius)+
                    'V'+(tipY-5);
                headPath='M'+(to.x-4)+' '+(tipY-7)+'L'+to.x+' '+tipY+'L'+(to.x+4)+' '+(tipY-7)+'Z';
            }

            // 5. 원본 SVG의 연결선 5개와 화살촉 5개에 계산한 좌표만 반영한다.
            $lines.eq(i).attr('d',linePath);
            $heads.eq(i).attr('d',headPath);
        }

        $svg.addClass('ready');
    }

    // 첫 화면, 이미지 로딩, 화면 회전과 크기 변경 때마다 위치를 다시 맞춘다.
    drawProcessArrows();
    $(window).on('load resize',drawProcessArrows);
    $icons.find('img').on('load',drawProcessArrows);

    // 화면 너비가 그대로여도 설명 문구가 길어져 목록 높이가 변하면 다시 맞춘다.
    // SVG는 absolute이므로 선을 바꿔도 목록 높이가 달라져 반복 실행되지는 않는다.
    if(window.ResizeObserver){
        var journeyResize=new ResizeObserver(drawProcessArrows);
        journeyResize.observe($journey[0]);
    }

    // 웹폰트 로딩으로 줄바꿈과 행 높이가 달라진 경우에도 연결선을 맞춘다.
    if(document.fonts&&document.fonts.ready){
        document.fonts.ready.then(drawProcessArrows);
    }
});
// sub4_3 직무소개: 대분류 아코디언과 내부 세부 직무 탭을 각각 처리한다.
$(function () {
    var $items=$('#content .career_list > .career_item');
    if(!$items.length)return;

    // 닫을 때는 펼침 상태, 접근성 안내, 아이콘 색상을 함께 되돌린다.
    function closeCareer($item){
        $item.removeClass('open');
        $item.find('.career_more').attr('aria-expanded','false');
        $item.children('.career_detail').stop(true,true).slideUp(240);
        $item.find('.career_icon img').each(function () {
            $(this).attr('src',$(this).attr('data-gray'));
        });
    }

    // 첫 진입은 모두 접힌 상태이며 버튼은 Enter 또는 Space로도 작동한다.
    $items.find('.career_more').on('click',function () {
        var $item=$(this).closest('.career_item');
        var wasOpen=$item.hasClass('open');
        closeCareer($items.filter('.open').not($item));
        if(wasOpen){
            closeCareer($item);
        }else{
            $item.addClass('open');
            $(this).attr('aria-expanded','true');
            $item.find('.career_icon img').each(function () {
                $(this).attr('src',$(this).attr('data-color'));
            });
            $item.children('.career_detail').stop(true,true).slideDown(240,function () {
                // 위쪽 항목이 닫히며 위치가 달라져도 누른 카드가 헤더 뒤로 숨지 않게 한다.
                var headerHeight=$('#headerArea').outerHeight()||60;
                if($item[0].getBoundingClientRect().top<headerHeight){
                    window.scrollTo(0,Math.max(0,$item.offset().top-headerHeight-12));
                }
                if(window.AOS)AOS.refresh();
            });
        }
    });

    // 탭은 해당 아코디언 안에서만 전환한다. 다른 분야의 선택 상태는 유지한다.
    function selectRole($button){
        var $detail=$button.closest('.career_detail');
        var $tabs=$detail.find('.role_list button');
        var index=$tabs.index($button);
        $tabs.attr({'aria-selected':'false',tabindex:'-1'}).parent().removeClass('active');
        $button.attr({'aria-selected':'true',tabindex:'0'}).parent().addClass('active');
        $detail.find('.role_content').removeClass('active').attr('hidden',true)
            .eq(index).addClass('active').removeAttr('hidden');
    }
    $items.find('.role_list button').on('click',function () { selectRole($(this)); });
    // 방향키와 Home/End로도 세부 직무를 선택할 수 있다.
    $items.find('.role_list button').on('keydown',function (event) {
        var $tabs=$(this).closest('.role_list').find('button');
        var index=$tabs.index(this);
        if(event.key==='ArrowRight')index=(index+1)%$tabs.length;
        else if(event.key==='ArrowLeft')index=(index+$tabs.length-1)%$tabs.length;
        else if(event.key==='Home')index=0;
        else if(event.key==='End')index=$tabs.length-1;
        else return;
        event.preventDefault();
        selectRole($tabs.eq(index));
        $tabs.eq(index).focus();
    });
});
