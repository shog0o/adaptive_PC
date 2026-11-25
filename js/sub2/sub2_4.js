// JavaScript Document

$(function () {
    $.ajax({
        url: './data/sub2_4.json',
        dataType: 'json',
        success: function (data) {
            var useData = data.project;
            var filteredData = [];
            var category = 'all';
            var visibleCount = 4;
            var step = 4;
            var searchInput = $('#title');
            var hintList = $('#project-hints');
            var hints = ['건축', '토목', '주택', '아테라', '금호'];

            // 메인 화면에서 전달된 검색어를 주소에서 가져온다.
            function getMainKeyword() {
                var query = window.location.search.substring(1).split('&');

                for (var i = 0; i < query.length; i++) {
                    var item = query[i].split('=');

                    if (item[0] === 'keyword') {
                        return decodeURIComponent((item[1] || '').replace(/\+/g, ' '));
                    }
                }

                return '';
            }

            // 검색어 힌트 목록을 닫고 접근성 상태를 갱신한다.
            function closeHints() {
                hintList.stop(true, true).slideUp(180, function () {
                    hintList.empty().prop('hidden', true);
                });
                searchInput.attr('aria-expanded', 'false');
            }

            // 입력한 글자와 일치하는 검색어를 최대 5개까지 보여준다.
            function showHints() {
                var keyword = $.trim(searchInput.val()).toLowerCase();
                var html = '';
                var count = 0;

                for (var i = 0; i < hints.length; i++) {
                    if (keyword === '' || hints[i].toLowerCase().indexOf(keyword) >= 0) {
                        html += '<li role="option"><button type="button" data-name="' + hints[i] + '">' + hints[i] + '</button></li>';
                        count++;

                        if (count === 5) break;
                    }
                }

                hintList.html(html);

                if (count > 0) {
                    hintList.prop('hidden', false).stop(true, true).slideDown(180);
                    searchInput.attr('aria-expanded', 'true');
                } else {
                    closeHints();
                }
            }

            // 기본 힌트 뒤에 실제 프로젝트명을 중복 없이 추가한다.
            $.each(useData, function (index, project) {
                if ($.inArray(project.Name, hints) === -1) {
                    hints.push(project.Name);
                }
            });
            // 현재 검색 결과 중 화면에 표시할 개수만큼 목록을 만든다.
            function dataPrint() {
                var pageData = filteredData.slice(0, visibleCount);
                var txt = '';

                for (var i = 0; i < pageData.length; i++) {
                    txt += '<li data-category="' + pageData[i].Category + '" data-region="' + pageData[i].Region + '">';
                    txt += '<div class="project_img"><img src="' + pageData[i].Image + '" alt="' + pageData[i].Name + '"></div>';
                    txt += '<div class="project_info">';
                    txt += '<span class="project_category">' + pageData[i].CategoryName + '</span>';
                    txt += '<strong class="project_name">' + pageData[i].Name + '</strong>';
                    txt += '<div class="project_meta"><span>' + pageData[i].Location + '</span></div>';
                    txt += '</div></li>';
                }

                if (pageData.length === 0) {
                    txt = '<li class="no_result">검색 결과가 없습니다.</li>';
                }

                $('.project_list').html(txt);
                $('.result_count').text('총 ' + filteredData.length + '건');
                $('.project_more').prop('hidden', visibleCount >= filteredData.length);
            }

            // 검색어, 사업분야, 지역, 정렬 조건을 적용한다.
            function projectFilter() {
                var keyword = searchInput.val().toLowerCase();
                var region = $('#region').val();

                filteredData = useData.filter(function (element) {
                    var nameCheck = element.Name.toLowerCase().indexOf(keyword) >= 0 ||
                        element.CategoryName.toLowerCase().indexOf(keyword) >= 0 ||
                        element.Location.toLowerCase().indexOf(keyword) >= 0;
                    var categoryCheck = category === 'all' || element.Category === category;
                    var regionCheck = region === '' || element.Region === region;

                    return nameCheck && categoryCheck && regionCheck;
                });

                if ($('#projectSort').val() === 'oldest') {
                    filteredData.reverse();
                }

                visibleCount = step;
                dataPrint();
            }

            var mainKeyword = getMainKeyword();

            if (mainKeyword !== '') {
                searchInput.val(mainKeyword);
            }

            projectFilter();

            searchInput.on('focus keyup', function (e) {
                if (e.keyCode !== 27) showHints();
            });

            hintList.on('click', 'button', function () {
                searchInput.val($(this).attr('data-name'));
                closeHints();
                projectFilter();
            });

            $('#btn').click(function () {
                closeHints();
                projectFilter();
            });

            searchInput.keydown(function (e) {
                if (e.keyCode === 13) {
                    closeHints();
                    projectFilter();
                } else if (e.keyCode === 27) {
                    closeHints();
                }
            });

            $('.filter_chip').click(function () {
                $('.filter_chip').removeClass('active');
                $(this).addClass('active');
                category = $(this).attr('data-category');
                projectFilter();
            });

            $('#region, #projectSort').change(projectFilter);

            $(document).on('click', function (e) {
                if (!$(e.target).closest('.project_search_box').length) {
                    closeHints();
                }
            });

            $('.project_more').click(function () {
                visibleCount += step;
                dataPrint();
            });
        },
        error: function () {
            $('.project_list').html('<li class="no_result">프로젝트 정보를 불러오지 못했습니다.</li>');
            $('.project_more').prop('hidden', true);
        }
    });
});