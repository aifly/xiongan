function MusicVisualizer(options) {
	//鎾斁杩囩殑bufferSource鐨勫璞�
	this.buffer = {};

	//褰撳墠姝ｅ湪鎾斁鐨刡ufferSource
	this.source = null;

	//閫氳繃audio鏍囩鍒涘缓MediaaudioElementSourceNode鏃朵娇鐢ㄧ殑audio鍏冪礌
	this.audio = new Audio();
	this.audioSource = MusicVisualizer.ac.createMediaElementSource(this.audio);

	//閫夋嫨杩囩殑璧勬簮鏁扮殑绱鍊�
	this.count = 0;

	//鎾畬鍚庣殑鍥炶皟
	this.onended = options.onended;

	//unit8Array鐨勯暱搴�
	this.size = options.size || 32;

	//鍙鍖栬皟鐢ㄧ殑缁樺浘鍑芥暟
	this.visualizer = options.visualizer;

	//鍒濇鍔犺浇绗竴棣栭煶涔愭垚鍔熸椂鍥炶皟鍑芥暟锛岄拡瀵硅嫻鏋滅姝㈣嚜鍔ㄦ挱鏀剧敤
	this.initCallback = null;

	//鎺у埗闊抽噺鐨凣ainNode
	this.gainNode = MusicVisualizer.ac[MusicVisualizer.ac.createGain ? "createGain" : "createGainNode"]();

	//闊抽鍒嗘瀽瀵硅薄
	this.analyser = MusicVisualizer.ac.createAnalyser();

	//寤惰繜瀵硅薄
	this.delayNode = MusicVisualizer.ac.createDelay(179);

	typeof options.delay === 'number' && (this.delayNode.delayTime.value = options.delay);
	//this.delayNode.delayTime.value = 5;

	this.analyser.connect(this.delayNode);

	this.delayNode.connect(this.gainNode);

	this.gainNode.connect(MusicVisualizer.ac.destination);

	//xhr瀵硅薄
	this.xhr = new window.XMLHttpRequest();

	MusicVisualizer.visualize(this);
}

MusicVisualizer.ac = new(window.AudioContext || window.webkitAudioContext || window.mozAudioContext)();

//妫€娴嬫槸鍚︿负function
MusicVisualizer.isFunction = function(fun) {
	return Object.prototype.toString.call(fun) == "[object Function]";
}

/*浠庢寚瀹氱殑璺緞鍔犺浇闊抽璧勬簮
 *@param xhr XMLHttpRequest
 *@param path string,闊抽璧勬簮璺緞
 *@param fun function,decode鎴愬姛鍚庣殑鍥炶皟鍑芥暟锛屽皢arraybuffer浣滀负this
 */
MusicVisualizer.load = function(xhr, path, fun) {
	xhr.abort();
	xhr.open("GET", path, true);
	xhr.responseType = "arraybuffer";

	xhr.onload = function() {
		MusicVisualizer.isFunction(fun) && fun.call(xhr.response);
	}
	xhr.send();
}

//鎾斁mv瀵硅薄鐨剆ource,mv.onended涓烘挱鏀剧粨鏉熷悗鐨勫洖璋�
MusicVisualizer.play = function(mv) {

	mv.source.connect(mv.analyser);

	if (mv.source === mv.audioSource) {
		mv.audio.play();
		mv.audio.onended = mv.onended;
	} else {
		//鍏煎杈冭€佺殑API
		mv.source[mv.source.start ? "start" : "noteOn"](0);

		//涓鸿bufferSource缁戝畾onended浜嬩欢
		MusicVisualizer.isFunction(mv.onended) && (mv.source.onended = mv.onended);
	}

}

//鍋滄mv.source
MusicVisualizer.stop = function(mv) {
	if (mv.source === mv.audioSource) {
		mv.audio.pause();
		mv.audio.onended = window.undefined;
	} else {
		//鍏煎杈冭€佺殑API
		mv.source[mv.source.stop ? "stop" : "noteOff"](0);

		//鍋滄鍚庣Щ闄や箣鍓嶄负mv.source缁戝畾鐨刼nended浜嬩欢
		mv.source.onended = window.undefined;
	}
}

/*鍙鍖栧綋鍓嶆鍦ㄦ挱鏀剧殑闊抽
 *@param mv MusicVisualizer,MusicVisualizer鐨勫疄渚嬪璞�
 */
