// JavaScript Document

$(function(){
    var $form=$('#mainProjectSearch');
    var $input=$('#mainSearchKeyword');
    var $hintList=$form.find('.search_hints');
    var hints=['건축','토목','주택','아테라','금호']; 

    // 검색 결과 페이지로 검색어를 전달한다.
    function moveProjectPage(keyword){
        window.location.href='./sub2/sub2_4.html?keyword='+encodeURIComponent(keyword); 
    }

    // 입력한 글자와 일치하는 검색 힌트를 최대 5개까지 보여준다.
    function showHints(){ 
        var keyword=$.trim($input.val()).toLowerCase();
        var txt='';
        var count=0;

        for(var i=0;i<hints.length;i++){
            if(keyword==''||hints[i].toLowerCase().indexOf(keyword)>=0){
                txt+='<li><a href="#">'+hints[i]+'</a></li>';
                count++;

                if(count==5)break;
            }
        }

        $hintList.html(txt);

        if(count>0){
            $hintList.stop(true,true).slideDown(180);
        }else{
            $hintList.stop(true,true).slideUp(180);
        }
    }

    // 프로젝트 JSON에서 실제 검색 가능한 프로젝트명을 가져온다.
    $.ajax({
        url:'./sub2/data/sub2_4.json',
        dataType:'json',
        success:function(data){
            for(var i=0;i<data.project.length;i++){
                hints.push(data.project[i].Name);
            }
        }
    });

    $input.on('focus keyup',function(){
        showHints();
    });

    $hintList.on('click','a',function(e){ 
        e.preventDefault();
        moveProjectPage($(this).text()); 
    });

    $form.submit(function(e){ 
        e.preventDefault();
        moveProjectPage($.trim($input.val())); 
    });

    $(document).click(function(e){ 
        if($(e.target).closest('#mainProjectSearch').length==0){
            $hintList.stop(true,true).slideUp(180);
        }
    });
});
