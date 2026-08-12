$(document).ready(function(){
    /* 탭버튼 */
    var tabButton = $(".tab-menu").find("a");

    /* 스크롤 시 active 적용 */
    function onTabScroll() {
        $(".tab-wrap .tab-menu").addClass("on");

        const scrollPos = $(document).scrollTop();

        tabButton.each(function () {
            const currLink = $(this);
            const target = $(currLink.attr("href"));

            if (!target.length) return;

            const targetTop = target.offset().top;
            const targetBottom = targetTop + target.outerHeight();

            if (targetTop <= scrollPos && targetBottom > scrollPos) {
                tabButton.parents("li").removeClass("selected");
                currLink.parents("li").addClass("selected");

                return false;
            }
        });
    }

    /* 탭 클릭 */
    tabButton.on("click", function (e) {
        e.preventDefault();

        const target = $($(this).attr("href"));

        if (!target.length) return;

        tabButton.parents("li").removeClass("selected");
        $(this).parents("li").addClass("selected");

        $("html, body").stop().animate(
            {
                scrollTop: target.offset().top
            },
            500
        );
    });

    /* 스크롤 */
    $(window).on("scroll", onTabScroll);

    onTabScroll();

 /* 상단이동 */
  $(".top-btn").click(function(e){
    $("html, body").animate({ scrollTop : 0 }, 600);
    //e.preventDefault();
  });
  /* 과목 탭 슬라이드 진열 */
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