var imgs = {
	play: './assets/images/play.png',
	

	logo: './assets/images/logo.png',

	arrow: './assets/images/arrow.png',
	img1:'./assets/images/1-1.jpg',
	img2:'./assets/images/2-1.jpg',
	img3:'./assets/images/3-1.jpg',
	img4:'./assets/images/4-1.jpg',
	img5:'./assets/images/5-1.jpg',
	img6:'./assets/images/6-1.jpg',
	img7:'./assets/images/7-1.jpg',
	img8:'./assets/images/8-1.jpg',
	img9:'./assets/images/9-1.jpg',
	img10:'./assets/images/10-1.jpg',
	img11:'./assets/images/11-1.jpg',
	img12:'./assets/images/12-1.jpg',
	img13:'./assets/images/13-1.jpg',
	img14:'./assets/images/14-1.jpg',
	img15:'./assets/images/15-1.jpg',
	img16:'./assets/images/16.jpg',


	cloud:'./assets/images/cloud.jpg',
	shareBg:'./assets/images/share-bg.jpg',
	shareimgBg:'./assets/images/share-img-bg.png',
	textBg:'./assets/images/text-bg.png',

	xiongan:'./assets/images/xiongan.png',
	photo:'./assets/images/photo.png',
	scan:'./assets/images/scan.png',
	upload:'./assets/images/upload.png',
	year:'./assets/images/year.png',
	//close:'./assets/images/close.png',
	shiji:'./assets/images/shiji.png',
	title:'./assets/images/title2.png',
	title1:'./assets/images/title1.png',
	qrcode:'./assets/images/qrcode.png',
	liulian:'./assets/images/liulian.png',
	kf_cloud_00000:'./assets/images/kf_cloud_00000.jpg',
	kf_cloud_00001:'./assets/images/kf_cloud_00001.jpg',
	kf_cloud_00002:'./assets/images/kf_cloud_00002.jpg',
	kf_cloud_00003:'./assets/images/kf_cloud_00003.jpg',
	kf_cloud_00004:'./assets/images/kf_cloud_00004.jpg',
	kf_cloud_00005:'./assets/images/kf_cloud_00005.jpg',
	kf_cloud_00006:'./assets/images/kf_cloud_00006.jpg',
	kf_cloud_00007:'./assets/images/kf_cloud_00007.jpg',
	kf_cloud_00008:'./assets/images/kf_cloud_00008.jpg',
	kf_cloud_00009:'./assets/images/kf_cloud_00009.jpg',
	kf_cloud_000010:'./assets/images/kf_cloud_00010.jpg',
	kf_cloud_000011:'./assets/images/kf_cloud_00011.jpg',
	kf_cloud_000012:'./assets/images/kf_cloud_00012.jpg',


  
}


var arr = [];
for (var attr in imgs) {
	arr.push(imgs[attr]);
}

var xionganDesc ='';// '雄安新区雄安新区（Xiongan New Area）[1]  位于中国河北省保定市境内，地处北京、天津、保定腹地，规划范围涵盖河北省雄县、容城、安新。 '

var mainImgList = [
	{
		url:imgs.img1,
		type:'rect'
	},{
		url:imgs.img2,
		type:'circle'
	},{
		url:imgs.img3,
		type:'circle'
	}
];
mainImgList = [
		
	[
		{
			url:imgs.img1,
			text:'张高丽在京津冀协同发展工作推进会议上强调，深化完善规划，加快改革开放，保持历史耐心，把河北雄安新区建成高质量发展的全国样板。',
			date:'2018年2月25日',
			zIndex:100,
		}
	],[
		{
			url:imgs.img2,
			text:'河北省委书记王东峰在河北省深入推进雄安新区规划建设暨京津冀协同发展工作会议上强调，奋力开创雄安新区规划建设和京津冀协同发展新局面。',
			date:'2018年2月23日',
			zIndex:99,
		}
	],[
		{
			url:imgs.img3,
			text:'中共中央政治局常务委员会2月22日召开会议，听取河北雄安新区规划编制情况的汇报。中共中央总书记习近平主持会议并发表重要讲话。',
			date:'2018年2月22日',
			zIndex:98,
		}
	],[
		{
			url:imgs.img4,
			text:'河北省委书记王东峰在河北两会期间强调，深入推进京津冀协同发展和雄安新区规划建设。',
			date:'2018年1月27日',
			zIndex:98,
		}
	],[
		{
			url:imgs.img5,
			text:'1月3日上午，河北省委召开常委会扩大会议，原则通过《关于推进雄安新区规划建设的实施意见》。',
			date:'2018年1月3日',
			zIndex:98,
		}
	],[
		{
			url:imgs.img6,
			text:'京津冀协同发展推进会议讨论审议河北雄安新区规划框架等有关文件。',
			date:'2018年1月2日',
			zIndex:98,
		}
	],[
		{
			url:imgs.img7,
			text:'中央经济工作会议指出，高起点、高质量编制好雄安新区规划。',
			date:'2017年12月18日',
			zIndex:98,
		}
	],[
		{
			url:imgs.img8,
			text:'中共河北雄安新区工委党校成立。',
			date:'2017年11月12日',
			zIndex:98,
		}
	],[
		{
			url:imgs.img9,
			text:'习近平在亚太经合组织工商领导人峰会上发表主旨演讲时，再次提到建设雄安新区。',
			date:'2017年11月10日',
			zIndex:98,
		}
	],[
		{
			url:imgs.img10,
			text:'首家总部型金融机构落户雄安新区。',
			date:'2017年10月',
			zIndex:98,
		}
	],[
		{
			url:imgs.img11,
			text:'习近平在十九大报告中指出，以疏解北京非首都功能为“牛鼻子”推动京津冀协同发展，高起点规划、高标准建设雄安新区。',
			date:'2017年10月18日',
			zIndex:98,
		}
	],[
		{
			url:imgs.img12,
			text:'河北雄安新区管委会发布消息，48家企业获批入驻雄安新区。',
			date:'2017年9月28日',
			zIndex:98,
		}
	],[
		{
			url:imgs.img13,
			text:'中国雄安建设投资集团有限公司成立。',
			date:'2017年7月18日',
			zIndex:98,
		}
	],[
		{
			url:imgs.img14,
			text:'中共河北雄安新区工作委员会、河北雄安新区管理委员会获批设立。',
			date:'2017年6月',
			zIndex:98,
		}
	],[
		{
			url:imgs.img15,
			text:'雄安新区发布“新区启动区城市设计国际咨询建议书征询”公告。',
			date:'2017年6月26日',
			zIndex:98,
		}
	],[
		{
			url:imgs.img16,
			text:'中共中央国务院决定设立河北雄安新区消息发布。',
			date:'2017年4月1日',
			zIndex:98,
		}
	]

];

var musics = {
	music: {
		src: './assets/music/bg.mp3',
		autoplay: false,
		name: 'bg',
		loop: true
	},
	photo:{
		src:'./assets/music/photo.mp3',
		autoplay:false,
		name:"photo",
		loop:false
	}
}