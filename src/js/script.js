

jQuery(function ($) {
    $(document).ready(function () {

        const $mobileIcon = document.querySelector('.header-wrap__mobile');
        const $menu = document.querySelector('.header-wrap__nav');

        if ($mobileIcon !== null) {
            $mobileIcon.addEventListener('click', () => {
                $mobileIcon.classList.toggle('active-menu');
                setTimeout(() => {
                    $menu.classList.toggle('active-nav');
                }, 100)
            })
        }


        window.addEventListener(`resize`, event => {
            if (window.outerWidth < 1176) {
                initMenagerSlick()
            }
            else {
                $('.stars-wrap__list').slick('unslick');
            }
            if (window.outerWidth > 768) {
                initReviewsSlider();
                $('.reviews-mobile ul').slick('unslick');
                $('.partners-wrap__list').slick('unslick');
            }
            else {
                $('.reviews-slider').slick('unslick');
                initReviewsMobileSlider();
                initPartnersSlider();
            }
        }, false);

        if (window.outerWidth < 1176) {
            initMenagerSlick();
        }

        if (window.outerWidth > 768) {
            initReviewsSlider();
        }
        else {
            initReviewsMobileSlider();
            initPartnersSlider();
        }

        function initMenagerSlick() {
            const node = document.querySelector('.stars-wrap__list');
            if (node.classList[1] !== 'slick-initialized') {
                $('.stars-wrap__list').slick({
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: false,
                    arrows: false,
                    dots: true,
                    responsive: [
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                                dots: true
                            }
                        },
                    ]
                });
            }

        }

        function initReviewsSlider() {
            const node = document.querySelector('.reviews-slider');
            if (node.classList[1] !== 'slick-initialized') {
                $('.reviews-slider').slick({
                    infinite: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: true,
                    dots: true,
                    responsive: [
                        {
                            breakpoint: 1275,
                            settings: {
                                arrows: false
                            }
                        },
                    ]
                });
            }
        }

        function initReviewsMobileSlider() {
            const node = document.querySelector('.reviews-mobile ul');
            if (node.classList[1] !== 'slick-initialized') {
                $('.reviews-mobile ul').slick({
                    infinite: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: true,
                });
            }
        }

        function initPartnersSlider() {
            const node = document.querySelector('.partners-wrap__list');
            if (node.classList[1] !== 'slick-initialized') {
                $('.partners-wrap__list').slick({
                    infinite: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: true,
                });
            }
        }




        function testWebP(callback) {

            var webP = new Image()
            webP.onload = webP.onerror = function () {
                callback(webP.height == 2)
            }
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA"
        }

        testWebP(function (support) {

            if (support == true) {
                document.querySelector('body').classList.add('webp')
            }
        })
    });
});