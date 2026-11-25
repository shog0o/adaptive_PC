// JavaScript Document

$(document).ready(function(){
    var cnt=0;       //현재 보이는 이미지 번호
    var total=5;     //전체 이미지 개수

    //이미지 경로를 순서대로 저장
    var images=[
        './images/sub3/sub3_2_visual01X2.png',
        './images/sub3/sub3_2_visual02X2.png',
        './images/sub3/sub3_2_visual03X2.png',
        './images/sub3/sub3_2_visual04X2.png',
        './images/sub3/sub3_2_visual05X2.png'
    ];

    //이미지 대체문자를 순서대로 저장
    var alts=[
        '검단 금호어울림 센트럴 단지 전경',
        'DMC 금호 리첸시아 단지 전경',
        '한남 더힐 단지 전경',
        '동탄 아테라 파밀리에 단지 전경',
        '부천 중동 리첸시아 단지 전경'
    ];

    //각 이미지에 표시할 지역명을 순서대로 저장
    var regions=[
        'GEOMDAN · INCHEON',
        'NAMGU · ULSAN',
        'YONGSAN · SEOUL',
        'DONGTAN · HWASEONG',
        'WONMI · BUCHEON'
    ];

    //각 이미지에 표시할 단지명을 순서대로 저장
    var names=[
        '검단 금호어울림 센트럴',
        'DMC 금호 리첸시아',
        '한남 더힐',
        '동탄 아테라 파밀리에',
        '부천 중동 리첸시아'
    ];

    //각 이미지에 표시할 단지 정보를 순서대로 저장
    var infos=[
        '인천광역시 검단구 이음5로 65<br>지하 2층 ~ 지상 29층, 13개동, 1,452세대',
        '울산광역시 남구 봉월로 60번길 10<br>지하 3층 ~ 지상 37층, 4개동 총 402세대',
        '서울시 용산구 독서당로 111<br>지하 2층 ~ 지상 12층, 32개동, 600세대',
        '경기도 화성시 동탄구 동탄신리천로3길 59<br>지하 3층 ~ 지상 20층, 9개동, 640세대',
        '경기도 부천시 원미구 옥산로 7<br>지하 7층 ~ 지상 66층, 2개동, 572세대'
    ];

    //cnt 번호에 맞는 이미지와 문자를 화면에 출력
    function gallery_change(){
        $('.complex_gallery .img_box img').stop().fadeOut(200,function(){
            $(this).attr('src',images[cnt]);
            $(this).attr('alt',alts[cnt]);
            $(this).fadeIn(300);
        });

        $('.complex_gallery .region').text(regions[cnt]); //지역명 출력
        $('.complex_gallery .gallery_info dt').text(names[cnt]); //단지명 출력
        $('.complex_gallery .gallery_info dd').html(infos[cnt]); //단지 정보 출력   

        //카운터 숫자를 01 / 05 모양으로 표시
        if(cnt<9){
            $('.complex_gallery .gallery_control .text').text('0'+(cnt+1)+' / 0'+total); //cnt 번호는 0부터 시작하므로 1을 더해줌
        }else{
            $('.complex_gallery .gallery_control .text').text((cnt+1)+' / '+total);
        }
        //현재 이미지 순서에 맞는 위치 표시를 활성화
        $('.complex_gallery .gallery_dots span').removeClass('active');
        $('.complex_gallery .gallery_dots span').eq(cnt).addClass('active');
    }
    //다음 버튼을 클릭하면 다음 이미지 출력
    $('.complex_gallery .next').click(function(e){
        e.preventDefault();

        cnt++;

        if(cnt==total){ //마지막 이미지에서 다음 버튼을 클릭하면 첫번째 이미지로 이동
            cnt=0; //첫번째 이미지 번호 = 0
        }

        gallery_change();
    });

    //이전 버튼을 클릭하면 이전 이미지 출력
    $('.complex_gallery .prev').click(function(e){ //이전 버튼 클릭 시 기본 이벤트 제거
        e.preventDefault(); 

        cnt--;

        if(cnt<0){ //첫번째 이미지에서 이전 버튼을 클릭하면 마지막 이미지로 이동
            cnt=total-1; //마지막 이미지 번호 = 전체 이미지 개수 - 1
        }

        gallery_change(); //cnt 번호에 맞는 이미지와 문자를 화면에 출력
    });
});
