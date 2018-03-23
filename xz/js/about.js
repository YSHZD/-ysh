$(function(){
	$('.aboutus_teachers div').on('click',function(){
		 $(this).addClass('aboutus_active').siblings().removeClass('aboutus_active');
		 console.log($(this).html());
	});
    $('.aboutus_head li').eq(0).addClass('ac');
    $('.aboutus_contents .aboutus_box').eq(0).slideDown();
   $('.aboutus_head li').on('click',function(){
    $(this).addClass('ac').siblings().removeClass('ac');
    var index = $(this).index();
    $('.aboutus_contents .aboutus_box').slideUp();
    $('.aboutus_contents .aboutus_box').eq(index).slideDown();
   })
})

