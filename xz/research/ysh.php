<?php 
$sum=0;
 for($i=0;$i<10;$i++){
	$sum=$sum+$_POST['jf'.$i];
}
$stxlwx =null;
if($sum<13){
	$stxlwx=1;
}
else if($sum>=13&&$sum<=18){
	$stxlwx=2;
}
else if($sum>=19&&$sum<=23){
	$stxlwx=3;
}
else if($sum>=24&&$sum<=30){
	$stxlwx=4;
}

 ?>

 
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
	<title>测一测，你是孩子喜欢的父母吗？  </title>
<!-- 	<link rel="stylesheet" type="text/css" href="css/swiper-3.4.0.min.css">
<link rel="stylesheet" type="text/css" href="css/animate.min.css"> -->
	<style type="text/css">
		*{margin:0;padding:0;}
		html,body{height:100%;}	
		.swiper-container{width:100%;height:100%;background:#fff;}
		.swiper-slide{
			width:100%;
			height:100%;
		}
		.swiper-slide div{
			width:100%;
			height:100%;
		}
		div img{width:100%;height:auto;}
		img{
			width:100%;
		}
		.swiper-pagination-bullet{
			width:6px;
			height:6px;
			background:#fff;
			opacity:.4;
		}
		.swiper-pagination-bullet-active{
			opacity:1;
		}
		@-webkit-keyframes tipmove{
			0%{bottom:10px;opacity:0;}
			50%{bottom:15px;opacity:1;} 
			100%{bottom:20px;opacity:0;}
		}
		.ani{position:absolute;}
		.txt{position:absolute;}
		#array{
			position:absolute;z-index:999;
			-webkit-animation:tipmove 1.5s infinite ease-in-out;
		}
		img{width:100%;height:auto;}
		div{max-width: 800px;margin:0 auto;}
	</style>
<script>

</script>
</head>
<body>
	<div>
	<script>document.writeln("<img src=\"image/"+<?php echo $stxlwx; ?>+".jpg\">")</script>
	</div>
	<audio id="audio" src="mp3test.mp3" loop="loop" preload="">

</body>
<script src="https://s22.cnzz.com/z_stat.php?id=1271260868&web_id=1271260868" language="JavaScript"></script>
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script>
function autoPlayAudio() {
        wx.config({
            // 配置信息, 即使不正确也能使用 wx.ready
            debug: false,
            appId: '',
            timestamp: 1,
            nonceStr: '',
            signature: '',
            jsApiList: []
        });
        wx.ready(function() {
            var globalAudio=document.getElementById("audio");
            globalAudio.play();
        });
};
// 解决ios音乐不自动播放的问题
autoPlayAudio();
</script>

</html>