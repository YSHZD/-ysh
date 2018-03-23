$(function () {
    var reg = new RegExp('(^|&)utm_source=([^&]*)(&|$)', 'i'),
		r = location.search.substr(1).match(reg),
		utm_source = r != null ? $.trim(unescape(r[2])) : null;
	
	switch(utm_source) {
		case 'Baidu_Search': 
		case 'baiduwangmeng':
			$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：连云港荣埔贸易有限公司</p>');
			break;
		case 'Baidu_Search_njuu':
			$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：南京信方达商贸有限公司</p>');
			break;
		case 'Baidu_Search_njtt':
			$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：南京花亦香贸易有限公司</p>');
			break;
		case 'sogou_gzco8':
			$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：广州市华柔商贸有限公司</p>');
			break;
		case 'Baidu_Search_hf_net88':
			$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：滁州东川工贸有限公司</p>');
			break;
		case 'Baidu_Search_hf_cn888':
			$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：滁州东川工贸有限公司</p>');
			break;
		case 'sogou_gzyap':
			$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：广州煌商商贸有限公司</p>');
			break;
		case 'sogou_jfss_gzco8':
			$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：广州市华柔商贸有限公司</p>');
			break;
		case 'sogou_gzszw':
			$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：广州华时轩商贸有限公司</p>');
			break;
		case 'HaoSo_yapan':
			$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：北京鹏坤宏达商贸有限公司</p>');
			break;
		case 'HaoSo_szwgledcn':
			$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：北京万顺弘礼商贸有限公司</p>');
			break;		
		case 'shenma_dawogua01':
			$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：广州大窝瓜电子商务有限公司</p>');
			break;	
		case 'shenma_dawogua02':
			$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：广州大窝瓜电子商务有限公司</p>');
			break;	
		case 'shenma_sousuo':
			$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：广州绿谷保健品有限公司</p>');
			break;	
		case 'shenma_sousuo_jc2':
			$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：广州绿谷保健品有限公司</p>');
			break;
		case 'HaoSo_JF_szwgledcn':
			$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：北京万顺弘礼商贸有限公司</p>');
			break;
		case 'Baidu_Search_czb55':
			$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：连云港荣埔贸易有限公司</p>');
			break;	
		case 'Baidu_Search_czb888':
			$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：连云港荣埔贸易有限公司</p>');
			break;	
		case 'Baidu_Seearch_JF_cz05':
			$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：连云港荣埔贸易有限公司</p>');
			break;	
		case 'Baidu_Search_cz07':
			$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：连云港荣埔贸易有限公司</p>');
			break;	
		case 'Baidu_Search_czb888':
			$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：连云港荣埔贸易有限公司</p>');
			break;	
		case 'Sogou_Search_JFHSB_DELVE1':
			$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：广州市名舜贸易有限公司</p>');
			break;	
		case 'Sogou_Search_JFHSB_DELVE2':
			$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：广州市驰派贸易有限公司</p>');
			break;	
		case 'Sogou_Search_JFHSB_deliskin':
			$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：广州市康沁浠贸易有限公司</p>');
			break;	
		case 'Baidu_Search_JFHSB_SYJDDCOM':
			$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：沈阳山合商贸有限公司</p>');
			break;	
		case 'Baidu_Search_JFHSB_SYZZCN':
			$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：沈阳山合商贸有限公司</p>');
			break;	
		case 'shenma_sft28':
			$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：商富通(天津)商贸有限公司</p>');
			break;
		case 'uc_esm01':
			$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：广州大窝瓜电子商务有限公司</p>');
			break;		
		case 'uc_esm02':
			$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：广州大窝瓜电子商务有限公司</p>');
			break;		
		case 'uc_esm03':
			$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：广州尊华生物科技有限公司</p>');
			break;				
		case 'xiaomi01':
			$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：广州奥蓓斯化妆品有限公司 粤ICP备15081742号 kefu@deliskin.cn</p>');
			break;					
		case 'Baidu_Search_JFHSB_SYMMNET':
			$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：沈阳山合商贸有限公司</p>');
			break;
		case 'Baidu_Search_QBHSB_hfcn888':
			$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：滁州东川工贸有限公司</p>');
			break;
		case 'Baidu_Search_QBHSB_hfnet88':
			$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：滁州东川工贸有限公司</p>');
			break;
		case 'SoGou_Search_JFHSB_gzdelve':
			$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：广东传奇医药科技有限公司</p>');
			break;	
		case 'Baidu_Search_wzcn':
		case 'Baidu_Search_wzcom':
		case 'Baidu_Search_mwznet':
		case 'Baidu_Search_mwzmcn':
		case 'Baidu_Search_wz_dainet':
		case 'Baidu_Search_wzmnet':
		case 'Baidu_Search_JFHSB_wzcom':
			$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：温州缔美纹绣形象设计有限公司</p>');
			break;	
		case 'sogou_delve3':
			$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：广州市丰益贸易有限公司</p>');
			break;	
		case 'sogou_cogiskin':
			$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：广州格迪奇贸易有限公司</p>');
			break;				
		default:
			if(location.href.indexOf('szwgled.cn') > -1)
				$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：南京信方达商贸有限公司</p>');
			else if(location.href.indexOf('article.yapanskin.com') > -1 || location.href.indexOf('dawl.yapanskin.net') >-1 )
				$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：温州缔美纹绣形象设计有限公司</p>');
			else if(location.href.indexOf('hfff.cogiskin.com') > -1 )
				$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：连云港荣埔贸易有限公司</p>');
			else if(location.href.indexOf('hfff.yapanskin.net') > -1)
				$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：连云港荣埔贸易有限公司</p>');
			else if(location.href.indexOf('dfew.cogiskin.cn') > -1 )
				$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：连云港荣埔贸易有限公司</p>');
			else if(location.href.indexOf('article.deliskin.cn') > -1 ){
				$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：广州大窝瓜电子商务有限公司</p>');			
				$('.company').text('版权所有：广州大窝瓜电子商务有限公司');
			}
			else if(location.href.indexOf('haoso.ybl2008.cn') > -1)
				$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：广州市钜轩贸易有限公司</p>');
       		<!--else if(location.href.indexOf('bd.delvel.net') > -1) -->	
				<!--$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：北京上丰嘉禾商贸有限公司</p>');	-->		
			else if(location.href.indexOf('haoso.shxxjj.com.cn') > -1 )
				$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：北京奥博兴翔商贸有限公司</p>');
			else if(location.href.indexOf('haoso.eyzrzx.cn') > -1 )
				$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：北京东升嘉业商贸有限公司</p>');
			else if(location.href.indexOf('efes.cogiskin.cn') > -1)
				$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：连云港荣埔贸易有限公司</p>');
			<!--else if(location.href.indexOf('bd.delvel.cn') > -1)  -->
			<!--	$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：广东传奇医院科技有限公司</p>');		-->
			else if(location.href.indexOf('m.joinus28.com') > -1)
				$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：商富通(天津)商贸有限公司</p>');		
			else if(location.href.indexOf('sm.friend-v.com') > -1)
				$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：商富通(天津)商贸有限公司</p>');		
			else if(location.href.indexOf('sm.application-r.com') > -1)
				$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：商富通(天津)商贸有限公司</p>');	
			else if(location.href.indexOf('sm.application-s.com') > -1)
				$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：商富通(天津)商贸有限公司</p>');		
			else if(location.href.indexOf('sm.application-x.com') > -1)
				$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：商富通(天津)商贸有限公司</p>');	
			else if(location.href.indexOf('sm.application-y.com') > -1)
				$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：商富通(天津)商贸有限公司</p>');	
			else if(location.href.indexOf('sm.application-z.com') > -1)
				$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：商富通(天津)商贸有限公司</p>');	
			else if(location.href.indexOf('bd.liyongqiang.net') > -1)
				$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：宁波海曙迪创商贸有限公司</p>');					
			else if(location.href.indexOf('uca.deliskin.cn') > -1)
				$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：广州大窝瓜电子商务有限公司</p>');	
			else if(location.href.indexOf('ucb.delvel.net') > -1)
				$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：广州大窝瓜电子商务有限公司</p>');	
			else if(location.href.indexOf('jf.game-yy.com') > -1)
				$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：北京蓝域思创网络科技有限公司</p>');	
			else if(location.href.indexOf('jf.game-uu.com') > -1)
				$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：北京蓝域思创网络科技有限公司</p>');	
			else if(location.href.indexOf('ucc.deliskin.cn') > -1)
				$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：广州欧丽莱化妆品有限公司</p>');			
			else if(location.href.indexOf('wpk.bgrcml.com') > -1)
				$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：青岛银佳汇通商品经营有限公司</p>');	
			else if(location.href.indexOf('wpk.fhrtre.com') > -1)
				$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：青岛银佳汇通商品经营有限公司</p>');	
			else if(location.href.indexOf('article.weipankong.cn') > -1)
				$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：广州市简方网络科技有限公司</p>');	
			else if(location.href.indexOf('www.chinafreak.cn') > -1)
				$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：广州可可投资咨询有限公司</p>');					
			else if(location.href.indexOf('bd.ziling10.com') > -1)
				$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：北京紫翎科技有限公司</p>');	
			else if(location.href.indexOf('sm.join376.com') > -1)
				$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：融商达(天津)商贸有限公司</p>');	
			else if(location.href.indexOf('sm.join382.com') > -1)
				$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：融商达(天津)商贸有限公司</p>');	
			else if(location.href.indexOf('sm.join378.com') > -1)
				$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：融商达(天津)商贸有限公司</p>');	
			else if(location.href.indexOf('sm.bgepx.com') > -1)
				$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：融商达(天津)商贸有限公司</p>');	
			else if(location.href.indexOf('sm.gtezs.com') > -1)
				$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：融商达(天津)商贸有限公司</p>');	
			else if(location.href.indexOf('bdwap.ilifeb.com') > -1)
				$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：广州乐芙信息科技有限公司</p>');	
			else if(location.href.indexOf('newh.reinezx.com') > -1)
				$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：东莞南城瑞芙臣医疗美容门诊部有限公司</p>');
			else if(location.href.indexOf('sm.travel5432.cn') > -1)
				$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有： 五常市上善贸易商行</p>');
			else if(location.href.indexOf('sm.zwaedu.com') > -1)
				$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：北京思创辉煌教育咨询有限公司</p>');	
			else if(location.href.indexOf('sm.hdcww.com') > -1)
				$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：北京马和源展览有限公司</p>');	
			else if(location.href.indexOf('wan.delvelskin.net') > -1)
				$('footer').children("center:last-child").empty().append('<span style="font-size: 12px; color: rgb(204, 204, 204);">版权所有: 山西布工坊工艺品制造有限公司</span>');
			else if(location.href.indexOf('sc.years8.cn') > -1)
				$('footer').children("center:last-child").empty().append('<span style="font-size: 12px; color: rgb(204, 204, 204);">版权所有: 北京君友兴隆商贸中心</span>');
			else if(location.href.indexOf('sc.ytw188.net.cn') > -1)
				$('footer').children("center:last-child").empty().append('<span style="font-size: 12px; color: rgb(204, 204, 204);">版权所有: 深圳市百纳辉煌投资管理有限公司</span>');	
			else if(location.href.indexOf('sc1.ytw188.net.cn') > -1)
				$('footer').children("center:last-child").empty().append('<span style="font-size: 12px; color: rgb(204, 204, 204);">版权所有: 深圳市百纳辉煌投资管理有限公司</span>');	
			else if(location.href.indexOf('fp.simplern.net') > -1)
				$('footer').children("center:last-child").empty().append('<span style="font-size: 12px; color: rgb(204, 204, 204);">版权所有: 深圳市领先时代投资管理有限公司 粤ICP备17008576号-1<br>地址：深圳市福田区深中路北方大厦1108室</span>');		
			else if(location.href.indexOf('ydzxd.delvelskin.net') > -1)
				$('footer').children("center:last-child").empty().append('<span style="font-size: 12px; color: rgb(204, 204, 204);">版权所有: 厦门物通博联网络科技有限公司</span>');	
			else if(location.href.indexOf('tuib.delvelskin.net') > -1)
				$('footer').children("center:last-child").empty().append('<span style="font-size: 12px; color: rgb(204, 204, 204);">版权所有: 深圳市庄兴珠宝贸易有限公司</span>');					
			else if(location.href.indexOf('laoxiangapp.cn') > -1)
				$('footer').children("center:last-child").empty().append('<span style="font-size: 12px; color: rgb(204, 204, 204);">版权所有: 杭州青蜂网络科技有限公司</span>');	
			else if(location.href.indexOf('wana.delvelskin.net') > -1)
				$('footer').children("center:last-child").empty().append('<span style="font-size: 12px; color: rgb(204, 204, 204);">版权所有: 深圳市天马工艺品有限公司</span>');	
			else if(location.href.indexOf('wanb.delvelskin.net') > -1)
				$('footer').children("center:last-child").empty().append('<span style="font-size: 12px; color: rgb(204, 204, 204);">版权所有: 上海工美艺术品交易中心有限公司</span>');	
			else if(location.href.indexOf('wanc.delvelskin.net') > -1)
				$('footer').children("center:last-child").empty().append('<span style="font-size: 12px; color: rgb(204, 204, 204);">版权所有: 广州红蜓公社艺术品有限公司</span>');
			else if(location.href.indexOf('wan.delveil.com') > -1)
				$('footer').children("center:last-child").empty().append('<span style="font-size: 12px; color: rgb(204, 204, 204);">版权所有: 广州大窝瓜电子商务有限公司</span>');				
			else if(location.href.indexOf('wanx.delvelskin.net') > -1)
				$('footer').children("center:last-child").empty().append('<span style="font-size: 12px; color: rgb(204, 204, 204);">版权所有: 深圳卡斯妮珠宝有限公司</span>');
			else if(location.href.indexOf('wanx.delvelskin.cn') > -1 || location.href.indexOf('zhihuituiwc') > -1)
				$('footer').children("center:last-child").empty().append('<span style="font-size: 12px; color: rgb(204, 204, 204);">版权所有: 广州市银缘首饰有限公司</span>');					
			else if(location.href.indexOf('article.chnxinge.cn') > -1)
				$('#case').append('<div class="depart"></div><div class="case_main mt1"><p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; padding-bottom:30px; color: #333; text-align: center;">版权所有：中国医药保健品进出口商会 <br/>电话：010-67758424<br>地址：北京朝阳区潘家园南里12号8层</p></div>');	
			else if(location.href.indexOf('www.haoseo.net') > -1)
				$('#case').append('<div class="depart"></div><div class="case_main mt1"><p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; padding-bottom:30px; color: #333; text-align: center;">版权所有：中国医药保健品进出口商会 <br/>电话：010-67758424<br>地址：北京朝阳区潘家园南里12号8层</p></div>');					
			else if(location.href.indexOf('www.shiyewan.com') > -1)
				$('#case').append('<div class="depart"></div><div class="case_main mt1"><p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; padding-bottom:30px; color: #333; text-align: center;">版权所有：中国医药保健品进出口商会 <br/>电话：010-67758424<br>地址：北京朝阳区潘家园南里12号8层</p></div>');
			else if(location.href.indexOf('www.jiepaing.com') > -1)
				$('#case').append('<div class="depart"></div><div class="case_main mt1"><p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; padding-bottom:30px; color: #333; text-align: center;">版权所有：中国医药保健品进出口商会 <br/>电话：010-67758424<br>地址：北京朝阳区潘家园南里12号8层</p></div>');				
			else if(location.href.indexOf('newb.reinezx.com') > -1)
				$('body').after('<p id="sh-copy-right" style="margin: 10px 0; font-size: 16px; color: #333; text-align: center;">版权所有：东莞南城瑞芙臣医疗美容门诊部有限公司</p>');
			else if(location.href.indexOf('bdly.deliskin.cn') > -1)
				$('#case').append('<div class="depart"></div><div align="center" style="color:#666;font-size:0.5em; padding-top:20px"> 广东尚孕兰多化妆品有限公司 电话：400-602-3192<br>地址：广州市天河区中山大道中130号4B45A<br>ICP备案 ： 浙ICP备10047821号-2 <br><a href="about.html">关于我们</a><a href="contact.html">联系我们</a></div>');
			else if(location.href.indexOf('ydzxa.delvelskin.net') > -1)
				$('#case').append('<div class="depart"></div><div align="center" style="color:#666;font-size:0.5em; padding-top:20px"> 广东尚孕兰多化妆品有限公司 电话：400-602-3192<br>地址：广州市天河区中山大道中130号4B45A<br>ICP备案 ： 浙ICP备10047821号-2 <br><a href="about.html">关于我们</a><a href="contact.html">联系我们</a></div>');
			else if(location.href.indexOf('ydzxb.delvelskin.cn') > -1)
				$('#scroller').append('<div align="center" style="color:#666;font-size:14px; padding-bottom:90px; line-height: 20px; background-color:#fff"> 广东尚孕兰多化妆品有限公司 <br/>电话：400-602-3192<br>地址：广州市天河区中山大道中130号4B45A<br>ICP备案 ： 浙ICP备10047821号-2 <br><a href="about.html">关于我们</a><a href="contact.html">联系我们</a></div>');
			else if(location.href.indexOf('ydzxc.delvelskin.com') > -1)
				$('#case').append('<div class="depart"></div><div align="center" style="color:#666;font-size:0.5em; padding-top:20px"> 广东昊盛商业有限公司 电话：0752-88896157<br>地址：惠州市河南岸30号小区广厦新苑12楼二层01号<br><a href="about.html">关于我们</a><a href="contact.html">联系我们</a></div>');
			else if(location.href.indexOf('sogou.shiyewan.com') > -1)
				$('#case').append('<div class="depart"></div><div class="case_main mt1"><p id="sh-copy-right" style="margin: 10px 0; padding-bottom:30px; font-size: 16px; color: #333; text-align: center;">版权所有：北京润泽民生商贸有限公司 <br/>电话：010-67758424<br>地址：北京朝阳区潘家园南里12号8层</p></div>');
			else if(location.href.indexOf('sogou.haoseo.net') > -1)
				$('#case').append('<div class="depart"></div><div class="case_main mt1"><p id="sh-copy-right" style="margin: 10px 0; padding-bottom:30px; font-size: 16px; color: #333; text-align: center;">版权所有：北京润泽民生商贸有限公司 <br/>电话：010-67758424<br>地址：北京朝阳区潘家园南里12号8层</p></div>');
		    else if(location.href.indexOf('newb.wtt998.com') > -1)
				$('#case').append('<div class="depart"></div><div class="case_main mt1"><p id="sh-copy-right" style="margin: 10px 0; padding-bottom:30px; font-size: 16px; color: #333; text-align: center;">版权所有:广州万兔斯瑞广告有限公司 <br/>地址：广州市天河区中山大道中1097号</p></div>');
			else if(location.href.indexOf('sjlc.delvelskin.cn') > -1)
				$('footer').children("center:last-child").empty().append('<span style="font-size: 12px; color: rgb(101, 99, 99);">版权所有: 青岛世纪联诚网络科技有限公司</span>');					
			else if(location.href.indexOf('jpns.delvelskin.cn') > -1)
				$('footer').children("center:last-child").empty().append('<span style="font-size: 12px; color: rgb(101, 99, 99);">版权所有: 北京佳品农商贸有限公司</span>');
			else if(location.href.indexOf('cbdz.delvelskin.cn') > -1)
				$('footer').children("center:last-child").empty().append('<span style="font-size: 12px; color: rgb(101, 99, 99);">版权所有: 北京柴棒电子商务有限公司</span>');
			else if(location.href.indexOf('yiyan.delvelskin.cn') > -1)
				$('footer').children("center:last-child").empty().append('<span style="font-size: 12px; color: rgb(101, 99, 99);">公司名称: 北京艺宴广告有限公司</span>');
			else if(location.href.indexOf('dwg.delvelskin.cn') > -1)
				$('footer').children("center:last-child").empty().append('<span style="font-size: 12px; color: rgb(101, 99, 99);">版权所有: 广州大窝瓜电子商务有限公司</span>');

			break;
	}
});	



//sm.join376.com




