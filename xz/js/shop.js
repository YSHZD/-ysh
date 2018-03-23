$(function(){
    $('.sidebar li').eq(0).addClass('active');
    $('.shop_content ul').eq(0).slideDown();
   $('.sidebar  li').on('click',function(){
    $(this).addClass('active').siblings().removeClass('active');
    var index = $(this).index();
    $('.shop_content ul').slideUp();
    $('.shop_content ul').eq(index).slideDown();
    var shop=[{"img":"images/shop1.jpg",'title':'巴巴腾儿童智能机器人 小腾智能玩','price':59,'shop_done':100,'url':'www.baido.com'},{"img":"images/shop1.jpg",'title':'巴巴腾儿童智能机器人 小腾智能玩','price':59,'shop_done':100,'url':'www.baido.com'},{"img":"images/shop1.jpg",'title':'巴巴腾儿童智能机器人 小腾智能玩','price':59,'shop_done':100,'url':'www.baido.com'}];
function go(shop){
	$('#orderList').val(JSON.stringify(new_order));
	$('.mui-table-view').html("");
	 var max = new_order.length;	
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
   });console.log(new_order);
	 mui('#pullrefresh').pullRefresh().scrollTo(0,0,100);
   function pulldownRefresh() {
      setTimeout(function() { 
         mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
      }, 1000);
   }
   var count = 0;
   function pullupRefresh() {	
		var new_order= JSON.parse($('#orderList').val());
 		var max = new_order.length;	
      setTimeout(function() {      
         mui('#pullrefresh').pullRefresh().endPullupToRefresh((++count > 2)); //参数为true代表没有更多数据了。
         var table = document.body.querySelector('.mui-table-view');
         var cells = document.body.querySelectorAll('.mui-table-view-cell');
         for(var i = cells.length, len =Math.min((i + 2),max); i < len; i++){
         	var li = document.createElement('li');
            li.className = 'mui-table-view-cell';
			li.innerHTML ='<a href="'+order[i].url+'"><div>\
					<img src="'+order[i].img+'">\
					<h2>'+order[i].title+'</h2>\
					<p><span>¥</span><strong>'+order[i].price+'</strong>'+order[i].shopdone+'人已付款</p>\
				</div></a>';

            table.appendChild(li)
			}
      }, 1000);
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
   	
}
   })
})

