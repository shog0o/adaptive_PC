// login·member 하위 폴더에서 같은 헤더와 푸터를 불러온다.
$(function () {
    function loadFragment(selector,path){
        return $.get(path).then(function (html) {
            // 문서에 붙이기 전에 경로를 고쳐 잘못된 이미지 요청을 방지한다.
            var $fragment=$('<div>').append($.parseHTML(html,document,false));
            $fragment.find('[href],[src]').each(function () {
                var $element=$(this);
                $.each(['href','src'],function (_,attribute) {
                    var value=$element.attr(attribute);
                    if(value&&value.indexOf('./')===0)$element.attr(attribute,'../'+value.substring(2));
                });
            });
            $(selector).empty().append($fragment.contents());
        });
    }
    // 공통 JS는 두 영역이 준비된 뒤 한 번 실행한다.
    $.when(loadFragment('#headerArea','../common/header.html?v=20261022-account'),
           loadFragment('#footerArea','../common/footer.html?v=20261022-account'))
        .done(function () { $.getScript('../js/common.js?v=20261022-account'); });

    // 서버 처리 경로가 지정되지 않은 폼은 비밀번호를 전송하거나 완료로 안내하지 않는다.
    function showFeedback($target,message){
        var $message=$target.find('.member_feedback');
        if(!$message.length)$message=$('<p class="member_feedback" role="status"></p>').appendTo($target);
        $message.text(message);
    }
    $('.member_form').on('submit',function (event) {
        if($(this).attr('action')!=='#')return;
        event.preventDefault();
        showFeedback($(this),$(this).hasClass('login_form')?'현재 로그인 서비스를 준비 중입니다.':'현재 회원가입 서비스를 준비 중입니다.');
    });
    $('.find_link a').on('click',function (event) {
        if($(this).attr('href')!=='#')return;
        event.preventDefault();
        showFeedback($('.login_box'),$(this).text()+' 서비스를 준비 중입니다.');
    });

    // 비밀번호 확인이 다르면 브라우저의 폼 유효성 검사로 안내한다.
    $('#memberPass,#memberPass2').on('input',function () {
        var confirm=document.getElementById('memberPass2');
        if(confirm)confirm.setCustomValidity(confirm.value&&confirm.value!==$('#memberPass').val()?'비밀번호가 일치하지 않습니다.':'');
    });
    $('.member_form').on('reset',function () {
        var confirm=document.getElementById('memberPass2');
        if(confirm)confirm.setCustomValidity('');
        $(this).find('.member_feedback').remove();
    });
});
