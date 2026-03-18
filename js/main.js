document.addEventListener("DOMContentLoaded", function () {
    // Tập hợp tất cả các phần tử cần sử dụng
    const backTop = document.querySelector("#back-top");
    
    // xử lý sự kiện để show sub menu
    function handleShowSubMenu() {
        const subMenuContainer = document.querySelector('.js__subMenuContainer')
        if (!subMenuContainer) return;

        const subMenu = subMenuContainer.querySelector(".js__subMenuMb");
        const ShowMenuMb = subMenuContainer.querySelector(".js__clickShowMenuMb");
        var closeSubMenu = subMenuContainer.querySelector(".js__closeSubMenuMb");


        ShowMenuMb.onclick = function () {
            subMenu.classList.add("active");
            document.querySelector("body").style.overflow = "hidden";
        };
        closeSubMenu.onclick = function () {
            subMenu.classList.remove("active");
            document.querySelector("body").style.overflow = "auto";
        };

        const subMenuMbContainers = document.querySelectorAll('.js__subMenuMbContainer');

        if (subMenuMbContainers.length === 0 ) return;
        
        subMenuMbContainers.forEach((subMenuMbContainer)=>{

            const subMenuMbItems = subMenuMbContainer.querySelectorAll('.js__subMenuMbItem');
            const subMenuMbDropdowns = subMenuMbContainer.querySelectorAll('.js__subMenuMbDropdown');
            
            if (subMenuMbItems.length === 0 ) return;
            
            subMenuMbItems.forEach((subMenuMbItem)=>{
                const showSubMenuMbItem = subMenuMbItem.querySelector('.js__showSubMenuMbItem');
                
                if(!showSubMenuMbItem) return

                showSubMenuMbItem.onclick = function() {
                    subMenuMbItem.classList.toggle('active')
                }
            });

            if (subMenuMbDropdowns.length === 0 ) return;

            subMenuMbDropdowns.forEach((subMenuMbDropdown)=>{
                const showSubMenuMbDropdown = subMenuMbDropdown.querySelector('.js__showSubMenuMbDropdown');
                
                if(!showSubMenuMbDropdown) return

                showSubMenuMbDropdown.onclick = function() {
                    subMenuMbDropdown.classList.toggle('active')
                }
            });

            

        });
      
    }

    // xử lý sự kiện show more menu
    function handleMoreMenu() {
        const navbarMore = document.querySelector('.js__navbarMore');
        if (!navbarMore) return;

        const navbarMoreIcon = navbarMore.querySelector('.js__navbarMoreIcon');
        const fullMoreNavbars = navbarMore.querySelectorAll(".js__fullMoreNavbarItem");
        const body = document.body;

        // Hàm tiện ích để kiểm tra và khóa/mở scroll body
        const toggleBodyScroll = () => {
            if (navbarMore.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        };

        // 1. Xử lý click cho Menu chính
        navbarMoreIcon.onclick = function() {
            navbarMore.classList.toggle('active');
            toggleBodyScroll();
        };

        // 2. Xử lý click cho các item con (nếu có)
        if (fullMoreNavbars.length > 0) {
            fullMoreNavbars.forEach((fullMoreNavbar) => {
                const showFull = fullMoreNavbar.querySelector(".js__showFullMoreNavbarItem");
                if (!showFull) return;

                showFull.onclick = function () {
                    fullMoreNavbar.classList.toggle("active");
                    // Nếu bạn muốn việc mở item con cũng ảnh hưởng đến body 
                    // thì có thể gọi toggleBodyScroll() ở đây.
                };
            });
        }

        // 3. (Tùy chọn) Đóng menu khi click ra ngoài để tránh kẹt body hidden
        window.addEventListener('click', function(e) {
            if (!navbarMore.contains(e.target) && navbarMore.classList.contains('active')) {
                navbarMore.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }

    // xử lý sự kiện show search pc
    function handleShowSearchPc() {
        const searchPcs = document.querySelectorAll(".js__searchPc");
        if (searchPcs.length === 0) return;

        searchPcs.forEach((container) => {
            const btnShow = container.querySelector(".js__showFormSearchPc");
            const focusElement = container.querySelector(".js__focusSearchPc");

            // 1. Xử lý khi click vào nút tìm kiếm
            btnShow.onclick = function (event) {
                // Ngăn sự kiện nổi bọt lên window (để tránh kích hoạt ngay lập tức trình đóng search)
                event.stopPropagation();
                
                container.classList.toggle('active');

                if (container.classList.contains('active')) {
                    focusElement.focus();
                } else {
                    focusElement.value = "";
                }
            };

            // 2. Ngăn việc click bên trong form tìm kiếm làm đóng form
            container.onclick = function (event) {
                event.stopPropagation();
            };
        });

        // 3. Lắng nghe sự kiện click trên toàn trang để đóng tất cả search đang mở
        window.addEventListener('click', function () {
            searchPcs.forEach((container) => {
                if (container.classList.contains('active')) {
                    container.classList.remove('active');
                    const focusElement = container.querySelector(".js__focusSearchPc");
                    if (focusElement) focusElement.value = "";
                }
            });
        });
    }
    // Xử lý sự kiện show search mb
    function handleShowSearchMb() {
        const searchMbs = document.querySelectorAll(".js__searchMb");
        if (!searchMbs) return;
        searchMbs.forEach((searchMb) => {
            var closeSearchMb =
                document.querySelector(".js__closeSearchMb");
            var formSearchMb = document.querySelector(".js__formSearchMb");
            const focusElement =
                formSearchMb.querySelector(".js__focusSearchMb");
            searchMb.onclick = function () {
                formSearchMb.classList.add("active");
                focusElement.focus();
            };
            closeSearchMb.onclick = function () {
                formSearchMb.classList.remove("active");
                focusElement.value = "";
            };
        });
    }


    // Khởi tạo fancybox
    function initFancybox() {
        const fancyboxes = document.querySelectorAll(".fancybox-full");
        if (fancyboxes) {
            fancyboxes.forEach(function () {
                $(".fancybox-full a").fancybox();
            });
        }
    }

    // Khởi tạo sticky content 
    function initStickyContent() {
        const stickyContainers = document.querySelectorAll('.js__stickyContainer')
        if (!stickyContainers) return; 
    
        stickyContainers.forEach(item => {
            var stickyElements = [item.querySelector('.js__stickyLeft'), item.querySelector('.js__stickyRight')]
                .filter(element => element !== null); 
    
            stickyElements.forEach(element => {
                $(element).theiaStickySidebar({
                    additionalMarginTop: 60,
                });
            });
        });
    }

    // xử lý sự kiện chuyển tab
    function handleChangeTab() {
        const changTabs = document.querySelectorAll('.js__changeTab');

        if (changTabs.length === 0) return;

        changTabs.forEach((changTab) => {
            const tabs = changTab.querySelectorAll(".js__tabItem");
            const panes = changTab.querySelectorAll(".js__tabPane");

            // 1. Xử lý chuyển Tab
            tabs.forEach((tab, index) => {
                tab.onclick = function() {
                    if (this.classList.contains('active')) return;

                    const pane = panes[index];
                    if (!pane) return;

                    changTab.querySelector('.js__tabItem.active')?.classList.remove('active');
                    changTab.querySelector('.js__tabPane.active')?.classList.remove('active');

                    this.classList.add('active');
                    pane.classList.add('active');

                }
            });

        });
    }


    // khởi tạo slider với nhiều item có width auto
    function initSliderAutoItems() {
        const autoSlides = document.querySelectorAll(".js__autoSlideContainer");
        if (autoSlides) {
            autoSlides.forEach((item) => {
                var slider = item.querySelector(".js__swiperAuto");
                var next = item.querySelector(".swiper-button-next");
                var prev = item.querySelector(".swiper-button-prev");
                new Swiper(slider, {
                    slidesPerView: "auto",
                    spaceBetween: 20,
                    navigation: {
                        nextEl: next || null,
                        prevEl: prev || null,
                    },
                });
            });
        }
    }
    // Khởi tạo slider với một item
    function initSliderOneItems() {
        const oneSlides = document.querySelectorAll(".js__oneSlidesContainer");
        if (oneSlides) {
            oneSlides.forEach((item) => {
                var slider = item.querySelector(".js__oneSlide");
                var next = item.querySelector(".swiper-button-next");
                var prev = item.querySelector(".swiper-button-prev");
                var pagi = item.querySelector(".swiper-pagination");

                var swiperSlides = slider.querySelectorAll('.swiper-slide');
                var loopMode = swiperSlides.length >= 2; 
                new Swiper(slider, {
                    slidesPerView: 1,
                    spaceBetween: 10,
                    slidesPerGroup: 1,
                    autoHeight: true,
                    // loop: loopMode,
                    grabCursor: true,
                    effect: "creative",
                    creativeEffect: {
                        prev: {
                        shadow: true,
                        translate: [0, 0, -400],
                        },
                        next: {
                        translate: ["100%", 0, 0],
                        },
                    },
                    autoplay: {
                        delay: 3000,
                        disableOnInteraction: false,
                    },
                    navigation: {
                        nextEl: next || null,
                        prevEl: prev || null,
                    },
                    pagination: {
                        el: pagi,
                        clickable: true,
                    },
                });
            });
        }
    }

    // khởi tạo slider với 2 item custom
    function initSlideContainerCustomTwoItem() {
        const sliderContainers = document.querySelectorAll('.js__slideContainerCustomTwoItem');

        sliderContainers.forEach(container => {
            const wrapper = container.querySelector('.js__slideListCustomTwoItem');
            const items = container.querySelectorAll('.js__slideItemCustomTwoItem');
            const btnNext = container.querySelector('.js__nextSlide');
            const btnPrev = container.querySelector('.js__prevSlide');

            // CHỈNH SỬA TẠI ĐÂY: Nếu ít hơn 3 item, ẩn nút và dừng xử lý slide
            if (!wrapper || items.length < 3) {
                if (btnNext) btnNext.style.display = 'none';
                if (btnPrev) btnPrev.style.display = 'none';
                
                // Nếu có 1 hoặc 2 item, vẫn nên reset width wrapper về tự động để hiển thị bình thường
                if (wrapper) wrapper.style.width = 'auto'; 
                return;
            }

            // Đảm bảo nút hiện lại nếu trước đó bị ẩn (phòng trường hợp nội dung thay đổi động)
            if (btnNext) btnNext.style.display = 'flex'; // Hoặc 'block' tùy CSS của bạn
            if (btnPrev) btnPrev.style.display = 'flex';

            let currentIndex = 0;
            const EXTRA_SPACE = 5; 

            const updateSlider = (index) => {
                if (index < 0) index = 0;
                if (index > items.length - 2) index = items.length - 2;

                currentIndex = index;

                const w1 = items[currentIndex].offsetWidth + EXTRA_SPACE;
                const w2 = items[currentIndex + 1].offsetWidth + EXTRA_SPACE;
                const totalWidth = w1 + w2;

                wrapper.style.width = `${totalWidth}px`;
                wrapper.style.transition = "width 0.3s ease";

                let scrollAmount = 0;
                for (let i = 0; i < currentIndex; i++) {
                    scrollAmount += (items[i].offsetWidth + EXTRA_SPACE);
                }

                wrapper.scrollTo({
                    left: scrollAmount,
                    behavior: 'smooth'
                });

                if (btnPrev) btnPrev.style.opacity = currentIndex === 0 ? "0.3" : "1";
                if (btnNext) btnNext.style.opacity = currentIndex === items.length - 2 ? "0.3" : "1";
            };

            updateSlider(0);

            btnNext.onclick = () => {
                if (currentIndex < items.length - 2) {
                    updateSlider(currentIndex + 1);
                }
            };

            btnPrev.onclick = () => {
                if (currentIndex > 0) {
                    updateSlider(currentIndex - 1);
                }
            };

            let resizeTimer;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    updateSlider(currentIndex);
                }, 100);
            });
        });
    }

     // Khởi tạo slider với 2 item
    function initSliderTwoItems() {
        const twoSlides = document.querySelectorAll(".js__twoSlidesContainer");
        const items = document.querySelectorAll(".js__itemChildren");
        if (twoSlides) {
            twoSlides.forEach((item) => {
                var slider = item.querySelector(".js__twoSlide");
                var next = item.querySelector(".swiper-button-next");
                var prev = item.querySelector(".swiper-button-prev");
                var slides = slider.querySelectorAll(".swiper-slide");

                if (window.innerWidth <= 1024) {
                    slides.forEach((slide) => {
                        if (slide.querySelector(".empty")) {
                            slide.style.display = "none";
                        }
                    });

                    // items.forEach((item) => {
                    //     if (item.querySelector(".empty")) {
                    //         item.style.display = "none";
                    //     }
                    // });
                }

                var swiper = new Swiper(slider, {
                    slidesPerView: 1,
                    spaceBetween: 0,
                    slidesPerGroup: 1,
                    loop: false,
                    navigation: {
                        nextEl: next || null,
                        prevEl: prev || null,
                    },
                    breakpoints: {
                        640: {
                            slidesPerView: 1,
                            slidesPerGroup: 1,
                        },
                        768: {
                            slidesPerView: 1,
                            slidesPerGroup: 1,
                        },
                        1024: {
                            slidesPerView: 1,
                            slidesPerGroup: 1,
                        },
                        1200: {
                            slidesPerView: 2,
                            slidesPerGroup: 2,
                        },
                    },
                });

                // Thêm sự kiện lắng nghe cho các phím mũi tên
                document.addEventListener("keydown", function (event) {
                    if (event.key === "ArrowRight") {
                        swiper.slideNext();
                    } else if (event.key === "ArrowLeft") {
                        swiper.slidePrev();
                    }
                });

                // Thêm sự kiện khi click vào tab bên trái thì sẽ chuyển đến slide tương ứng
                items.forEach(function (item, index) {
                    item.addEventListener("click", function () {
                        var itemActive = document.querySelector(
                            ".js__itemChildren.active"
                        );
                        itemActive.classList.remove("active");
                        this.classList.add("active");

                        // var index = this.getAttribute("data-index");
                        swiper.slideTo(index);

                        if (window.innerWidth <= 1024) {
                            swiper.slideTo(index - 1);
                        }
                    });
                });
            });
        }
    }
  

    // Xử lý thanh header dính
    function handleStickyHeader() {
        const stickyHeaderPC = document.querySelector(".js__stickyHeader");
        if (stickyHeaderPC) {
            const isSticky = scrollY > 300;
            stickyHeaderPC.classList.toggle("sticky", isSticky);
        }
    }

    // Xử lý sự kiện khi nhấn nút "back to top"
    function handleBackTop() {
    
        if (!backTop) return;

        backTop.onclick = function () {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        };

    }

    // Xử lý hiển thị nút backTop dựa trên vị trí cuộn trang
    function handleBackTopVisibility() {
        if (backTop) {
            if (
                document.body.scrollTop > 300 ||
                document.documentElement.scrollTop > 300
            ) {
                backTop.style.opacity = 1;
                backTop.style.visibility = "visible";
            } else {
                backTop.style.opacity = 0;
                backTop.style.visibility = "hidden";
            }
        }
    }

    // Xử lý sự kiện khi cuộn trang
    function handleWindowScroll() {
        handleStickyHeader();
        handleBackTopVisibility()
    }

    // Khởi tạo tất cả các chức năng
    function initApp() {
        handleBackTop();
        handleShowSubMenu();
        handleMoreMenu();
        handleShowSearchPc();
        handleShowSearchMb();
        handleChangeTab();
        // initFancybox();
        // initStickyContent();
        // slide
        initSliderOneItems();
        initSlideContainerCustomTwoItem();
        // scroll
        window.addEventListener('scroll',handleWindowScroll);
        window.addEventListener('resize',handleWindowScroll);
    }

    // Bắt đầu khởi tạo ứng dụng
    initApp();
});
