$(function() {
var mySwiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        effect : 'fade',
		    loop:true,
        speed:2000,
        autoplayDisableOnInteraction : false,
        autoplay: 2000,
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
       /* paginationBulletRender: function (swiper, index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },*/
        coverflow: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows : true
        }
    });
$('.swiper-wrapper').hover(
  function(){mySwiper.stopAutoplay();},
  function(){mySwiper.startAutoplay();}
);
 
}) ;