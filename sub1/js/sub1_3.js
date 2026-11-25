// JavaScript Document

// =========================
// 02 RESEARCH DOMAINS
// =========================


    var $research=$('#content .research_domains'); // 핵심 연구영역 전체
    var $domain=$research.find('.domain_list > li'); // 연구영역 탭 2개
    var $more=$domain.find('.domain_more'); // 탭 열기·닫기 링크

    $more.click(function(e){
        e.preventDefault(); // a 태그의 href="#" 기본 이동 방지

        var $button=$(this); // 클릭한 열기·닫기 링크
        var $item=$button.closest('li'); // 클릭한 링크가 들어 있는 연구영역
        var $detail=$item.find('.domain_details'); // 해당 연구영역의 상세 내용
        var $icon=$button.find('.domain_icon'); // 클릭한 탭의 +·− 아이콘
        var title=$item.find('.domain_summary h4').text(); // 클릭한 연구영역 제목
        var isOpen=$item.hasClass('active'); // 현재 항목이 열려 있는지 확인

        if(isOpen){
            // 클릭한 탭만 닫고 다른 탭의 상태는 유지
            $item.removeClass('active');
            $detail.stop(true, true).slideUp(300);
            $button.attr('aria-expanded','false');
            $icon.attr('src',$icon.attr('data-plus'));
            $button.find('.hidden').text(title+' 연구영역 펼치기');

            // 열려 있는 탭이 하나도 없을 때만 검은 배경 높이를 원래대로 복귀
            if(!$domain.hasClass('active')){
                $research.removeClass('open');
            }
        }else{
            // 클릭한 탭만 열고 다른 탭의 상태는 유지
            $item.addClass('active');
            $detail.stop(true, true).slideDown(300);
            $button.attr('aria-expanded','true');
            $icon.attr('src',$icon.attr('data-minus'));
            $button.find('.hidden').text(title+' 연구영역 접기');
            $research.addClass('open');
        }
    });



// =========================
// 03 TECHNOLOGY CERTIFICATIONS (표)
// =========================

    var $certification=$('#content .technology_certifications');
    var $filter=$certification.find('.certification_filter a');
    var $rows=$certification.find('.certification_table tbody tr');
    var $pageList=$certification.find('.certification_pagination ul');
    var $prev=$certification.find('.page_prev');
    var $next=$certification.find('.page_next');
    var rowsPerPage=6;
    var currentCategory='all';
    var currentPage=1;

    // 선택한 분류에 해당하는 행만 찾기
    function getFilteredRows(){
        if(currentCategory==='all'){
            return $rows;
        }

        return $rows.filter('[data-category="'+currentCategory+'"]');
    }

    // 선택된 분류의 개수에 맞춰 페이지 번호 만들기
    function makePageNumbers(totalPages){
        var pageHtml='';
        var i;

        for(i=1; i<=totalPages; i++){
            pageHtml+='<li><a href="#" data-page="'+i+'">'+i+'</a></li>';
        }

        $pageList.html(pageHtml);
    }

    // 현재 필터와 페이지에 해당하는 6개 행만 보여주기
    function showCertificationList(){
        var $filteredRows=getFilteredRows();
        var totalPages=Math.ceil($filteredRows.length/rowsPerPage);
        var start=(currentPage-1)*rowsPerPage;
        var end=start+rowsPerPage;

        if(totalPages<1){
            totalPages=1;
        }

        if(currentPage>totalPages){
            currentPage=totalPages;
        }

        makePageNumbers(totalPages);
        $rows.prop('hidden',true);
        $filteredRows.slice(start,end).prop('hidden',false);

        $pageList.find('a[data-page="'+currentPage+'"]')
            .addClass('active')
            .attr('aria-current','page');

        $prev.toggleClass('disabled',currentPage===1);
        $next.toggleClass('disabled',currentPage===totalPages);
    }

    // 기술 분류 선택
    $filter.click(function(e){
        e.preventDefault();

        currentCategory=$(this).attr('data-category');
        currentPage=1;

        $filter.removeClass('active').removeAttr('aria-current');
        $(this).addClass('active').attr('aria-current','true');

        showCertificationList();
    });

    // 페이지 번호 선택
    $pageList.on('click','a',function(e){
        e.preventDefault();
        currentPage=Number($(this).attr('data-page'));
        showCertificationList();
    });

    // 이전 페이지
    $prev.click(function(e){
        e.preventDefault();

        if(currentPage>1){
            currentPage--;
            showCertificationList();
        }
    });

    // 다음 페이지
    $next.click(function(e){
        e.preventDefault();

        var totalPages=Math.ceil(getFilteredRows().length/rowsPerPage);

        if(currentPage<totalPages){
            currentPage++;
            showCertificationList();
        }
    });

    // 첫 화면: 전체 인증 중 최신 6건
    showCertificationList();
