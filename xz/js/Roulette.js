var arrs = ['8.8元现金红包' ,'谢谢参与' ,'68元现金红包','188元现金红包' ,'谢谢参与', '100元通用课优惠券' ,'88元现金红包', '谢谢参与' ,'18元现金红包'];
    var bRotate = false;
    var rotateFn = function (awards, angles, txt){
        bRotate = !bRotate;
        $('.rotate').stopRotate();
        $('.rotate').rotate({
            angle:0,
            animateTo:angles+3600,
            duration:4500,
            callback:function (){
                bRotate = !bRotate;
                console.log(arrs[txt]);
                if(txt==1||txt==4||txt==7){
                    $('.top_bg').css({"background-image":"url("+ base_statis + "images/comeon.png)"});
                    $('.txts').hide();
                    $('.top').show();
                }else{
                    $('.top_bg').css({"background-image":"url("+ base_statis + "images/winning.png)"});
                    $('.txts strong').css({'-webkit-user-select':'text','-moz-user-select':'text','-o-user-select':'text','user-select':'text','background': 'red','color':'yellow'});
                    $('.top_bg h3').html(arrs[txt]);
                    $('.top').show();
                    $('.txts').show(); 
                }
            }
        })
    };

    $('.close').on("click",function(){
        $('.top').hide();
    });
var item = '';

function get_result(ajax_url){
    console.log(season);
    mui.ajax(ajax_url, {
        data: {
            season : season,
        },
        dataType: 'json',//服务器返回json格式数据
        type: 'post',//HTTP请求类型
//            timeout: 120000,//超时时间设置为10秒；
//         async : false,
        success: function (data) {
            if (data.sts == '1'){
                item = data.award;
                console.log(item);
                go(item);
            }
            else {
                mui.alert(data.msg);
            }
        },
        error: function (xhr, type, errorThrown) {
            //异常处理；
            console.log(type);
            mui.alert('服务异常，请稍后再试');
        }
    });
}
        $('#start').click(function (){
            //     获取中奖i结果
            if(bRotate)return;
            get_result(ajax_url);     
            // var item = '';
        // var item = rnd(0,8);
    });
    function rnd(n, m){
        return Math.floor(Math.random()*(m-n+1)+n)
    }
function go(key){
    if (item == '') return;
           console.log(item);
        switch (item) {
            case 0:
                rotateFn(0, 340, 0);
                break;
            case 1:
                rotateFn(1, 300, 1);
                break;
            case 2:
                rotateFn(2, 260, 2);
                break;
            case 3:
                rotateFn(3, 220, 3);
                break;
            case 4:
                rotateFn(4, 180, 4);
                break;
            case 5:
                rotateFn(5, 140, 5);
                break;
            case 6:
                rotateFn(6, 100, 6);
                break;
            case 7:
                rotateFn(7, 60, 7);
                break;
            case 8:
                rotateFn(8, 20, 8);
                break;
        }
}
(function(doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in win ? 'orientationchange' : 'resize',
    recalc = function() {
      var clientWidth = docEl.clientWidth;
      if(!clientWidth) return;
      docEl.style.fontSize = 200 * (clientWidth / 750) + 'px';
    };
  if(!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window)
