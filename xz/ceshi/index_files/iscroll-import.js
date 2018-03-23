$(function(){
	if (self!=top){
		$.getScript("http://pub.yapanskin.com/js/iscroll-probe.js",function(){
			window.onload = function(){
			    setTimeout(function(){
			    	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);//阻止浏览器的默认滑动
			        var myScroll = new IScroll('#wrapper', {
				        probeType: 3,
				        mouseWheel: true,
				        click: true,
				    });
			        console.log(myScroll);
			        myScroll.on('scroll',function(){
			            $("#wrapper").trigger('scroll');
			        });
			        myScroll.on('scrollEnd',function(){
			            this.refresh();            
			        });
			    },500)
			    
			}
			$("<link>").attr({ 
				rel: "stylesheet",
				type: "text/css",
				href: "http://pub.yapanskin.com/css/common.css"
			}).appendTo("head");
			
		});
	} else {
		$('body').css('max-width', 640 + 'px');
		$('body').css('margin', 'auto');
	}
	
})





