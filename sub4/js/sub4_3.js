// JavaScript Document

$(document).ready(function () {
    // ===== 사이버 제보 접수 팝업 : sub5_2 문의하기 팝업과 동일한 방식 =====
    var reportPopup=$('.report_popup'); // 제보 접수 팝업 전체 영역
    var reportOpen=$('.report_btn'); // 제보 접수 팝업을 여는 버튼

    // 페이지에 처음 들어오면 제보 접수 팝업을 숨긴다.
    reportPopup.hide();

    // 온라인 제보 접수 버튼을 클릭하면 팝업을 연다.
    reportOpen.click(function(){
        reportPopup.fadeIn(200);
        $('body').css('overflow','hidden');
        $('.report_close').focus();
    });

    // 팝업을 닫는 공통 함수
    function reportClose(){
        reportPopup.fadeOut(200);
        $('body').css('overflow','');
        reportOpen.blur(); // 닫은 뒤 버튼에 hover 색상이 남아 보이지 않도록 처리
    }

    // 닫기 버튼을 클릭하면 팝업을 닫는다.
    $('.report_close').click(function(){
        reportClose();
    });

    // 팝업 내용이 아닌 바깥의 어두운 영역을 클릭하면 팝업을 닫는다.
    reportPopup.click(function(e){
        if(e.target==this){
            reportClose();
        }
    });

    // 키보드의 ESC 키를 누르면 팝업을 닫는다.
    $(document).keydown(function(e){
        if(e.keyCode==27 && reportPopup.is(':visible')){
            reportClose();
        }
    });

    // EmailJS에서 발급받은 5_2와 동일한 public key를 연결한다.
    if(typeof emailjs!=='undefined'){
        emailjs.init({
            publicKey:'6xMmbp9VUxUhdOKx8'
        });
    }

    // 제보 폼을 전송하면 5_2와 동일한 EmailJS 서비스로 메일을 보낸다.
    $('#report-form').submit(function(e){
        e.preventDefault(); // form의 기본 전송과 페이지 새로고침 방지

        if(typeof emailjs==='undefined'){
            alert('메일 전송 서비스를 불러오지 못했습니다.');
            return;
        }

        emailjs.sendForm('service_n5i4gob','template_l8brvng',this)
            .then(function(){
                alert('제보가 정상적으로 접수되었습니다.');
                $('#report-form')[0].reset();
                reportClose();
            },function(error){
                console.log('FAILED...',error);
                alert('제보 접수에 실패하였습니다.');
            });
    });
});
