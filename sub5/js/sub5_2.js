// JavaScript Document

var contactPopup=$('.contact_popup'); // 문의하기 팝업 전체 영역
var contactOpen=$('.guide_mail'); // 문의하기 팝업을 여는 버튼

// 페이지에 처음 들어오면 문의하기 팝업을 숨긴다.
contactPopup.hide();

// 문의하기 버튼을 클릭하면 팝업을 연다.
contactOpen.click(function(){
    contactPopup.fadeIn(200).attr('aria-hidden','false');
    $('body').css('overflow','hidden');
    $('.contact_close').focus();
});

// 팝업을 닫는 공통 함수
function contactClose(){
    contactPopup.fadeOut(200).attr('aria-hidden','true');
    $('body').css('overflow','');
    contactOpen.focus();
}

// 닫기 버튼을 클릭하면 팝업을 닫는다.
$('.contact_close').click(function(){
    contactClose();
});

// CodePen 예제 활용: 팝업 내용이 아닌 어두운 바깥 영역을 클릭하면 팝업을 닫는다.
contactPopup.click(function(e){
    if(e.target==this){
        contactClose();
    }
});

// 키보드의 ESC 키를 누르면 팝업을 닫는다.
$(document).keydown(function(e){
    if(e.keyCode==27 && contactPopup.is(':visible')){
        contactClose();
    }
});

// EmailJS에서 발급받은 public key를 연결한다.
(function(){
    emailjs.init({
        publicKey:'6xMmbp9VUxUhdOKx8'
    });
})();

// 문의 폼을 전송하면 EmailJS를 이용해 메일을 보낸다.
$('#contact-form').submit(function(e){
    e.preventDefault(); // form의 기본 전송과 페이지 새로고침 방지

    emailjs.sendForm('service_n5i4gob','template_l8brvng',this)
        .then(function(){
            alert('메일 전송에 성공하였습니다.');
            $('#contact-form')[0].reset();
            contactClose();
        },function(error){
            console.log('FAILED...',error);
            alert('메일 전송에 실패하였습니다.');
        });
});
