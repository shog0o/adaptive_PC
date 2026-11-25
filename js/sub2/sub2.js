// 대표 프로젝트 스와이퍼
// HTML에 준비한 세 개의 project_card를 한 장씩 좌우로 이동한다.
var projectSwiper = new Swiper('.project_swiper', {
    slidesPerView: 1,
    spaceBetween: 16,

    // 마지막 슬라이드 다음에서 첫 번째 슬라이드로 이어지도록 반복한다.
    loop: true,

    // 하단 페이지 표시를 연결하고 직접 눌러 이동할 수 있게 한다.
    pagination: {
        el: '.project_pagination',
        clickable: true
    }
});