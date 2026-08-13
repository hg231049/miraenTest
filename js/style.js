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

    /* 폼 입력 글자 수 카운트 */
    const textBox = document.querySelector(".survey-box .form-item .text-wrap textarea");
    const textCnt = document.querySelector(".survey-box .form-item .text-wrap .count span");
    textBox.addEventListener("input",()=>{
        //console.log(textBox.value.length);
        textCnt.textContent = textBox.value.length;
    });

    /* 폼 입력 버튼 알럿 */
    const submitBtn = document.querySelector(".submit-btn");
    submitBtn.addEventListener("click",()=>{
        window.confirm("지원이 완료되었습니다!");
    });

    /* 과목 탭 슬라이드 진열 */
    $('.subjects-tab').each(function () {
        var $this = $(this);
        var $tabMenu = $this.find('.tab-template').children('li');
        var swiperContainer = $this.find('.tab-contents')[0];
        var paginationEl = $this.find('.swiper-pagination')[0];

        var swiper = $this.data('swiper');

        if (!swiper && swiperContainer) {
            // 랜덤
            var slideCnt = $tabMenu.length;
            var randomIdx = slideCnt > 0 ? Math.floor(Math.random() * slideCnt) : 0;

        swiper = new Swiper(swiperContainer, {
            initialSlide: randomIdx,
            spaceBetween: 0,
            slidesPerView: 1,
            pagination: {
            el: paginationEl,
            clickable: true,
            bulletClass: 'tab-bullet',
            bulletActiveClass: 'active',
            renderBullet: function (index, className) {
                    var bulletHtml = $tabMenu.eq(index).html();
                    return "<li class='" + className + "'>" + bulletHtml + '</li>';
                },
            },
            navigation: {
                nextEl: $this.find('.subjects-next')[0], 
                prevEl: $this.find('.subjects-prev')[0], 
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