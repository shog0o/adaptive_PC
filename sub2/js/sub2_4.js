// JavaScript Document

$(function(){
    $.ajax({
        url:'./data/sub2_4.json',
        dataType:'json',
        success:function(data){
            var useData=data.project;
            var category='all';
            var page=1;
            var pageSize=6;

            // 메인 검색창에서 전달한 검색어를 가져온다.
            function getMainKeyword(){
                var query=window.location.search.substring(1).split('&');

                for(var i=0;i<query.length;i++){
                    var item=query[i].split('=');

                    if(item[0]=='keyword'){
                        return decodeURIComponent((item[1]||'').replace(/\+/g,' '));
                    }
                }

                return '';
            }

            // 전달받은 배열에서 현재 페이지에 해당하는 프로젝트를 출력한다.
            function dataPrint(arr){
                var start=(page-1)*pageSize;
                var end=start+pageSize;
                var pageData=arr.slice(start,end);
                var txt='';

                for(var i in pageData){
                    txt+='<li data-category="'+pageData[i].Category+'" data-region="'+pageData[i].Region+'">';
                    txt+='<div class="project_img"><img src="'+pageData[i].Image+'" alt="'+pageData[i].Name+'"></div>';
                    txt+='<div class="project_info">';
                    txt+='<span class="project_category">'+pageData[i].CategoryName+'</span>';
                    txt+='<strong class="project_name">'+pageData[i].Name+'</strong>';
                    txt+='<div class="project_meta">';
                    txt+='<span>'+pageData[i].Location+'</span>';
                    txt+='</div></div></li>';
                }

                if(pageData.length==0){
                    txt='<li class="no_result">검색 결과가 없습니다.</li>';
                }

                $('.project_list').html(txt);
                $('.result_count').text('총 '+arr.length+'건');
                pagePrint(arr.length);
            }

            // 검색 결과 개수에 맞춰 페이지 번호를 만든다.
            function pagePrint(total){
                var pageCount=Math.ceil(total/pageSize);
                var txt='';

                if(pageCount>1){
                    txt+='<a href="#" class="page_prev"><span>&lsaquo;</span></a>';

                    for(var i=1;i<=pageCount;i++){
                        if(i==page){
                            txt+='<a href="#" class="active" data-page="'+i+'"><span>'+i+'</span></a>';
                        }else{
                            txt+='<a href="#" data-page="'+i+'"><span>'+i+'</span></a>';
                        }
                    }

                    txt+='<a href="#" class="page_next"><span>&rsaquo;</span></a>';
                }

                $('.pagination').html(txt);
            }

            // 검색어, 사업분야, 지역 조건을 모두 적용한다.
            function projectFilter(){
                var keyword=$('#title').val();
                var region=$('#region').val();

                var newArray=useData.filter(function(element){
                    keyword=keyword.toLowerCase();

                    var nameCheck=element.Name.toLowerCase().indexOf(keyword)>=0||
                        element.CategoryName.toLowerCase().indexOf(keyword)>=0||
                        element.Location.toLowerCase().indexOf(keyword)>=0;
                    var categoryCheck=category=='all'||element.Category==category;
                    var regionCheck=region==''||element.Region==region;

                    return nameCheck&&categoryCheck&&regionCheck;
                });

                if($('#projectSort').val()=='oldest'){
                    newArray.reverse();
                }

                dataPrint(newArray);
                return newArray;
            }

            var mainKeyword=getMainKeyword();

            if(mainKeyword!=''){
                $('#title').val(mainKeyword);
            }

            projectFilter();

            $('#btn').click(function(){
                page=1;
                projectFilter();
            });

            $('#title').keydown(function(e){
                if(e.keyCode==13){
                    page=1;
                    projectFilter();
                }
            });

            $('.filter_chip').click(function(){
                $('.filter_chip').removeClass('active');
                $(this).addClass('active');
                category=$(this).attr('data-category');
                page=1;
                projectFilter();
            });

            $('#region, #projectSort').change(function(){
                page=1;
                projectFilter();
            });

            $('.filter_reset').click(function(){
                $('#title').val('');
                $('#region').val('');
                $('#projectSort').val('latest');
                $('.filter_chip').removeClass('active');
                $('.filter_chip').eq(0).addClass('active');
                category='all';
                page=1;
                dataPrint(useData);
            });

            $('.pagination').on('click','a',function(e){
                e.preventDefault();
                var pageCount=Math.ceil(projectFilter().length/pageSize);

                if($(this).hasClass('page_prev')){
                    if(page>1)page--;
                }else if($(this).hasClass('page_next')){
                    if(page<pageCount)page++;
                }else{
                    page=parseInt($(this).attr('data-page'));
                }

                projectFilter();
            });
        },
        error:function(){
            $('.project_list').html('<li class="no_result">프로젝트 정보를 불러오지 못했습니다.</li>');
        }
    });
});
