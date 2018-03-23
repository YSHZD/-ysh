alert(1);
function layout () {

    // var all = $(window).height();

    // if (all < 646) {
    //     all = 646;
    // }

    // var height = all - 46 - 44;
    // $('#list-box').css('height', height);
    // $('#user-list').css('height', height);
    // $('#message-list').css('height', height - 100);

    // $('#flash-player').css('height', (all - 46) / 2);
    // $('#flash-player-user').css('height', (all - 46) / 2);
    // $('object').css('height', (all - 46) / 2);

    // $('.picture').css('margin-top', ((all - 40) / 2 - 100) / 2 );

    // $('.left').css('height', 300);
    // var width = $(document).width();
    // $('.left').css('width', '100%');


    // $('#whiteboard').css('width', '100%');
    // $('#whiteboard').css('height', 200);
    // $('#barrage').css('width', '100%');

    // var boardHeight = parseInt($('.bjy-container canvas').css('height'));
    // $('#barrage').css('height', boardHeight);
    // $('#barrage').css('top', 60 + (all - 44 - 120 - boardHeight) / 2);
    // $('.right').css('margin-bottom', '50px');

}
var query = BJY.query;

// 给自己的用户类型设置中英文术语
var userRoleMap = { };
var config = BJY.config;
var pageData = BJY.data.page;
var mediaData = BJY.data.media;
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
    // 初始化房间
    BJY.init({
        env: 'production',
        sign: '060fab404d96ed63cfaa86938bd73486',
            class: {
                id: '17111697933954',
                // 如果需要在后续用到教室相关的信息，可像这样写在下面
                // 如果不用，可省略
                name: '前端测试11-16',
                startTime: '1510761600',
                endTime: '1510844400'
            },
        // 当前进入教室的用户的信息
        // 如果是老师进教室，传老师的信息
        // 如果是学生进教室，传学生的信息
        // number 必须确保是唯一的，如果不唯一，后进的用户会踢掉先进的用户
        user: {
            number: '955',
            avatar: 'http://test.aimeichuang.com/theme/default/wap/images/default.jpg',
            name: '大鹏好啊',
            type: '0'
        }

    });