MusicVisualizer.visualize = function(mv) {
	mv.analyser.fftSize = mv.size * 2;
	var arr = new Uint8Array(mv.analyser.frequencyBinCount);

	var requestAnimationFrame = window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.mzRequestAnimationFrame;
	var oldav = 0;

	function v() {
		mv.analyser.getByteFrequencyData(arr);
		var av = Math.round(100 * Array.prototype.reduce.call(arr, function(x, y) {
			return x + y
		}) / mv.size / 256);
		var dlav = av - oldav;
		oldav = av;
		//灏嗗垎鏋愬緱鍒扮殑闊抽鏁版嵁浼犻€掔粰mv.visualizer鏂规硶鍙鍖�
		mv.visualizer.call(arr, dlav, av);
		requestAnimationFrame(v);
	}

	MusicVisualizer.isFunction(mv.visualizer) && requestAnimationFrame(v);
}

//灏哸rraybuffer鏁版嵁decode寰楀埌buffer
//鎴愬姛鍚庡皢bufferSourceNode浣滀负fun鍥炶皟鐨則his
MusicVisualizer.prototype.decode = function(arraybuffer, fun) {
	var self = this;
	MusicVisualizer.ac.decodeAudioData(arraybuffer, function(buffer) {
		var bufferSourceNode = MusicVisualizer.ac.createBufferSource();
		bufferSourceNode.buffer = buffer;
		fun.call(bufferSourceNode);
	}, function(err) {
		console.log(err);
	})
}

MusicVisualizer.prototype.play = function(path, isMobile /*鏄惁绉诲姩璁惧*/ ) {
	var self = this;
	var count = ++self.count;

	//鍋滄褰撳墠姝ｅ湪鎾斁鐨刡ufferSource
	self.source && MusicVisualizer.stop(self);

	if (path instanceof ArrayBuffer) {
		self.decode(path, function() {
			self.initCallback && !self.source && MusicVisualizer.isFunction(self.initCallback) && self.initCallback();
			self.source = this;
			MusicVisualizer.play(self);
		});
	}
	if (typeof(path) === 'string') {

		//pc涓婇€氳繃audio鏍囩鍒涘缓MediaaudioElementSourceNode锛屾瘮ajax璇锋眰鍐嶈В鐮佽蹇�
		if (!isMobile) {
			//self.audio.src = path;
			self.audio = new Audio(path);
			self.audioSource = MusicVisualizer.ac.createMediaElementSource(self.audio);
			//console.log(path);

			self.initCallback && !self.source && MusicVisualizer.isFunction(self.initCallback) && self.initCallback();

			self.source = self.audioSource;

			MusicVisualizer.play(self);

			return;
		}

		//瀹夊崜iphone绛夌Щ鍔ㄨ澶囦笂浣跨敤ajax璇锋眰arraybuffer鍐嶈В鐮�
		//瀹夊崜iphone绛夌Щ鍔ㄨ澶囦笂audio鎾斁娴佷技涔庢病琚玶e-routed鍒癮udioContext涓�
		if (path in self.buffer) {
			MusicVisualizer.stop(self.source);

			var bufferSource = MusicVisualizer.ac.createBufferSource();
			bufferSource.buffer = self.buffer[path];
			self.source = bufferSource;
			MusicVisualizer.play(self);
		} else {
			MusicVisualizer.load(self.xhr, path, function() {

				if (count != self.count) return;

				self.decode(this, function() {

					if (count != self.count) return;

					//灏哾ecode濂界殑buffer缂撳瓨璧锋潵
					//self.buffer[path] = this.buffer;

					self.initCallback && !self.source && MusicVisualizer.isFunction(self.initCallback) && self.initCallback();

					self.source = this;

					MusicVisualizer.play(self);
				});
			})
		}
	}
}

//鐩存帴鎾斁褰撳墠鐨刡ufferSource锛屽湪鑻规灉璁惧鐢ㄦ埛瑙﹀彂鏃惰皟鐢�
MusicVisualizer.prototype.start = function() {
	if (this.source === this.audioSource) {
		this.audio.play();
	} else {
		this.source && this.source[this.source.start ? "start" : "noteOn"](0);
	}
}

//搴旂敤鍔犺浇瀹屾瘯锛屼负鑻规灉璁惧娣诲姞鐢ㄦ埛瑙﹀彂鐨勪簨浠�
MusicVisualizer.prototype.addinit = function(fun) {
	this.initCallback = fun;
}

//闊抽噺璋冭妭
MusicVisualizer.prototype.changeVolume = function(rate) {
	this.gainNode.gain.value = rate * rate;
}