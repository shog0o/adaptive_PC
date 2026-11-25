// JavaScript Document

$(document).ready(function(){
    // 약관을 모두 확인한 뒤 회원정보 입력 페이지로 이동한다.
    $('.check_agree').click(function(e){
        e.preventDefault();

        var checkboxLength=$('input[type="checkbox"]').length;
        var checkedLength=$('input[type="checkbox"]:checked').length;

        if(checkboxLength!=checkedLength){
            alert('필수 약관에 모두 동의해야 가입하실 수 있습니다.');
        }else{
            location.href='./join.html';
        }
    });

    // 전체 동의 체크박스로 모든 약관을 한 번에 선택하거나 해제한다.
    $('#checkAll').click(function(){
        if($(this).is(':checked')){
            $('input[type="checkbox"]').prop('checked',true);
        }else{
            $('input[type="checkbox"]').prop('checked',false);
        }
    });

    $('.agree_check').click(function(){
        var agreeLength=$('.agree_check').length;
        var checkedLength=$('.agree_check:checked').length;
        $('#checkAll').prop('checked',agreeLength==checkedLength);
    });
});
