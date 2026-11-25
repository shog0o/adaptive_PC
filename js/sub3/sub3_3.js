// JavaScript Document

$(function () {
    // 카드 순서에 맞춰 모달에 표시할 분양 정보를 저장합니다.
    var salesData = [
        {
            name: '동탄 아테라 파밀리에',
            description: '동탄의 새로운 주거 중심에서<br>아테라의 편안한 일상을 만납니다.',
            location: '경기도 화성시 동탄구 동탄순환대로3길 59',
            scale: '지하 3층 ~ 지상 20층, 9개동, 640세대',
            status: '분양중',
            statusClass: 'selling',
            image: './images/sub3/sub3_3_modal01X2.png',
            alt: '동탄 아테라 파밀리에 단지 전경'
        },
        {
            name: 'DMC 금호 리첸시아',
            description: '도심의 편리함과 쾌적한 생활 공간에서<br>새로운 주거 생활을 만납니다.',
            location: '울산광역시 남구 봉월로20번길 10',
            scale: '지하 3층 ~ 지상 37층, 4개동, 총 402세대',
            status: '분양예정',
            statusClass: 'upcoming',
            image: './images/sub3/sub3_3_modal02X2.png',
            alt: 'DMC 금호 리첸시아 단지 전경'
        },
        {
            name: '검단 금호어울림 센트럴',
            description: '검단신도시의 쾌적한 환경 속에서<br>자유로운 주거 생활을 만납니다.',
            location: '인천광역시 검단구 이음5로 65',
            scale: '지하 2층 ~ 지상 29층, 13개동, 1,452세대',
            status: '분양완료',
            statusClass: 'complete',
            image: './images/sub3/sub3_3_modal03X2.png',
            alt: '검단 금호어울림 센트럴 단지 전경'
        }
    ];

    var $modal = $('.modal_box');
    var $lastOpenButton;

    // 선택한 카드의 정보를 모달에 넣고 화면에 표시합니다.
    $('.sales_open').on('click', function (e) {
        e.preventDefault();

        var index = Number($(this).attr('data-index'));
        var item = salesData[index];

        if (!item) {
            return;
        }

        $lastOpenButton = $(this);

        $modal.find('.modal_info .status')
            .removeClass('selling upcoming complete')
            .addClass(item.statusClass)
            .html('&#9679; ' + item.status);

        $modal.find('.modal_info > strong').text(item.name);
        $modal.find('.modal_info .modal_desc').html(item.description);
        $modal.find('.modal_info dl div:eq(0) dd').text(item.location);
        $modal.find('.modal_info dl div:eq(1) dd').text(item.scale);
        $modal.find('.modal_info dl div:eq(2) dd').text(item.status);
        $modal.find('.modal_visual img').attr({
            src: item.image,
            alt: item.alt
        });

        $modal.stop(true, true).fadeIn(300);
        $('body').css('overflow', 'hidden');
        $modal.find('.modal_close').focus();
    });

    // 닫기 버튼이나 어두운 배경을 누르면 모달을 닫습니다.
    $('.modal_close, .modal_bg').on('click', function () {
        closeSalesModal();
    });

    // 키보드의 ESC 키로도 모달을 닫을 수 있게 합니다.
    $(document).on('keydown', function (e) {
        if (e.key === 'Escape' && $modal.is(':visible')) {
            closeSalesModal();
        }
    });

    function closeSalesModal() {
        $modal.stop(true, true).fadeOut(300);
        $('body').css('overflow', 'auto');

        if ($lastOpenButton) {
            $lastOpenButton.focus();
        }
    }
});