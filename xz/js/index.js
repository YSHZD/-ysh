$(function(){
    var mySwiper22 = new Swiper('.swiper-containers', {
        pagination: '.swiper-paginations',
        // loop:true,
        // speed:2000,
        // autoplay: 2000,
        grabCursor: true,
         // centeredSlides: true,
        autoplayDisableOnInteraction : false,
        // slidesPerView: 3,
        paginationClickable: true,
        spaceBetween:0
    });
   var mySwiper11 = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        loop:true,
        speed:4000,
        autoplay: 1000,
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        paginationClickable: true,
        autoplayDisableOnInteraction : false,
    });
   
   var mySwiper0 = new Swiper('.swiper-container-list', {
        loop:true,
        direction : 'vertical',
        speed:2000,
        autoplay: 1000,
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        paginationClickable: true,
        autoplayDisableOnInteraction : false,
    });
   var mySwiper1 = new Swiper('.swiper-container1', {
        pagination: '.swiper-pagination1',
        loop:true,
        speed:2000,
        autoplay: 2000,
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        paginationClickable: true,
        autoplayDisableOnInteraction : false,
    });
   
function Text(h,p){
this.h=h;
this.p=p;
}
var arr=[];
arr.push(new Text('全维度评估','针对孩子特质、教养环境等家庭因素，兴智教育提供专业咨询团队进行全维度评估，深入分析家长与孩子的教养矛盾，找出问题根源，对症下药。'));
arr.push(new Text('私人定制','依据评估结果，科学地制定专属的守护方案，并配备专业的家庭教育指导老师和教育顾问，时时跟踪教育方案实施效果，有针对性地帮助家长解决孩子的问题。'));
arr.push(new Text('优秀师资','邀约了众多国内知名的家庭教育专家进行强强联合，拥有从事多年家庭教育的实践经验和众多成功的教育案列，共同倾力陪伴家长面对孩子学习成长的难题。'));
arr.push(new Text('专业指导','根据孩子的学习成长规律以及家长的教育心理，邀请权威的教育心理界专家为产品研发共同探讨和专研，帮助家长轻松达到解决孩子问题的效果。'));
arr.push(new Text('结果导向','知名青少年问题教育专家肖亦彤老师共同参与，推出科学家庭教育的系列课程，帮助父母做名“持证上岗”的优秀家长，让整个家庭因此从中受益。'));
$('.order-right div').eq(0).addClass('sea');
$('.sea').css({'backgroundImage':'url(../images/x'+1+'.png)'});
$('.order-text').html('<h1>'+arr[0].h+'</h1>'+'<p>'+arr[0].p+'</p>');
   $('.order-right div').on('click',function(){
        $('.sm1').css({'backgroundImage':'url(../images/xx1.png)'});
        $('.sm2').css({'backgroundImage':'url(../images/xx2.png)'});
        $('.sm3').css({'backgroundImage':'url(../images/xx3.png)'});
        $('.sm4').css({'backgroundImage':'url(../images/xx4.png)'});
        $('.sm5').css({'backgroundImage':'url(../images/xx5.png)'});
        var index=$(this).index();
        $(this).siblings().removeClass('sea').end().addClass('sea');$('.sea').css({'backgroundImage':'url(../images/x'+(index+1)+'.png)'});
        $('.order-text').html('<h1>'+arr[index].h+'</h1>'+'<p>'+arr[index].p+'</p>');

   });
$('.goodteachers .swiper-containers').eq(0).show();
$('.goodteachers p span').on('click',function(){
var key=$(this).index();
$(this).siblings().removeClass('ac').end().addClass('ac');
$('.goodteachers .swiper-containers').hide();
$('.goodteachers .swiper-containers').eq(key).show();
});

})

