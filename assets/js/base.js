var imgs = {
	play: './assets/images/play.png',
	

	logo: './assets/images/logo.png',

	arrow: './assets/images/arrow.png',
	imgBg: './assets/images/img-bg.png'
}


var arr = [];
for (var attr in imgs) {

	arr.push(imgs[attr]);
}


var musics = {
	music: {
		src: './assets/music/bg3.mp3',
		autoplay: false,
		name: 'bg',
		loop: true
	}
}