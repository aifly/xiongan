var imgs = {
	play: './assets/images/play.png',
	

	logo: './assets/images/logo.png',

	arrow: './assets/images/arrow.png',
	img1:'./assets/images/1.jpg',
	img2:'./assets/images/2.jpg',
	img3:'./assets/images/3.jpg',
	img4:'./assets/images/4.jpg',
	img5:'./assets/images/5.jpg',
	img6:'./assets/images/6.jpg',
}
var arr = [];
for (var attr in imgs) {
	arr.push(imgs[attr]);
}

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
			zIndex:100,
		}
	],[
		{
			url:imgs.img2,
			zIndex:99,
		}
	],[
		{
			url:imgs.img3,
			zIndex:98,
		}
	],[
		{
			url:imgs.img4,
			zIndex:98,
		}
	],[
		{
			url:imgs.img5,
			zIndex:98,
		}
	],[
		{
			url:imgs.img6,
			zIndex:98,
		}
	]

];

var musics = {
	music: {
		src: './assets/music/bg3.mp3',
		autoplay: false,
		name: 'bg',
		loop: true
	}
}