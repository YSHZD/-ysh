$(function(){
   $('.study_menu li').on('click',function(){
      $(this).siblings().removeClass('study_menu_ac').end().addClass('study_menu_ac');
   	$('.study_menu div').stop(true).slideUp(400)
      $(this).find($('div')).stop(true).slideDown();
   });
   

var study_menu=[
{"id":"0","name":"幼儿园及小学阶段","child":[{"id":"00","name":"大班","child":[{"id":"000","name":"语文"},{"id":"001","name":"数学"},{"id":"002","name":"英语"}]},{"id":"01","name":"中班","child":[{"id":"010","name":"语文"},{"id":"011","name":"数学"},{"id":"012","name":"英语"}]},{"id":"02","name":"小班","child":[{"id":"020","name":"语文"},{"id":"021","name":"数学"},{"id":"022","name":"英语"}]}]},{"id":"1","name":"初中阶段","child":[{"id":"10","name":"初一","child":[{"id":"100","name":"语文"},{"id":"101","name":"数学"},{"id":"102","name":"英语"}]},{"id":"11","name":"初二","child":[{"id":"110","name":"语文"},{"id":"111","name":"数学"},{"id":"112","name":"英语"}]},{"id":"12","name":"初三","child":[{"id":"120","name":"语文"},{"id":"121","name":"数学"},{"id":"122","name":"英语"}]}]},{"id":"2","name":"高中阶段","child":[{"id":"10","name":"高一","child":[{"id":"200","name":"语文"},{"id":"201","name":"数学"},{"id":"202","name":"英语"}]},{"id":"11","name":"高二","child":[{"id":"210","name":"语文"},{"id":"211","name":"数学"},{"id":"212","name":"英语"}]},{"id":"12","name":"高三","child":[{"id":"220","name":"语文"},{"id":"221","name":"数学"},{"id":"222","name":"英语"}]}]}];
$(function(){
   var str=''; 
   for(var i=0;i<study_menu.length;i++){
      str+='<p>'+study_menu[i].name+'<\/p>';
    }
   $('.study_menu_sm').html(str);
   $('.study_menu p').on('click',function(event){
         $('.study_menu p').removeClass('study_ac');
         event.stopPropagation();
         $(this).addClass('study_ac');
         $('.study_menu div').stop().slideUp(400);
      });

   $('.study_menu_sm p').on('click',function(){
      var index_bg=$(this).index();
      /*阶段*/
      $('.study_menu li span').eq(0).html($(this).html());
      console.log($(this).html());
      var len=study_menu[index_bg]['child'].length;
      var arr=study_menu[index_bg]['child'];
      var str="";
      for(var i=0;i<len;i++){
      str+='<p>'+arr[i].name+'<\/p>';
      }
    $('.study_menu_sm1').html(str);
    $('.study_menu p').on('click',function(event){
         $('.study_menu p').removeClass('study_ac');
         event.stopPropagation();
         $(this).addClass('study_ac');
         $('.study_menu div').stop().slideUp(400);
      });
         $('.study_menu_sm1 p').on('click',function(){
      var index=$(this).index();
     /* 年级*/
      console.log($(this).html());
      $('.study_menu li span').eq(1).html($(this).html());
      var len=study_menu[index_bg]['child'][index]['child'].length;
      var arr=study_menu[index_bg]['child'][index]['child'];
      var str="";
      for(var i=0;i<len;i++){
      str+='<p>'+arr[i].name+'<\/p>';
      }
    $('.study_menu_sm2').html(str);
    $('.study_menu p').on('click',function(event){
         $('.study_menu p').removeClass('study_ac');
         event.stopPropagation();
         $(this).addClass('study_ac');
         $('.study_menu div').stop().slideUp(400);
         /*科目*/
         $('.study_menu li span').eq(2).html($(this).html());
          console.log($(this).html());
      });
});
});
});

var str_study=[{'img':"images/go2.jpg","title":'1训练版 (4-12岁/幼儿园及小学阶段)','price':3980,'time':'110课时',id:1,"pay_status":0},{'img':"images/go2.jpg","title":'1训练版 (4-12岁/幼儿园及小学阶段)','price':3980,'time':'110课时',id:1,"pay_status":1},{'img':"images/go2.jpg","title":'1训练版 (4-12岁/幼儿园及小学阶段)','price':3980,'time':'110课时',id:1,"pay_status":2},{'img':"images/go2.jpg","title":'1训练版 (4-12岁/幼儿园及小学阶段)','price':3980,'time':'110课时',id:1,"pay_status":0},{'img':"images/go2.jpg","title":'1训练版 (4-12岁/幼儿园及小学阶段)','price':3980,'time':'110课时',id:1,"pay_status":0},{'img':"images/go2.jpg","title":'1训练版 (4-12岁/幼儿园及小学阶段)','price':3980,'time':'110课时',id:1,"pay_status":0},{'img':"images/go2.jpg","title":'1训练版 (4-12岁/幼儿园及小学阶段)','price':3980,'time':'110课时',id:1,"pay_status":0},{'img':"images/go2.jpg","title":'21训练版 (4-12岁/幼儿园及小学阶段)','price':3980,'time':'110课时',id:1,"pay_status":0},{'img':"images/go2.jpg","title":'31训练版 (4-12岁/幼儿园及小学阶段)','price':3980,'time':'110课时',id:1,"pay_status":0}];
var pay_status=['直播','看回放','点播'];
var max=str_study.length;
   mui.init({
      pullRefresh: {
         container: '#pullrefresh',
         down: {
            callback: pulldownRefresh
         },
         up: {
            contentrefresh: '正在加载...',
            callback: pullupRefresh
         }
      }
   });
   /**
    * 下拉刷新具体业务实现
    */
   function pulldownRefresh() {
      setTimeout(function() {
         mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
      }, 1500);
   }
   var count = 0;
   /**
    * 上拉加载具体业务实现
    */
   function pullupRefresh() {
      setTimeout(function() {
         mui('#pullrefresh').pullRefresh().endPullupToRefresh((++count > 2)); //参数为true代表没有更多数据了。
         var table = document.body.querySelector('.mui-table-view');
         var cells = document.body.querySelectorAll('.mui-table-view-cell');
         for (var i = cells.length, len =Math.min((i + 4),max); i < len; i++) {
            var li = document.createElement('li');
            li.className = 'mui-table-view-cell';
            li.innerHTML = '<div class="study_box">\
                           <div class="left"><img src="'+str_study[i].img+'"/></div>\
                           <div class="right">\
                              <p>'+str_study[i].title+'</p>\
                              <strong>'+str_study[i].price+'</strong>\
                              <p><span>'+str_study[i].time+'</span><span class="study_color">'+pay_status[str_study[i].pay_status]+'</span></p>\
                              <a href="'+str_study[i].id+'"><span class="study_buttom">立即预约<\/span></a>\
                           </div>\
                        </div>';
            table.appendChild(li);
         }
      }, 1500);
   }
   if (mui.os.plus) {
      mui.plusReady(function() {
         setTimeout(function() {
            mui('#pullrefresh').pullRefresh().pullupLoading();
         }, 1000);

      });
   } else {
      mui.ready(function() {
         mui('#pullrefresh').pullRefresh().pullupLoading();
      });
   }
   });

