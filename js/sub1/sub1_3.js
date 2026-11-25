// sub1_3 페이지의 HTML 요소가 준비된 다음 기능을 실행한다.
$(function () {
    // 핵심 연구영역의 자세히보기 버튼을 클릭하면 카드의 펼침 상태를 전환한다.
    $('.domain_more').on('click', function (e) {
        // a 태그의 기본 링크 이동을 막는다.
        e.preventDefault();

        // 클릭한 버튼과 버튼이 포함된 카드, 점 아이콘을 각각 저장한다.
        var button = $(this);
        var item = button.closest('li');
        var icon = button.find('.nav-icon-1');
        var isOpen;

        // 카드에는 open 클래스를, 점 아이콘에는 open 클래스를 추가하거나 제거한다.
        // 실제 이미지 축소와 설명문 펼침은 CSS의 open 선택자가 처리한다.
        item.toggleClass('open');
        icon.toggleClass('open');

        // 클래스 변경이 끝난 뒤 현재 카드가 열려 있는지 확인한다.
        isOpen = item.hasClass('open');

        // 보조기기가 버튼의 열림·닫힘 상태를 알 수 있도록 값을 갱신한다.
        button.attr('aria-expanded', isOpen);
    });


    // 기술인증 표와 분류 버튼, 페이지 이동 영역을 미리 찾아 변수에 저장한다.
    var rows = $('.certification_table tbody tr');
    var filterLinks = $('.certification_filter a');
    var pagination = $('.certification_pagination');
    var pageList = pagination.find('ol');

    // 한 페이지에 표시할 인증 내역 개수와 최초 분류·페이지를 설정한다.
    var pageSize = 6;
    var currentCategory = 'all';
    var currentPage = 1;

    // 현재 선택한 분류에 해당하는 표 행만 골라 반환한다.
    function getFilteredRows() {
        // 전체가 선택된 경우에는 모든 인증 내역을 그대로 반환한다.
        if (currentCategory === 'all') {
            return rows;
        }

        // 각 행의 data-category 값이 현재 분류와 같은 항목만 반환한다.
        return rows.filter('[data-category="' + currentCategory + '"]');
    }

    // 현재 분류와 페이지 번호를 기준으로 표와 페이지 버튼을 다시 그린다.
    function showPage() {
        // 선택된 분류의 행과 필요한 전체 페이지 수를 계산한다.
        var filteredRows = getFilteredRows();
        var totalPages = Math.ceil(filteredRows.length / pageSize);
        var startIndex;
        var endIndex;
        var i;

        // 분류를 변경해 전체 페이지 수가 줄어든 경우 페이지 번호를 범위 안으로 맞춘다.
        if (currentPage > totalPages) {
            currentPage = totalPages;
        }
        if (currentPage < 1) {
            currentPage = 1;
        }

        // 현재 페이지에서 처음 표시할 행과 마지막 다음 행의 번호를 계산한다.
        startIndex = (currentPage - 1) * pageSize;
        endIndex = startIndex + pageSize;

        // 모든 행을 먼저 숨긴 다음 현재 페이지에 해당하는 6개 행만 표시한다.
        // hidden 속성도 함께 처리해 화면과 보조기기에서 같은 상태가 되도록 한다.
        rows.attr('hidden', 'hidden').hide();
        filteredRows.slice(startIndex, endIndex).removeAttr('hidden').show();

        // 기존 페이지 번호를 비우고 현재 분류의 데이터 수에 맞춰 다시 생성한다.
        pageList.empty();
        for (i = 1; i <= totalPages; i++) {
            if (i === currentPage) {
                // 현재 페이지에는 active 클래스와 aria-current 속성을 함께 적용한다.
                pageList.append('<li><a class="active" href="#" data-page="' + i + '" aria-current="page">' + i + '</a></li>');
            } else {
                pageList.append('<li><a href="#" data-page="' + i + '">' + i + '</a></li>');
            }
        }

        // 첫 페이지에서는 이전 버튼을, 마지막 페이지에서는 다음 버튼을 비활성 표시한다.
        pagination.find('.page_prev').toggleClass('disabled', currentPage === 1);
        pagination.find('.page_next').toggleClass('disabled', currentPage === totalPages);
    }

    // 기술 분류 버튼을 선택하면 해당 분류의 첫 페이지부터 다시 표시한다.
    filterLinks.on('click', function (e) {
        e.preventDefault();

        // 기존 활성 표시를 지우고 클릭한 분류 버튼만 활성화한다.
        filterLinks.removeClass('active');
        $(this).addClass('active');

        // 버튼의 data-category 값을 현재 분류로 저장하고 첫 페이지로 돌아간다.
        currentCategory = $(this).attr('data-category');
        currentPage = 1;
        showPage();
    });

    // 동적으로 생성된 숫자 페이지 버튼의 클릭을 상위 ol 요소에서 처리한다.
    pageList.on('click', 'a', function (e) {
        e.preventDefault();

        // data-page 값은 문자열이므로 숫자로 바꾼 뒤 해당 페이지를 표시한다.
        currentPage = Number($(this).attr('data-page'));
        showPage();
    });

    // 이전 버튼을 누르면 현재 페이지가 1보다 큰 경우에만 한 페이지 이동한다.
    pagination.find('.page_prev').on('click', function (e) {
        e.preventDefault();

        if (currentPage > 1) {
            currentPage--;
            showPage();
        }
    });

    // 다음 버튼을 누르면 현재 페이지가 마지막 페이지보다 앞에 있을 때만 이동한다.
    pagination.find('.page_next').on('click', function (e) {
        e.preventDefault();

        // 분류마다 데이터 수가 다르므로 클릭할 때마다 마지막 페이지를 다시 계산한다.
        if (currentPage < Math.ceil(getFilteredRows().length / pageSize)) {
            currentPage++;
            showPage();
        }
    });

    // 페이지가 처음 열리면 전체 인증 내역의 첫 페이지를 표시한다.
    showPage();
});