function isIOS () {
    var u = navigator.userAgent;
    return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
}
function layout () {
    var width = $(window).width();

    $('.video').css('height', width * 0.55);

    $('#play').css('left', width / 2 - 40);

    $('.list-section').css('top', width * 0.55);
}
var query = BJY.query;

// 给自己的用户类型设置中英文术语
var userRoleMap = { };
var config = BJY.config;
var mediaData = BJY.data.media;
var barrage;

userRoleMap[ config.ROLE_TYPE_TEACHER ] = {
    en: 'teacher',
    cn: '老师'
};
userRoleMap[ config.ROLE_TYPE_ASSISTANT ] = {
    en: 'assistant',
    cn: '助教'
};
userRoleMap[ config.ROLE_TYPE_STUDENT ] = {
    en: 'student',
    cn: '学生'
};
userRoleMap[ config.ROLE_TYPE_GUEST ] = {
    en: 'guest',
    cn: '游客'
};

// 文档加载完成后
$(document).ready(function () {
    var barrage;
    var userList;
    var messageList;
    var messageSender;

    var eventEmitter = BJY.eventEmitter;
    var store = BJY.store;
    var pageData = BJY.data.page;
    var Player = BJY.Player;
    var  html = Player.html;
    html.showControls = true;
    html.init();
    var teacherH5Player;
    var playButton = $('#play');

    layout();

    var loading = BJY.Loading.create({
        // 父容器
        element: $('#loading .placeholder'),
        // logo URL 可自定义自己的加载 logo
        logoUrl: 'http://www.xingzhijiaoyu.net/pc/images/logo.png'
    });

    eventEmitter
        .on(
            eventEmitter.CLASSROOM_CONNECT_FAIL,
            function () {
                alert('网络已断开，请检查网络连接或者刷新页面重新进入房间');
            }
        )
        .on(
            eventEmitter.LOGIN_CONFLICT,
            function () {
                alert('你已被踢，请确认用户 number 是否唯一或者刷新页面重新进入房间');
            }
        )
        // 监听 loading 开始加载事件， one() 函数表示事件只处理一次，若需要一直监听请使用 on() 函数
        .one(
            eventEmitter.LOADING_PANEL_START,
            function (event, data) {
                // loading 开始加载时要做的事情
            }
        )
        // 监听 loading 结束加载事件
        .one(
            eventEmitter.LOADING_PANEL_END,
            function (event, data) {
                // loading 结束加载时要做的事情

                // 销毁 Loading 对象，可在此销毁进度条，若此时直播尚未开始，可以先进入倒计时等待页面，直到接收到事件 eventEmitter.VIEW_RENDER_TRIGGER
                //loading.destroy();
                $('#loading').remove();
                $('#main').css('opacity', 1);
            }
        )
        // 监听初始化事件
        .one(
            eventEmitter.VIEW_RENDER_TRIGGER,
            function (event, data) {
                // 公告添加手机空白
                // eventEmitter.trigger(
                //     eventEmitter.NOTICE_REQ,
                // );
              
                // 服务器已准备就绪，开始初始化业务界面，进入直播页面
                // 加载直播需要的各种组件，包括播放器，白板，用户列表等等
                // userList = BJY.UserList.create({
                //     element: $('#user-list .placeholder'),
                //     renderUser: function (user, width, height) {
                //         return {
                //             id: user.id,
                //             name: user.name,
                //             number: user.number,
                //             // 头像需压缩
                //             avatar: BJY.compressImage({
                //                 url: user.avatar,
                //                 width: width,
                //                 height: height
                //             }),
                //             avatar2x: BJY.compressImage({
                //                 url: user.avatar,
                //                 width: width * 2,
                //                 height: height * 2
                //             }),
                //             // 根据用户类型，配置角色的英文和本地语言
                //             role: userRoleMap[user.type].en,
                //             localRole: userRoleMap[user.type].cn
                //         }
                //     }
                // });
                // 创建消息列表
                messageList = BJY.MessageList.create({
                    element: $('#message-list .placeholder'),
                    renderEmoji: function (name, url) {
                        if (BJY.isAlicloudImage(url)) {
                            return '<img ondragstart="return false" src="'
                                + (url + '@100w_1e_1l.png')
                                + '" srcset="'
                                + (url + '@200w_1e_1l.png')
                                + ' 2x">';
                        }
                        return '<img ondragstart="return false" src="' + url + '">';
                    },
                    renderImage: function (url) {
                        if (BJY.isAlicloudImage(url)) {
                            return '<img ondragstart="return false" src="'
                                + (url + '@100w_1e_1l.png')
                                + '" srcset="'
                                + (url + '@200w_1e_1l.png')
                                + ' 2x">';
                        }
                        return '<img ondragstart="return false" src="' + url + '">';
                    },
                    renderUser: function (user, width, height) {
                        return {
                            id: user.id,
                            name: user.name,
                            number: user.number,
                            // 头像需压缩
                            avatar: BJY.compressImage({
                                url: user.avatar,
                                width: width,
                                height: height
                            }),
                            avatar2x: BJY.compressImage({
                                url: user.avatar,
                                width: width * 2,
                                height: height * 2
                            }),
                            // 根据用户类型，配置角色的英文和本地语言
                            role: userRoleMap[user.type].en,
                            localRole: userRoleMap[user.type].cn,
                        }
                    },
                    loadDistance: 0
                });
                // 创建消息发送组件
                messageSender = BJY.MessageSender.create({
                    element: $('#message-sender .placeholder'),
                    canSendEmoji: true,
                    multiline: true,
                    messageMaxLength: 140,
                    placeholder: '请输入...',
                    emotionList: {
                        emotionPerRow: 6,
                        rowPerPage: 4,
                    }
                });
                 BJY.whiteboard.init({
                    element: $('#whiteboard  .placeholder'),
                    fit: 1 // 1 自适应  2 撑满容器
                });
                mediaData.setSpeakerVolume(100);

                $('.bjy-message-sender textarea').focus(function () {
                    // $('.list-section').css('top', 0);
                    // $('.video').css('display', 'none');
                });
                $('.bjy-message-sender textarea').blur(function () {
                    // var width = $(window).width();
                    // $('.list-section').css('top', width * 0.55);
                    // $('.video').css('display', 'block');
                });
                barrage = new BJY.Barrage({
                    // 组件父容器
                    container: $('#barrage'),
                    // 移动速度，每秒移动多少个像素
                    speed: 100,
                    // 最长可显示多少个字，超过这个字数的会过滤
                    maxLength: 20,
                    // 在 top - bottom 的区间出现弹幕
                    top: 30,
                    bottom: 30,
                    // 轨道高度
                    trackHeight: 30,
                    // 是否只显示文本消息
                    textOnly: false,
                    // 如果需要自定义弹幕内容，可实现此方法
                    // renderContent: function (data) {
                    //     return '转换后的文字';
                    // }
                });
                openBarrage();
                // if (isIOS) {
                //     playButton.removeClass('hidden');
                //     playButton.on('click', function () {
                //         // 如果当前播放器正在播放，先关掉播放器
                //         if (teacherH5Player.videoOn || teacherH5Player.audioOn) {
                //             teacherH5Player.playAVClose();
                //         }
                //         // 播放视频
                //         teacherH5Player.playAV(
                //             store.get('teacher.videoOn')
                //         );
                //     });
                // }
            }
        )
        .on(
            eventEmitter.TEACHER_MEDIA_ON,
            function () {
                if (!teacherH5Player) {
                    teacherH5Player = new Player({
                        element: $('#h5-player'),
                        user: store.get('teacher'),
                        extension: html
                    });
                    $('#player-screen').hide();
                }
            }
        )
        .on(
            eventEmitter.PAGE_CHANGE_START,
            function (e, data) {
                var currentPage = pageData.getClientPage();
                var maxPage = pageData.getMaxPage();

                $('.total-page').text(maxPage);
                $('.current-page').text(currentPage);

                if (currentPage > 1) {
                    $('.icon-chevron-left').addClass('hasPage')
                        .removeAttr('disabled');
                }
                else {
                     $('.icon-chevron-left').removeClass('hasPage')
                        .attr('disabled', 'true');
                }

                if (currentPage < maxPage) {
                    $('.icon-chevron-right').addClass('hasPage')
                        .removeAttr('disabled');
                }
                else {
                     $('.icon-chevron-right').removeClass('hasPage')
                        .attr('disabled', 'true');
                }
            }
        )
        .on(
            eventEmitter.TEACHER_REMOVE,
            function () {
                if (teacherH5Player) {
                    teacherH5Player.dispose();
                    teacherH5Player = null;
                    $('#player-screen').show();
                }
            }
        )
        .on(
            // 正在加载视频事件
            eventEmitter.HTML_VIDEO_LOAD_START,
            function () {
                console.log('正在加载视频');
            }
        )
        .on(
            // 视频开始播放事件
            eventEmitter.HTML_VIDEO_PLAY,
            function () {
                console.log('视频开始播放');
                playButton.addClass('hidden');
            }
        )
        .on(
            // 视频暂停事件
            eventEmitter.HTML_VIDEO_PAUSE,
            function () {
                console.log('视频暂停');
                playButton.removeClass('hidden');
            }
        )
        .on(
            // 视频加载超时事件
            eventEmitter.HTML_VIDEO_LOAD_TIMEOUT,
            function () {
                console.log('视频加载超时');
                playButton.removeClass('hidden');
            }
        )
        .on(
            // 视频加载失败事件
            eventEmitter.HTML_VIDEO_LOAD_FAIL,
            function () {
                console.log('视频加载失败');
                playButton.removeClass('hidden');
            }
        )
        .on(
            // 正在加载音频事件
            eventEmitter.HTML_AUDIO_LOAD_START,
            function () {
                console.log('正在加载音频');
            }
        )
        .on(
            // 音频开始播放事件
            eventEmitter.HTML_AUDIO_PLAY,
            function () {
                console.log('音频开始播放');
                playButton.addClass('hidden');
            }
        )
        .on(
            // 音频暂停事件
            eventEmitter.HTML_AUDIO_PAUSE,
            function () {
                console.log('音频暂停');
                playButton.removeClass('hidden');
            }
        )
        .on(
            // 音频加载超时事件
            eventEmitter.HTML_AUDIO_LOAD_TIMEOUT,
            function () {
                console.log('音频加载超时');
                playButton.removeClass('hidden');
            }
        )
        .on(
            // 音频加载失败事件
            eventEmitter.HTML_AUDIO_LOAD_FAIL,
            function () {
                console.log('音频加载失败');
                playButton.removeClass('hidden');
            }
        )
        .one(
            eventEmitter.NOTICE_RES,
            function (event, data) {
                // data.content 公告内容
                // data.link 公告链接，可为空
                console.log(data.content+'公告内容')
                // $('.teacher_notice p').html(data.content);
                console.log(data.link+'公告链接，可为空')
            }
        )
        .on(
            eventEmitter.VIEW_RENDER_TRIGGER,
            function () {
                // 查询当前用户的状态
                eventEmitter.trigger(
                    eventEmitter.USER_STATE_REQ,
                    {
                        number: BJY.store.get('user.number')
                    }
                );
            }
        )
        .one(
            eventEmitter.USER_STATE_RES,
            function (event, data) {
                var forbidSendMessage = data.userState.forbidSendMessage;
                if (forbidSendMessage) {
                    // 如果 forbidSendMessage.duration > 0 表示被禁言 
                    // duration 单位为秒
                    // alert(forbidSendMessage);
                }
            }
        )
        .on(
            eventEmitter.MESSAGE_SEND_FORBID,
            function (event, data) {
                if (data.forbidSelf) {
                    var duration = data.duration;
                    // 根据 duration 判断是禁言还是解禁
                    // duration 单位是秒
                    // alert(duration)
                }
            }
        )
         ;
    
    // 初始化房间
    BJY.init({
        env: 'production',
        env: 'production',
             sign: '320796ed4e298bbd69c6667941f50f82',
            class: {
                id: '17111835067403',
                // 如果需要在后续用到教室相关的信息，可像这样写在下面
                // 如果不用，可省略
                name: '直播测试11-18',
                startTime: '1510934400',
                endTime: '1511017200'
            },
            // 当前进入教室的用户的信息
            // 如果是老师进教室，传老师的信息
            // 如果是学生进教室，传学生的信息
            // number 必须确保是唯一的，如果不唯一，后进的用户会踢掉先进的用户
            user: {
                number: '4094',
                avatar: 'http://test.aimeichuang.com/theme/default/wap/images/default.jpg',
                name: '嘿嘿',
                type: '0'
            }
    });
 
//  setIntervar(function(){
// $('.bjy-barrage').css({'color':'blue'});
//  },1000)
    // tab切换按钮事件
    $('#btn-user-list').on('click',function () {
        $('.tab-content').css('margin-left', -1 * $(window).width());
        $('#btn-user-list').addClass('tab-select');
        $('#btn-message-list').removeClass('tab-select');

    })
    $('#btn-message-list').on('click',function () {
        $('.tab-content').css('margin-left', '0');
        $('#btn-user-list').removeClass('tab-select');
        $('#btn-message-list').addClass('tab-select');
    });
    // 白板工具事件
    $('.icon-chevron-left').on('click', function () {
        eventEmitter.trigger(
                eventEmitter.PAGE_PREV_TRIGGER
            );
    });
    $('.icon-chevron-right').on('click', function () {
        eventEmitter.trigger(
                eventEmitter.PAGE_NEXT_TRIGGER
            );
    });

    $('#input-page').bind('keypress',function(event){
        if(event.keyCode == "13") {
            var page = parseInt($('#input-page').val());
            if (page < 1 || page > pageData.getMaxPage()||isNaN(page)) {
                alert('页码不在可用范围！');
                return ;
            }
            eventEmitter.trigger(
                eventEmitter.PAGE_CHANGE_TRIGGER,
                {
                    page: page
                }
            );
        }
    });
    $('#go').on('click',function(event){
        var page = parseInt($('#input-page').val());console.log(pageData.getMaxPage());
        if (page < 1 || page > pageData.getMaxPage()||isNaN(page)) {
            alert('页码不在可用范围！');
            return ;
        }else{
            eventEmitter.trigger(
                eventEmitter.PAGE_CHANGE_TRIGGER,
                {
                    page: page
                }
            );
        }
    });
    $('.notice_cls').on('click',function(){
        $('.teacher_notice').slideUp()
    });
    // var flag=0;
    // $('.paymse').on('click',function(){ 
    //     if(flag==0){
    //         // 打开弹幕
    //         openBarrage();
    //         flag=1;
    //         $(this).css({'background':"#14a4ed"});
    //        $(this).html("关闭弹幕");
    //     }else{
    //        barrage.close();
    //        flag=0; 
    //        $(this).css({'background':"#808080"});
    //        $(this).html("开启弹幕");
    //     }
    // });
    var sendMessage = function() {alert(1)
            // barrage.send(
            //     $('#barrage-input').val()
            // );
    }
    var openBarrage = function () {
        barrage.open();
        // $('.status').html('开').addClass('badge-success');
        // $('#btn-open').attr('disabled',"true");
        // $('#btn-close').removeAttr("disabled");
        // $('#btn-send').removeAttr("disabled");
    }

    var closeBarrage = function () {
        barrage.close();
        // $('.status').html('关').removeClass('badge-success');
        // $('#btn-close').attr('disabled',"true");
        // $('#btn-send').attr('disabled',"true");
        // $('#btn-open').removeAttr("disabled");
    }
         function _touch(){
              var startx;//让startx在touch事件函数里是全局性变量。
              var endx;
               var el=document.getElementById('whiteboard');
              function cons(){   //独立封装这个事件可以保证执行顺序，从而能够访问得到应该访问的数据。
                     // console.log(starty,endy);
                   //var l=Math.abs(startx-endx);
                  //var h=Math.abs(starty-endy);
                  //if(l>h){
                               //x事件
                           //if(startx>endx){
                                       //alert('left');
                                //}else{
                                        //alert('right');
                               //}
                     //}else{
                                //y事件
                           //if(starty>endy){
                                       //alert('top');
                         //}else{
                                        //alert('bottom');
                              //}
                     //}
                     if(startx>endx){  //判断左右移动程序
                            eventEmitter.trigger(
                                eventEmitter.PAGE_PREV_TRIGGER
                            );
                      }else{
                           eventEmitter.trigger(
                                eventEmitter.PAGE_NEXT_TRIGGER
                            );
                     }
               }
               el.addEventListener('touchstart',function(e){
                       var touch=e.changedTouches;
                     startx=touch[0].clientX;
                    starty=touch[0].clientY;
            });
             el.addEventListener('touchend',function(e){
                 var touch=e.changedTouches;
                     endx=touch[0].clientX;
                      endy=touch[0].clientY;
                      cons();  //startx endx 的数据收集应该放在touchend事件后执行，而不是放在touchstart事件里执行，这样才能访问到touchstart和touchend这2个事件产生的startx和endx数据。另外startx和endx在_touch事件函数里是全局性的，所以在此函数中都可以访问得到，所以只需要注意事件执行的先后顺序即可。
           });
     }
       _touch();

});
