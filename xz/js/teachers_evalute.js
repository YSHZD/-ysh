var is_anonymity = 0;//1代表匿名
var star_num = 0;
var json0 = [{'title':'非常不满意，各方面都很差','des':'把您不满意的地方告诉我们吧','items':['经常凶学生','教学很乱听不懂','不辅导学生作业','表达能力很差','方法不实用','很多重难点没讲','学习兴趣差','教学枯燥无味','没有成就感']}];
var json1 = [{'title':'不满意 比较差','des':'是哪里做得不够好呢','items':['沟通态度很差','嘲讽学生','不辅导学生作业','内容很空洞','实用性差','没有条理','上课气氛沉闷','收获少','情感互动差']}];
var json2 = [{'title':'一般 需要改善','des':'请您选出我们做的不好的地方','items':['沟通态度好','有耐心','课后作业不合理','重点把握有偏差','有点啰嗦','条理不清晰','上课有趣','情感互动很好','充分分类教学']}];
var json3 = [{'title':'比较满意 但仍可以改善','des':'我们很需要您的意见哦','items':['换位思考做得好','教学很到位','逻辑很清晰','很有爱心','非常言简意赅','实用性很强','个性发展做得棒','寓教于情做得好','肢体语言好']}];
var json4 = [{'title':'非常满意 无可挑剔','des':'夸夸老师吧','items':['态度好','服务棒','有耐心','表达能力好','熟练把握重难点','生动科学','激发学习兴趣','收获多','因材施教']}];
function go(index){
    var datas;
    switch(index){
        case 0:
        datas = json0;break;
        case 1:
        datas = json1;break;
        case 2:
        datas = json2;break;
        case 3:
        datas = json3;break;
        case 4:
        datas = json4;break;
    }
    var str = '<h3>'+datas[0].title+'</h3><p>'+datas[0].des+'</p><div class="tip">';
    var sm_str="";
    for(var i=0;i<datas[0].items.length;i++){
        sm_str +='<span>'+datas[0].items[i]+'</span>';   
    }
    str+=sm_str+'</div>';
    $('.tips').html(str);
    $('.tips').show();
    $('.tips span').on('click',function(){
        if($(this).hasClass('ac')){
            $(this).removeClass('ac');
        }else{
            $(this).addClass('ac');
        }   
    });
}

$('.is_anonymity').on('click',function(){
    if(is_anonymity == 1){
        is_anonymity=0;
        $('.is_anonymity img').attr('src',base_static + 'images/no.png')
    }else{
        is_anonymity=1;
        $('.is_anonymity img').attr('src',base_static + 'images/yes.png')
    }
});

$('.go_comment_star span').on('click',function(){
    var index=$(this).index()+1;
    star_num = index;
    $('.go_comment_star span').removeClass('ac');
    for(var i=0;i<index;i++){
        $('.go_comment_star span').eq(i).addClass('ac');
    }
    go($(this).index());
});
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

/************************提交***************************/
$('.sum div').on('click',function(){
    var classname = $('.classNames').val();
    var comment = '';
    if(classname==-1){
        mui.alert('科目不能为空！');
        return false;
    }
    if(star_num==0){
        mui.alert('打分不能为空！');
        return false;
    }
    var arrs = $('.tips span');
    var len = arrs.length;
    var newArr = [];
   for(var i=0;i<len;i++){
    if($(arrs[i]).hasClass('ac')){
        newArr.push($(arrs[i]).html());
    }
   }
   if(newArr.length==0){
     mui.alert('打分原因未选！');
        return false;
   }
   var sign = newArr.join(',');
   if($('.input').val()){
        comment = $('.input').val()
    }
    console.log('star_num= '+star_num);
    console.log('newArr = '+newArr);
    console.log(is_anonymity);//1代表匿名 0公开
    console.log('comment='+comment);


    mui.ajax(send_url,{
        data:{
            teacher_id: '1',
            star: star_num,
            sign : sign,
            content : comment,
            is_anonym : is_anonymity,
            subject : classname,
        },
        dataType:'json',//服务器返回json格式数据
        type:'post',//HTTP请求类型
//            timeout:4000,//超时时间设置为10秒；
        success:function(result){
            console.log(result);
            if (result[0] == 0){
                mui.alert(result[1]);
            } else {
                mui.alert('提交成功',function () {
                    window.location.href = redirect_url;
                })
            }
        },
        error:function(xhr,type,errorThrown){
            //异常处理；
//                console.log(type);
            mui.alert('服务异常，请稍后再试');
        }
    });

});
$('.back').on('click',function(){
    window.history.go(-1);
});