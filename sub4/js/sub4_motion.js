// JavaScript Document

$(document).ready(function () {
    // ===== sub4 본문영역 전용 GSAP 스크롤 효과 =====
    // 상단 비주얼 텍스트는 ../js/sub_visual_motion.js에서 따로 처리합니다.
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    // 각 본문 영역의 번호 제목을 왼쪽에서 부드럽게 나타냅니다.
    gsap.utils.toArray('#content .section_label').forEach(function (label) {
        gsap.from(label, {
            opacity: 0,
            x: -35,
            duration: .8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: label,
                start: 'top 85%'
            }
        });
    });

    // 첫 번째 대표 이미지를 좌우로 열리듯 보여줍니다.
    gsap.utils.toArray('.con1 .main_img').forEach(function (mainImg) {
        gsap.from(mainImg, {
            opacity: 0,
            clipPath: 'inset(0 50% 0 50%)',
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: mainImg,
                start: 'top 82%'
            }
        });
    });

    // 첫 번째 콘텐츠의 제목과 설명을 아래에서 위로 나타냅니다.
    gsap.utils.toArray('.con1 .text_box, .con1 .main_text').forEach(function (textBox) {
        var targets=$(textBox).hasClass('main_text') ? textBox : $(textBox).children();

        gsap.from(targets, {
            opacity: 0,
            y: 40,
            duration: .8,
            stagger: .14,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: textBox,
                start: 'top 84%'
            }
        });
    });

    // 두 번째 콘텐츠의 큰 이미지·정보 박스를 부드럽게 나타냅니다.
    gsap.utils.toArray('.con2 .con_inner, .con2 .info_box, .con2 .photo_box').forEach(function (box) {
        gsap.from(box, {
            opacity: 0,
            y: 50,
            duration: .9,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: box,
                start: 'top 82%'
            }
        });
    });

    // 목록형 콘텐츠는 각 항목을 순서대로 나타냅니다.
    gsap.utils.toArray('.con2 .con_list, .con2 .info_box ol, .con2 .quality_list').forEach(function (list) {
        gsap.from($(list).children('li'), {
            opacity: 0,
            y: 35,
            duration: .7,
            stagger: .13,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: list,
                start: 'top 84%'
            }
        });
    });

    // 마지막 어두운 영역의 문구와 항목을 차례대로 나타냅니다.
    gsap.utils.toArray('.con3 .text_box, .con3 .con_title').forEach(function (textBox) {
        gsap.from(textBox, {
            opacity: 0,
            y: 38,
            duration: .8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: textBox,
                start: 'top 82%'
            }
        });
    });

    gsap.from('.con3 ol > li', {
        opacity: 0,
        y: 40,
        duration: .75,
        stagger: .14,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.con3 ol',
            start: 'top 86%'
        }
    });
});
