// JavaScript Document

$(document).ready(function(){
    //카드 순서에 맞춰 팝업에 표시할 정보를 배열에 저장합니다.
    var names=[
        '동탄 아테라 파밀리에',
        'DMC 금호 리첸시아',
        '검단 금호어울림 센트럴'
    ];

    var descriptions=[
        '동탄의 새로운 주거 중심에서<br>아테라의 편안한 일상을 만납니다.',
        '도시의 편리함과 품격을 담은 공간에서<br>새로운 주거 생활을 만납니다.',
        '검단신도시의 쾌적한 환경 속에서<br>여유로운 주거 생활을 만납니다.'
    ];

    var locations=[
        '경기도 화성시 동탄구 동탄신리천로3길 59',
        '울산광역시 남구 봉월로60번길 10',
        '인천광역시 검단구 이음5로 65'
    ];

    var scales=[
        '지하 3층 ~ 지상 20층, 9개동, 640세대',
        '지하 3층 ~ 지상 37층, 4개동, 총 402세대',
        '지하 2층 ~ 지상 29층, 13개동, 1,452세대'
    ];

    var statuses=[
        '분양중',
        '분양예정',
        '분양완료'
    ];

    var status_classes=[
        'selling',
        'upcoming',
        'complete'
    ];

    var images=[
        './images/sub3/img01_01.png',
        './images/sub3/img02_01.png',
        './images/sub3/img03_01.png'
    ];

    var alts=[
        '동탄 아테라 파밀리에 단지 전경',
        'DMC 금호 리첸시아 단지 전경',
        '검단 금호어울림 센트럴 단지 전경'
    ];

    //분양 정보 보기 링크를 클릭하면 모달 팝업을 엽니다.
    $('.sales_open').click(function(e){
        e.preventDefault();

        var ind=$(this).attr('data-index'); //클릭한 카드의 번호

        //클릭한 카드 번호에 해당하는 정보를 팝업에 출력합니다.
        $('.modal_info .status').removeClass('selling upcoming complete');
        $('.modal_info .status').addClass(status_classes[ind]); //
        $('.modal_info .status').html('&#9679; '+statuses[ind]);
        $('.modal_info > strong').text(names[ind]);
        $('.modal_info .modal_desc').html(descriptions[ind]);
        $('.modal_info dl div:eq(0) dd').text(locations[ind]);
        $('.modal_info dl div:eq(1) dd').text(scales[ind]);
        $('.modal_info dl div:eq(2) dd').text(statuses[ind]);
        $('.modal_visual img').attr('src',images[ind]);
        $('.modal_visual img').attr('alt',alts[ind]);

        $('.modal_box').fadeIn(300);
        $('body').css('overflow','hidden');
    });

    //닫기 버튼을 클릭하면 모달 팝업을 닫습니다.
    $('.modal_close').click(function(){
        $('.modal_box').fadeOut(300);
        $('body').css('overflow','auto');
    });

    //모달 바깥의 어두운 배경을 클릭해도 팝업을 닫습니다.
    $('.modal_bg').click(function(){
        $('.modal_box').fadeOut(300);
        $('body').css('overflow','auto');
    });
});
