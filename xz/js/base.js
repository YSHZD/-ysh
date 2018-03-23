
function addshop(){
  var i=parseInt($('.shop_add1 .shopnum').html());
  $('.shop_add1').addClass('shop_active');
  i+=1;
  $('.shop_add1 .shopnum').html(i);
  console.log(i);
}
function CheckPost(){
    alert(1);
    console.log($('.username').val());
    return false;
}
$(function(){
    $('.footer').find($('.right')).on('click',function(){
        $('body').append('<div class="service">\
            </div>\
            <div class="service_content">\
                <div class="service_header">\
                    <img src="images/logo.jpg">\
                    <div class="right close">\
                        <i class="iconfont icon-quxiao"></i>\
                    </div>\
                </div>\
                <div class="service_form">\
                    <h2>售后服务</h2>\
                    <p>亲爱的家长和孩子，感谢您选择兴智教育如果您有任何不满和建议，可以留言告诉我们我们一定会及时更正解决。</p>\
                    <form action="" method="" onsubmit="return CheckPost();">\
                        <input type="text" name="username" placeholder="请填写家长的姓名" class="username">\
                        <input type="number" name="usertel" placeholder="请填写您的电话">\
                        <textarea placeholder="请填写你投诉的问题"></textarea name="info">\
                        <input type="submit" name="提交" class="submit">\
                    </form>\
                </div>\
            </div>');
        $('.service_content').css({"top":(ScollPostion()['top']+20)+"px"});
        $('.close').on('click',function(){
            $('.service').fadeOut(500);
             $('.service_content').fadeOut(600);
         });
         console.log($('.form'))
        // $("form").submit(function(e){
        //      $('body').append('<div class="answer_ok">提交成功</div>');
        //      setTimeOut(function(){
        //         $('.answer_ok').hide();
        //      },300);
        // });
        function ScollPostion() {//滚动条位置
         var t, l, w, h;
         if (document.documentElement && document.documentElement.scrollTop) {
         t = document.documentElement.scrollTop;
         l = document.documentElement.scrollLeft;
         w = document.documentElement.scrollWidth;
         h = document.documentElement.scrollHeight;
         } else if (document.body) {
         t = document.body.scrollTop;
         l = document.body.scrollLeft;
         w = document.body.scrollWidth;
         h = document.body.scrollHeight;
         }
         return { top: t, left: l, width: w, height: h };
         }

    });
$('.back').on('click',function(){
    window.history.go(-1);
});
var CheckPost=function(){
            console.log(1);
            return false;
         }
$('.comment_dots').on('click',function(){
    $(this).siblings().find($('.comment_del')).toggle();
})
$('.kf_here').on('click',function(){
   
});
});

