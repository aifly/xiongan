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
	///img16:'./assets/images/16.jpg',


	cloud:'./assets/images/cloud.jpg',
	shareBg:'./assets/images/share-bg1.jpg',
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
			text:'京雄城际铁路开工建设，可实现30分钟从北京城区到达雄安新区。',
			date:'2018年2月28日',
			zIndex:100,
		}
	],[
		{
			url:imgs.img2,
			text:'习近平主持政治局常委会听取河北雄安新区规划编制汇报。',
			date:'2018年2月22日',
			zIndex:99,
		}
	],[
		{
			url:imgs.img3,
			text:'中国银行与中国雄安建设投资集团有限公司、英国金丝雀码头集团共同签署《关于雄安新区金融科技城项目战略合作协议》。',
			date:'2018年1月31日',
			zIndex:98,
		}
	],[
		{
			url:imgs.img4,
			text:'河北省委召开常委会扩大会议，原则通过《关于推进雄安新区规划建设的实施意见》。',
			date:'2018年1月3日',
			zIndex:98,
		}
	],[
		{
			url:imgs.img5,
			text:'中央经济工作会议指出，高起点、高质量编制好雄安新区规划。',
			date:'2017年12月18日',
			zIndex:98,
		}
	],[
		{
			url:imgs.img6,
			text:'雄安“第一标”雄安市民服务中心动工，建成后将承担政务服务、规划展示、会议举办、企业办公等多项功能。',
			date:'2017年12月7日',
			zIndex:98,
		}
	],[
		{
			url:imgs.img7,
			text:'雄安新区“千年秀林”工程栽下第一棵树。',
			date:'2017年11月13日',
			zIndex:98,
		}
	],[
		{
			url:imgs.img8,
			text:'“雄安新区”写进十九大报告。习近平在报告中指出，以疏解北京非首都功能为“牛鼻子”推动京津冀协同发展，高起点规划、高标准建设雄安新区。',
			date:'2017年10月18日',
			zIndex:98,
		}
	],[
		{
			url:imgs.img9,
			text:'首批48家企业获批入驻雄安新区，包括阿里巴巴、腾讯、百度、京东金融、360、深圳光启、国开投、中国电信、中国人保等。',
			date:'2017年9月28日',
			zIndex:98,
		}
	],[
		{
			url:imgs.img10,
			text:'中国雄安建设投资集团完成工商注册登记。',
			date:'2017年7月18日',
			zIndex:98,
		}
	],[
		{
			url:imgs.img11,
			text:'中共河北雄安新区工作委员会、河北雄安新区管理委员会获批设立。',
			date:'2017年6月21日',
			zIndex:98,
		}
	],[
		{
			url:imgs.img12,
			text:'雄安新区召开首场新闻发布会，面前全球招标启动区规划设计方案。',
			date:'2017年4月26日',
			zIndex:98,
		}
	],[
		{
			url:imgs.img13,
			text:'中共中央国务院决定设立河北雄安新区的消息发布。',
			date:'2017年4月1日',
			zIndex:98,
		}
	],[
		{
			url:imgs.img14,
			text:'习近平到雄安新区考察并主持召开座谈会。',
			date:'2017年2月23日',
			zIndex:98,
		}
	],[
		{
			url:imgs.img15,
			text:'中央政治局会议审议《关于规划建设北京城市副中心和研究设立河北雄安新区的有关情况的汇报》。',
			date:'2016年5月27日',
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