window.addEventListener('load', function () {
    // 사업장별 지도 요소 ID와 위도·경도
    var officeData = {
        headquarters: {
            mapId: 'map',
            lat: 37.5716808092144,
            lng: 126.983530268891
        },
        naju: {
            mapId: 'mapNaju',
            lat: 35.0164770792018,
            lng: 126.713331755199
        }
    };

    // 생성된 지도 객체를 저장해 중복 생성을 방지
    var maps = {};

    // 전달받은 사업장의 네이버 지도 생성
    function createMap(office) {
        // 이미 생성된 지도는 기존 객체를 반환
        if (maps[office]) return maps[office];

        // 사업장 데이터로 지도 중심 좌표 생성
        var data = officeData[office];
        var position = new naver.maps.LatLng(data.lat, data.lng);

        // 지도와 화면 컨트롤 설정
        var map = new naver.maps.Map(data.mapId, {
            center: position,
            zoom: 17,
            minZoom: 13, // 사용자가 축소할 수 있는 최소 줌 레벨
            maxZoom: 20, // 사용자가 확대할 수 있는 최대 줌 레벨
            mapTypeControl: true,
            mapTypeControlOptions: {
                position: naver.maps.Position.TOP_RIGHT
            },
            // 아래에서 줌 컨트롤을 직접 생성하여 위치 복귀 버튼과 함께 배치
            zoomControl: false
        });

        // 지도가 준비되면 사업장 위치로 돌아오는 버튼을 한 번만 추가
        naver.maps.Event.once(map, 'init', function () {
            // 아이콘만 표시하고, 버튼의 기능은 대체 텍스트와 도움말로 안내
            var locationBtn = '<button type="button" class="map_return" title="사업장 위치로 돌아가기"><img src="./images/sub4/map_return.svg" alt="사업장 위치로 돌아가기" width="22" height="22"></button>';

            // 네이버 기본 줌 컨트롤을 우측 중앙에 생성
            var zoomControl = new naver.maps.ZoomControl({
                position: naver.maps.Position.RIGHT_CENTER
            });
            zoomControl.setMap(map);

            // 같은 위치에 컨트롤을 따로 등록하면 옆으로 나열되므로,
            // 줌 컨트롤 안에 버튼을 넣고 CSS로 바로 아래에 고정
            var zoomElement = zoomControl.getElement();
            zoomElement.classList.add('map_zoom');
            zoomElement.insertAdjacentHTML('beforeend', locationBtn);
            var returnBtn = zoomElement.querySelector('.map_return');

            // 버튼을 누르면 해당 사업장의 좌표로 이동 (현재 줌 값은 유지)
            naver.maps.Event.addDOMListener(returnBtn, 'click', function (e) {
                e.stopPropagation(); // 클릭이 상위 줌 컨트롤로 전달되지 않도록 처리
                map.setCenter(position);
            });
        });

        // 사업장 위치에 커스텀 마커 표시
        new naver.maps.Marker({
            position: position,
            map: map,
            icon: {
                url: './images/sub4/map_icon.svg',
                size: new naver.maps.Size(46, 46),
                scaledSize: new naver.maps.Size(46, 46),
                origin: new naver.maps.Point(0, 0),
                anchor: new naver.maps.Point(23, 46)
            }
        });

        /* 네이버 지도가 자동 생성하는 제목 요소를 문서 아웃라인에서 제외 */
        var mapContainer = document.getElementById(data.mapId);

        var excludeMapHeadings = function () {
            mapContainer
                .querySelectorAll('h1, h2, h3, h4, h5, h6')
                .forEach(function (heading) {
                    heading.hidden = true;
                });
        };

        var mapObserver = new MutationObserver(excludeMapHeadings);

        mapObserver.observe(mapContainer, {
            childList: true,
            subtree: true
        });

        excludeMapHeadings();

        // 완성된 지도 객체 저장 후 반환
        maps[office] = map;

        return map;
    }

    // 본사와 나주지사 지도 초기 실행
    createMap('headquarters');
    createMap('naju');
});
