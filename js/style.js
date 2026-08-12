$(document).ready(function(){
    /* 탭 */
    var tabButton = $(".tab-menu").find("a");

    let isClickScrolling = false;
    let clickScrollTimer = null;
    const CLICK_SCROLL_TIMEOUT = 800;

    // 스크롤 시 active 적용
    function onTabScroll() {
        if (isClickScrolling) return;

        $(".tab-wrap .tab-menu").addClass("on");
        const scrollPos = $(document).scrollTop();
        const isMobile = window.matchMedia("(max-width: 991px)").matches;

        tabButton.each(function(){
            const currLink = $(this);
            const sel = currLink.attr("href");
            const refElement = $(sel);
            if (!refElement.length) return;

            const refTop = refElement.offset().top - 2;
            let refBottom = refTop + refElement.innerHeight(); // 기본(PC)

            if (isMobile) {
            refBottom = refTop + refElement.innerHeight(); // 모바일은 -181 미적용
            }

            if (refTop <= scrollPos && refBottom > scrollPos) {
            tabButton.parents("li").removeClass("selected");
            currLink.parents("li").addClass("selected");
            return false;
            }
        });
    }

    function cancelClickScroll() {
        if (!isClickScrolling) return;
        isClickScrolling = false;
        if (clickScrollTimer) {
            clearTimeout(clickScrollTimer);
            clickScrollTimer = null;
        }
    }

    // 사용자 입력 시 인터럽트
    $(document).on('wheel touchstart mousedown keydown', cancelClickScroll);

    // 탭 클릭 시
    tabButton.on("click", function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();           // ★ 다른 클릭 핸들러(테마 기본 스크롤 등) 차단

        const $this = $(this);
        const target = $($this.attr("href"));
        if (!target.length) return;

        isClickScrolling = true;

        if (clickScrollTimer) clearTimeout(clickScrollTimer);
        clickScrollTimer = setTimeout(cancelClickScroll, CLICK_SCROLL_TIMEOUT);

        tabButton.parents("li").removeClass("selected");
        $this.parents("li").addClass("selected");

        // ★ 다른 곳에서 걸어둔 애니메이션 큐/진행 중 스크롤 지우기
        $('html, body').stop(true, false).animate(
            { scrollTop: target.offset().top },
            500,
            function() {
            cancelClickScroll();
            onTabScroll();
            }
        );
    });

    $(window).on("scroll", onTabScroll);
    onTabScroll();


  $(".top-btn").click(function(e){
    $("html, body").animate({ scrollTop : 0 }, 600);
    //e.preventDefault();
  });

  $('.subjects-tab').each(function () {
        var $this = $(this);
        var $tabMenu = $this.find('.tab-template').children('li');
        var swiperContainer = $this.find('.tab-contents')[0];
        var paginationEl = $this.find('.swiper-pagination')[0];

        var swiper = $this.data('swiper');

        if (!swiper && swiperContainer) {
        swiper = new Swiper(swiperContainer, {
            spaceBetween: 0,
            slidesPerView: 1,
            pagination: {
            el: paginationEl,
            clickable: true,
            bulletClass: 'tab-bullet',
            bulletActiveClass: 'active',
            renderBullet: function (index, className) {
                    // 원본 .tab-template li 안의 HTML 구조를 그대로 복사하여 탭 버튼 생성
                    var bulletHtml = $tabMenu.eq(index).html();
                    return "<li class='" + className + "'>" + bulletHtml + '</li>';
                },
            },
            navigation: {
                nextEl: $this.find('.subjects-next')[0], // 다음 버튼 요소
                prevEl: $this.find('.subjects-prev')[0], // 이전 버튼 요소
            },
            grabCursor: true,
            autoplay: {
            delay: 3000,
            disableOnInteraction: false,
            },
        });

        $this.data('swiper', swiper);
        }
    });
});