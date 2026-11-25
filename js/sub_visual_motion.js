// ===== 전체 서브페이지 상단 비주얼 텍스트 GSAP 효과 =====
// 본문에는 적용하지 않고 .visual_txt 안의 영문, 제목, 설명만 순서대로 나타냅니다.
(function () {
    // 상단 비주얼이 없는 페이지이거나 GSAP을 불러오지 못한 경우에는 실행하지 않습니다.
    if (!document.querySelector('.visual_txt') || typeof gsap === 'undefined') return;

    // 움직임 줄이기를 설정한 사용자는 애니메이션 없이 내용을 바로 확인할 수 있습니다.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.fromTo('.visual_txt > *',
        {
            opacity: 0,
            y: 35
        },
        {
            opacity: 1,
            y: 0,
            duration: .85,
            stagger: .14,
            ease: 'power3.out'
        }
    );
})();
