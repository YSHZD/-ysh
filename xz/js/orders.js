$(function(){
	// 订单分类
$('.orders-title div').on('click',function(){
		$(this).siblings().removeClass('ac').end().addClass('ac');
		if($(this).index()==1){console.log($('.orders-titles li').eq(2));
		/*商品订单*/
			$('.orders-titles li span').eq(2).html('待发货');
		}else{
		/*课程订单*/
			$('.orders-titles li span').eq(2).html('待上课');
		}
	});
/*全部*/
var json5=[{"order_num":"12345678",'order_status':2,'order_img':'images/order.png','order_title':'8大时态123333333333333333333333333333333333333333333333333333重难点精讲1234567','order_price':200.00,'order_count':1,'order_url':'www.baido.com'},{"order_num":"12345678",'order_status':3,'order_img':'images/order.png','order_title':'8大时态重难点精讲1234567','order_price':200.00,'order_count':1,'order_url':'www.baido.com'},{"order_num":"12345678",'order_status':4,'order_img':'images/order.png','order_title':'8大时态重难点精讲1234567','order_price':200.00,'order_count':1,'order_url':'www.baido.com'},{"order_num":"12345678",'order_status':1,'order_img':'images/order.png','order_title':'8大时态重难点精讲1234567','order_price':200.00,'order_count':1,'order_url':'www.baido.com'},{"order_num":"12345678",'order_status':0,'order_img':'images/order.png','order_title':'8大时态重难点精讲1234567','order_price':200.00,'order_count':1,'order_url':'www.baido.com'}];
/*待评论*/
var json4=[{"order_num":"12345678",'order_status':4,'order_img':'images/order.png','order_title':'8大时态重难点精讲1234567','order_price':200.00,'order_count':2,'order_url':'www.baido.com'}];
/*已完成*/
var json3=[{"order_num":"12345678",'order_status':3,'order_img':'images/order.png','order_title':'8大时态重难点精讲1234567','order_price':200.00,'order_count':3,'order_url':'www.baido.com'}];
/*待上课*/
var json2=[{"order_num":"12345678",'order_status':2,'order_img':'images/order.png','order_title':'8大时态重难点精讲1234567','order_price':200.00,'order_count':4,'order_url':'www.baido.com'}];
/*待发货*/
var json6=[{"order_num":"12345678",'order_status':6,'order_img':'images/order.png','order_title':'8大时态重难点精讲1234567','order_price':200.00,'order_count':4,'order_url':'www.baido.com'}];
/*待付款*/
var json1=[{"order_num":"12345678",'order_status':1,'order_img':'images/order.png','order_title':'8大时态重难点精讲1234567','order_price':200.00,'order_count':5,'order_url':'www.baido.com'}];

var json0=[{"order_num":"12345678",'order_status':0,'order_img':'images/order.png','order_title':'8大时态重难点精讲1234567','order_price':200.00,'order_count':6,'order_url':'www.baido.com'}];

var sta=['待收货','待付款','待上课','已完成','待评论','全部','待发货'];
var stas=['确定收货','去支付','去上课','已完成','去评价','全部','待发货'];
function s(key){
	if(key=='去支付'||key=='去上课'){
		return '  pay';
	}else{
		return '';
	}
}
function over(key){
	if(key=='已完成'){
		return '  done';
	}else{
		return '';
	}
}
go(json5);
var key=location.search.split('=')[1];
	if(key){
		go_index(key);
	}
	function go_index(key){
		$('.orders-titles li span').removeClass('ac');
		$('.orders-titles li span').eq(key).addClass('ac');
		var index_text=$('.orders-titles li span').eq(key).html();
		item(index_text)		
	}
$('.orders-titles li span').on('click',function(){
	$('.orders-titles li span').removeClass('ac');
	$(this).addClass('ac');
	console.log($(this).parent('li').index());
	var index_text=$(this).html();
	var orders_title=$('.orders-title .ac').html();

	var orders_item = $('.orders-title');
	item(index_text,orders_title);
});
function item(index_text,orders_title){
	/*orders_title  判断课程 商品*/
	console.log(orders_title);
	if(index_text=='全部'){
		go(json5);
	}else if(index_text=='待付款'){
		go(json1);
	}else if(index_text=='待上课'){
		go(json2);
	}else if(index_text=='已完成'){
		go(json3);
	}else if(index_text=='待评论'){
		go(json4);
	}else if(index_text=='待发货'){
		go(json6);
	}
}
function go(new_order){
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
   });
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
         for(var i = cells.length, len =Math.min((i + 8),max); i < len; i++){
         	var li = document.createElement('li');
            li.className = 'mui-table-view-cell';
			li.innerHTML ='<div class="order-box">\
					    <div class="order-id">\
					        <div class="id_left">订单编号：'+new_order[i].order_num+'</div>\
					        <div class="id_right'+over(sta[new_order[i].order_status])+'">'+sta[new_order[i].order_status]+'</div>\
					    </div>\
					    <div class="order-content">\
					        <div class="order-content-left">\
					            <img src="'+new_order[i].order_img+'"/>\
					        </div>\
					        <div class="order-content-center">\
					            <div>\
					                <h3>'+new_order[i].order_title+'</h3>\
					                <span>￥'+new_order[i].order_price+'x'+new_order[i].order_count+'</span>\
					            </div>\
					        </div>\
					        <div class="order-content-right">\
					            ￥'+(new_order[i].order_price*new_order[i].order_count).toFixed(2)+'\
					        </div>\
					    </div>\
					    <p><a href="'+new_order[i].order_url+'"><span class="order-tips'+s(stas[new_order[i].order_status])+over(sta[new_order[i].order_status])+'">'+stas[new_order[i].order_status]+'</span></a></p>\
					</div> ';
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

});