// 文档加载完成后
$(document).ready(function () {
    // 组件
    var barrage;
    var userList;
    var messageList;
    var messageSender;

var eventEmitter = BJY.eventEmitter;
   // store 存储着系统的权限信息
var store = BJY.store;
// 获取创建播放器的 Player 对象
var Player = BJY.Player;
var teacherH5Player;
var  html = Player.html;
var playButton = $('#btn-play');
html.showControls = true;
    html.init();
    var teacherH5Player;
    var playButton = $('#play');
// 给播放按钮设置点击回调（用于手机端）
playButton.on('click', function () {
    // 如果当前播放器正在播放，先关掉播放器
    if (teacherH5Player.videoOn || teacherH5Player.audioOn) {
        teacherH5Player.playAVClose();
    }
    // 播放视频
    teacherH5Player.playAV(
        store.get('teacher.videoOn')
    );
});

// 初始化 H5 播放器扩展
Player.html.init();

// 监听 H5 播放器相关事件
eventEmitter
    .on(
        // 老师打开媒体事件
        eventEmitter.TEACHER_MEDIA_ON,
        function () {
            // 判断播放器是否存在
            if (!teacherH5Player) {
                // 若不存在，创建一个 H5 播放器组件
                teacherH5Player = new Player({
                    // 组件的父容器
                    element: $('#h5-player'),
                    // 音视频发布用户（一般为老师）
                    user: store.get('teacher'),
                    // 播放器扩展（实现与底层播放相关的接口 可直接使用百家云实现 H5 扩展 Player.html。）
                    extension: Player.html
                });
                playButton.removeClass('hidden');
            }
        }
    )
    .on(
        // 老师加入房间事件
        eventEmitter.TEACHER_ADD,
        function () {
            console.log('老师进入教室');
        }
    )
    .on(
        // 老师离开房间事件
        eventEmitter.TEACHER_REMOVE,
        function () {
            console.log('老师离开教室');
            if (teacherH5Player) {
                // 销毁 H5 播放器组件
                teacherH5Player.dispose();
                // 将对 H5 组件对象置空
                teacherH5Player = null;
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
    );

// 监听 H5 播放器相关事件
eventEmitter
    .on(
        // 老师打开媒体事件
        eventEmitter.TEACHER_MEDIA_ON,
        function () {
            // 判断播放器是否存在
            if (!teacherH5Player) {
                // 若不存在，创建一个 H5 播放器组件
                teacherH5Player = new Player({
                    // 组件的父容器
                    element: $('#h5-player'),
                    // 音视频发布用户（一般为老师）
                    user: store.get('teacher'),
                    // 播放器扩展（实现与底层播放相关的接口 可直接使用百家云实现 H5 扩展 Player.html。）
                    extension: Player.html
                });
                playButton.removeClass('hidden');
            }
        }
    )
    .on(
    eventEmitter.USER_COUNT_CHANGE,
    function (event, data) {
        console.log('当前教室人数'+data.userCount);
    }
)
    .on(
        // 老师加入房间事件
        eventEmitter.TEACHER_ADD,
        function () {
            console.log('老师进入教室');
        }
    )
    .on(
        eventEmitter.TOTAL_USER_COUNT_CHANGE,
        function (event, data) {
            console.log('进教室总人数（包括退出教室的）'+data.totalUserCount);
        }
    )
    .on(
        // 老师离开房间事件
        eventEmitter.TEACHER_REMOVE,
        function () {
            console.log('老师离开教室');
            if (teacherH5Player) {
                // 销毁 H5 播放器组件
                teacherH5Player.dispose();
                // 将对 H5 组件对象置空
                teacherH5Player = null;
            }
        }
    );

    var userPlayer;

    var loading = BJY.Loading.create({
        // 父容器
        element: $('#loading .placeholder'),
        // logo URL 可自定义自己的加载 logo
        logoUrl: 'https://imgs.genshuixue.com/37797098_qsl3oz5g.jpg'
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
                // 服务器已准备就绪，开始初始化业务界面，进入直播页面
                BJY.userStatus.watch(
                    BJY.store.get('user.number'),
                    '.screenStatus',
                    {
                        onMediaClosed: function () {
                            $('#player-screen-user').show();
                        }
                    }
                );
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
                barrage = new BJY.Barrage({
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
                    renderContent: function (data) {
                        return data.content;
                    }
                });
                openBarrage();
                // 创建设置按钮
                // var speakerMenu = BJY.SpeakerMenu.create({
                //     element: $('#menu-speaker'),
                //     canAdjustVolume: true,
                //     maxVolume: 100
                // });
                // var micMenu = BJY.MicMenu.create({
                //     element: $('#menu-mic'),
                //     maxVolume: 100
                // });
                // var cameraMenu = BJY.CameraMenu.create({
                //     element: $('#menu-camera'),
                // });
                // BJY.userSpeak.init();
                // if (!store.get('class.isFree')) {
                //     var speakApplyMenu = BJY.SpeakApplyMenu.create({
                //         element: $('#menu-speak-apply')
                //     });
                // }
                // 文档白板
                BJY.whiteboard.init({
                    element: $('#whiteboard  .placeholder'),
                    fit: 1 // 1 自适应  2 撑满容器
                });

                layout();

            }
        )
        .one(
            eventEmitter.NOTICE_RES,
            function (event, data) {
                // data.content 公告内容
                // data.link 公告链接，可为空
                console.log('公告内容'+data.content);
                console.log('公告链接'+data.link);
            }
        )
        .one(
            eventEmitter.VIEW_RENDER_TRIGGER,
            function (event, data) {
                eventEmitter.trigger(
                    eventEmitter.NOTICE_REQ,
                );
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
                    console.log('被禁言');
                }
            }
        )
        .on(
            eventEmitter.CAMERA_MENU_CLICK,
            function () {
                var videoOn = BJY.store.get('user.videoOn');
                if (BJY.userPublish.setDevice(userPlayer, !videoOn) === true) {
                    $('#player-screen-user').hide();
                }
            }
        )
        .on(
            eventEmitter.MIC_MENU_CLICK,
            function () {
                var audioOn = BJY.store.get('user.audioOn');
                if (BJY.userPublish.setDevice(userPlayer, null, !audioOn) === true) {
                    $('#player-screen-user').hide();
                }
            }
        )
        .on(
            eventEmitter.DETECT_TOOL_SHOW_TRIGGER,
            function () {

            }
        )
        .on(
            eventEmitter.SPEAK_APPLY_CLICK,
            function () {
                BJY.userSpeak.startApply(10 * 1000);
            }
        )
        .on(
            eventEmitter.SPEAK_APPLY_CANCEL_CLICK,
            function () {
                BJY.userSpeak.cancelApply();
            }
        )
        .on(
            eventEmitter.SPEAK_END_CLICK,
            function () {
                BJY.userSpeak.stopSpeak(BJY.store.get('user.id'));
            }
        )
        .on(
            eventEmitter.MEDIA_SWITCH_TRIGGER,
            function (e, data) {
                if (BJY.userPublish.setDevice(userPlayer, data.videoOn, data.audioOn)) {
                    $('#player-screen-user').hide();
                }
            }
        )
        .on(
            // Window resize 事件
            eventEmitter.WINDOW_RESIZE,
            function () {
                layout();
            }
        )
        .on(
            eventEmitter.WHITEBOARD_LAYOUT_CHANGE,
            function (e, data) {
                // 重新设置白板的高度并让其居中
                console.log(data);
                layout();
            }
        )
        .on(
            eventEmitter.CLIENT_PAGE_CHANGE,
            function () {
                console.log('客户端翻页');
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
        );

    var statusElement = $('.status');

    function sendMessage() {
        barrage.send(
            $('#barrage-input').val()
        );
    }

    var btnOpen = $('#btn-open');
    var btnClose = $('#btn-close');
    var btnSend = $('#btn-send');

    function openBarrage() {
        barrage.open();
        statusElement.html('开').addClass('badge-success');
        btnOpen.attr('disabled', 'true');
        btnClose.removeAttr('disabled');
        btnSend.removeAttr('disabled');
    }

    function closeBarrage() {
        barrage.close();
        statusElement.html('关').removeClass('badge-success');
        btnClose.attr('disabled','true');
        btnSend.attr('disabled','true');
        btnOpen.removeAttr('disabled');
    }


    // tab切换按钮事件
    $('#btn-user-list').on('click',function () {
        $('.tab-content').css('margin-left', '-300px');
        $('#btn-user-list').addClass('tab-select');
        $('#btn-message-list').removeClass('tab-select');

    })
    $('#btn-message-list').on('click',function () {
        $('.tab-content').css('margin-left', '0');
        $('#btn-user-list').removeClass('tab-select');
        $('#btn-message-list').addClass('tab-select');
    })

    // 弹幕按钮事件
    btnSend.on('click', function () {
        sendMessage();
    });
    btnOpen.on('click', function () {
        openBarrage();
    });
    btnClose.on('click', function () {
        closeBarrage();
    })

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
})
