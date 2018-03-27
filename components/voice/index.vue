<template>
	<transition name='main'>
		<div  class="lt-full zmiti-tree-main-ui " :style="voiceStyle.bgStyle"  v-show='show' ref='page'>
			<ul v-swipeleft='swipeLeft' v-swiperight='swipeRight' class="zmiti-subject-list"  id="zmiti-subject-list" >
					<li :class="voice.className" :style="{background:'#fff url('+imgs.imgBg+') no-repeat center top',backgroundSize:'cover'}"
					class="lt-full" v-for='(voice,index) in voiceList' @click='entryDetail(voice)' >
						<div class="zmiti-voice-title">
							<span hidden="">通道好声音</span>
							<img v-if='voiceStyle.titleImg' :src="voiceStyle.titleImg">
							<span hidden="">{{index+1}}</span>
						</div>
						<div class="zmiti-img-C" @touchend='playAudio'>
							<img draggable='false' v-bind:src='voice.img'/>
							<div>{{voice.date}}</div>
						</div>

						<div class="zmiti-voice-name" v-html='voice.name'>
							
						</div>


						<audio :src='voice.audio' ref='audio'></audio>

						<div class="zmiti-operator">
							<section class="zmiti-start">
								<img :src="imgs.voice" />
							</section>
							<canvas :style="{background:'url('+(index === currentIndex && isPlaying ?imgs.frequency:imgs.frequency1)+') no-repeat center center',backgroundSize:'contain'}" :id='voice.id' ref='canvas' width="260" height="70"></canvas>
							<section class="zmiti-reload" @touchend='reloadAudio'>
								<img :src="imgs.reload" :class='{"rotate":isReload && currentIndex === index}' />
							</section>
						</div>

						<div class="zmiti-ar" @touchend='initRight'>
							<div></div>
						</div>

						<div class="zmiti-ar zmiti-ar1" @touchend='initLeft'>
							<div></div>
						</div>
						
					</li>
				</ul>

			<div class="zmiti-team zmiti-btn" @touchend='showTeam = true'>
				制作团队
			</div>
			
			<div  class=" zmiti-main zmiti-btn" @touchend='entryIndex'>
				主通道
			</div>

			<div  class=" zmiti-listen zmiti-btn" @touchend='showVoiceList'>
				返回
			</div>

			<div  hidden="" class="zmiti-listen zmiti-btn" @touchend='togglePlay'>
				{{isAutoPlay?'暂停':'依次收听'}}
			</div>

			<transition name='team'>
				<div v-if='showTeam' :style='{background:"#fff url("+imgs.teamBg+") no-repeat center top",backgroundSize:"cover"}' class="zmiti-team-main-ui lt-full" @touchend='showTeam = false'>
					<div class="zmiti-team-main">
						<h1>
							<div>制作团队</div>
						</h1>
						<section><span>总策划：</span><span>刘思扬</span></section>
						<section><span>总监制：</span><span>刘洁</span><span>陈凯星</span><span>冯瑛冰</span></section>
						<section><span>统筹：</span><span>兰红光</span><span>马书平</span></section>
						<section><span>监制：</span><span>葛素表</span><span>陈知春</span><span>于卫亚</span><span>曹建礼</span><span  style="opacity:0">曹建建礼</span><span>李代祥</span><span>周年钧</span><span>何莉</span></section>	
						<section><span>设计：</span><span>赵丹阳</span></section>
						<section><span>记者：</span><span>李尕</span><span>路滨琪</span><span>潘旭</span><span>赖星</span><span>孔令杭</span></section>
						<section><span>编辑：</span><span>王绥翊</span><span>姜子炜</span><span>叶心可</span><span>黄南希</span><span style="opacity:0;">徐徐祥达</span><span>徐祥达</span></section>
						<section><span>技术支持：</span><span>雷风侠工作室</span></section>
						<section  style="margin-top: 30px" class="zmiti-copyright"><span>新华社新媒体中心、摄影部联合出品</span></section>

							
						<div class="zmiti-back">返回</div>
					</div>
				</div>
			</transition>

			<transition name='list'>
				<div v-if='showList' class="zmiti-voice-list lt-full" :style="{background:'url('+imgs.listBg+') no-repeat center top',backgroundSize:'cover'}">
					<ul :class="listClass">
						<li >
							<div @touchend='entry(item,i)' :class='{"show":listIndex >= i}' v-for='(item,i) in voiceList'>
								<img :src="item.img">
							</div>
						</li>
					</ul>
				</div>
			</transition>

			
		</div>
	</transition>
</template>

<script>
	import './index.css';
	import {imgs} from '../lib/assets.js';
	import $ from 'jquery';
	export default {
		props:['obserable','pv','randomPv','nickname','headimgurl'],
		name:'zmitiindex',
		data(){
			return{
				imgs,
				showTeam:false,
				showQrcode:false,
				show:false,
				viewW:window.innerWidth,
				viewH:window.innerHeight,
				voiceList:[],
				isPlaying:false,
				showMasks:false,
				currentIndex:-1,
				isPlaying:false,
				lastCurrentIndex:-1,
				isAutoPlay:false,
				isReload:false,
				showList:true,
				listClass:'',
				iNow:-1,
				scale:1,
				voiceStyle:{
					bgStyle:{}
				},

				listIndex:-1

			}
		},
		components:{
		},
		
		methods:{

			entryDetail(){

			},


			togglePlay(){
				this.isAutoPlay = !this.isAutoPlay;
				if(!this.isPlaying){
					this.initLeft();
				}
			},

			loadData(url,fn){
				var {obserable} = this;
				$.getJSON(url,(data)=>{
					//this.initGL(data)
					this.voiceList = data;

					console.log(data);

					setTimeout(()=>{
						fn&& fn();
					},100)
					
					 
					
					return;
					setTimeout(()=>{
						obserable.trigger({
							type:'showVoicePage'
						})
					},200)
					//this.loadMusic(this.voiceList[0].audio,true);
				})
			},


			entry(item,i){
				var scale = 0;
				
				this.lastCurrentIndex =this.currentIndex;
				
				/*switch(index){
					case 0:
					this.iNow = i;
					break;
					case 1:
					this.iNow = i+this.list1.length;
					break;
					case 2:
					this.iNow = i+this.list1.length+this.list2.length;
					case 3:
					this.iNow = i+this.list1.length+this.list2.length+this.list3.length;
					case 4:
					this.iNow = i+this.list1.length+this.list2.length+this.list3.length+this.list4.length;
					case 5:
					this.iNow = i+this.list1.length+this.list2.length+this.list3.length+this.list4.length+this.list5.length;
					break;
				}*/

				this.iNow = i;

				this.showList = false;
				this.listIndex = -1;


				if(this.lastCurrentIndex <= this.iNow){

					if(this.lastCurrentIndex === this.iNow){
						this.playAudio()
					}else{
						if(!this.isLeftFirst){
							this.isLeftFirst = true;	
							scale =1;
						}

						var len = this.iNow-this.lastCurrentIndex;
						for(var k =0;k<len;k++){
							//console.log(k)
							this.initLeft()
							
						}
					}
					
				}else{

					if(!this.isRightFirst){
						this.isRightFirst = true;	
						scale =1;
					}
					//console.log(this.lastCurrentIndex,this.iNow,this.lastCurrentIndex-this.iNow)
					for(var a =0;a<this.lastCurrentIndex-this.iNow;a++){
						//console.log(a);
						this.initRight()
					}
				}

				//this.lastCurrentIndex =this.currentIndex;





			},

			swipeLeft(){
				var s = this;
				this.isLeftFirst = true;
				this.iNow = (s.currentIndex + 1) % s.voiceList.length;
				this.initLeft();
			},
			swipeRight(){
				var s = this;
				this.iNow = s.currentIndex-1;
				if(this.iNow<0){
					this.iNow = this.voiceList.length - 1;
				}
				this.isRightFirst=  true;
				this.initRight();
			},


			initLeft: function() {
				var s = this;


				
				s.currentIndex = (s.currentIndex + 1) % s.voiceList.length;
				//s.loadMusic(s.voiceList[s.currentIndex].audio);
				//this.iNow = s.currentIndex;
				var classList = [
					'left1 transition',
					'left transition',
					'active transition',
					'right ',
					'right1 '
				]
				var voiceList = s.voiceList,
					currentIndex = s.currentIndex;

				s.playAudio();

				voiceList.forEach(function(list, i) {

					if (currentIndex > i) {
						voiceList[i].className = classList[0]
					} else if (currentIndex < i) {
						voiceList[i].className = classList[4]
					}

					(voiceList[currentIndex + 1] || voiceList[0])['className'] = classList[3];
					(voiceList[currentIndex + 2] || voiceList[1])['className'] = classList[4];
					(voiceList[currentIndex - 1] || voiceList[voiceList.length - 1])['className'] = classList[1];
					//(voiceList[currentIndex - 2] || voiceList[voiceList.length - 2])['className'] = classList[0];
				})

				voiceList[currentIndex].className = classList[2];
			},
			initRight: function() {

				var s = this;
				s.currentIndex = s.currentIndex - 1;

				if (s.currentIndex < 0) {
					s.currentIndex = s.voiceList.length - 1;
				}
				//this.iNow = s.currentIndex;
				setTimeout(()=>{
					s.playAudio();
				},10)
				var voiceList = s.voiceList,
					currentIndex = s.currentIndex;


				//console.log(s.currentIndex)

				s.currentIndex = s.currentIndex % voiceList.length;

				var classList = [
					'left1 ',
					'left ',
					'active transition',
					'right transition',
					'right1 transition'
				]

				voiceList.forEach(function(list, i) {

					if (currentIndex > i) {
						voiceList[i].className = classList[0]
					} else if (currentIndex < i) {
						voiceList[i].className = classList[4]
					}

					(voiceList[currentIndex + 1] || voiceList[0])['className'] = classList[3];
					(voiceList[currentIndex + 2] || voiceList[1])['className'] = classList[4];
					(voiceList[currentIndex - 1] || voiceList[voiceList.length - 1])['className'] = classList[1];
					//(voiceList[currentIndex - 2] || voiceList[voiceList.length - 2])['className'] = classList[0];
				})



				voiceList[currentIndex].className = classList[2];
			},

			loadMusic(url,isloaded=false){
				var zmitiRequestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;
				var ac = new (window.AudioContext || window.webkitAudioContext)();

				var gainNode = ac[ac.createGain?'createGain':'createGianNode']();

				gainNode.connect(ac.destination);

				var analyser = ac.createAnalyser();
				analyser.fftSize  = 256;
				analyser.connect(gainNode);

				this.analyser = analyser;
				var s = this;
				var xhr = new XMLHttpRequest();
				xhr.open('GET',url);
				xhr.responseType = 'arraybuffer';
				xhr.onload = function(){
					
					ac.decodeAudioData(xhr.response,function(buffer){
						var bufferSource = ac.createBufferSource();
						bufferSource.buffer = buffer;
						bufferSource.connect(analyser);
						//bufferSource.connect(ac.destination);
						bufferSource[bufferSource.start?'start':'noteOn'](0);

						var arr = new Uint8Array(analyser.frequencyBinCount);

						var canvas = s.$refs['canvas'][s.currentIndex];

						var context = canvas.getContext('2d');
						context.fillStyle ='#8d3836';
						//context.fillStyle ='#fff';

						var canvasW = canvas.width,
							canvasH = canvas.height;



						function render(){
							analyser.getByteFrequencyData(arr);
							//console.log(arr)
							//console.log(arr)
							context.clearRect(0,0,canvasW,canvasH);
							for(var i=0;i<30;i++){
								context.fillRect(12*i,0,5,arr[i+5]/4);
							}

							zmitiRequestAnimationFrame(render);
						}

						isloaded && render();
					})
				}
				xhr.send();


			},

			audioContextAction(){
				var ac = new (window.AudioContext || window.webkitAudioContext)();

				var bufferSource = ac.createBufferSource();

			},

			visualizer(){

			},

			initGL(data){
				var scene = new THREE.Scene();

				scene.background = new THREE.Color(0xf0f0f0);

				var renderer = new THREE.WebGLRenderer();
				renderer.setSize(this.viewW,this.viewH);

				this.$refs['page'].appendChild(renderer.domElement);

				var camera = new THREE.PerspectiveCamera( 45,this.viewW/this.viewH,1, 1000 );


				camera.position.set(0,0,100);
				camera.lookAt(scene.position);


				var textureLoader = new THREE.TextureLoader();
					var imgMap = textureLoader.load(this.imgs.floor);

					imgMap.wrapS = THREE.RepeatWrapping;
					imgMap.wrapT = THREE.RepeatWrapping;
					imgMap.anisotropy = 4;

					var imgMaterial = new THREE.MeshLambertMaterial({
						map:imgMap
					});
					imgMaterial.needUpdate  =true;
					
					var imgPlaneGeo = new THREE.PlaneGeometry(100,98,1,1);
					var imgMesh = new THREE.Mesh(imgPlaneGeo,imgMaterial);
					imgMesh.position.y = -20;
					imgMesh.rotation.x = -Math.PI*50/180;
					//imgMesh.rotation.z = Math.PI*50/180;

					scene.add(imgMesh);


				var r = 30;

				data.length = 10;
				var angle = 360/data.length;
				data.forEach((item,i)=>{

					var textureLoader = new THREE.TextureLoader();
					var imgMap = textureLoader.load(item.img);
					var imgMaterial = new THREE.MeshLambertMaterial({
						map:imgMap
					});
					
					var imgPlaneGeo = new THREE.PlaneBufferGeometry(600/30,838/30,100);
					var imgMesh = new THREE.Mesh(imgPlaneGeo,imgMaterial);
					//imgMesh.position.z = Math.cos(angle/180*Math.PI*i)*r;
					imgMesh.position.x = i*30;

					//imgMesh.rotation.y = (angle/180*Math.PI*i);

					console.log(imgMesh.rotation)
					scene.add(imgMesh);
				});
				 



				

				scene.add(new THREE.AmbientLight( '#fff',.7 ))
				
				function animate() {

					var time = Date.now() * 0.0005;

					renderer.render( scene, camera );
					requestAnimationFrame( animate );
				}

				animate()
			},

			reloadAudio(){
				this.isReload = true;
				setTimeout(()=>{
					this.isReload = false
				},1000)
				this.playAudio();
			},
			playAudio(){

				window.ss = this;
				this.voiceList.forEach((voice,i)=>{
					if(i !== this.currentIndex){
						this.$refs['audio'][i].muted =true;
						this.$refs['audio'][i].currentTime = 0;

						//!this.$refs['audio'][i].paused&&this.$refs['audio'][i].pause();
					}
				})
				var audio = this.$refs['audio'][this.currentIndex];
				if(audio){
					audio.muted = false;
					audio.currentTime =0 ;
					audio.play();
				}
			},
			showVoiceList(){
				var {obserable} = this;
				obserable.trigger({type:'initList'})
			},
			entryIndex(){//回到主通道
				this.show =false;
				this.showVoiceList();
				this.voiceList.length = 0;
			}
		},
		mounted(){
			


			var {obserable} = this;



			obserable.on('showVoicePage',(data)=>{
				this.show = true;
				this.currentIndex = 0;



				data && data.url && this.loadData(data.url,()=>{
					obserable.trigger({
						type:'initList'
					})
					
					this.voiceList.forEach((voice,i)=>{
						var $voice = $(this.$refs['audio'][i]);
						$voice.off('play').on('play',()=>{
							this.isPlaying = true;
						});
						$voice.off('pause').on('pause',()=>{
							//this.isPlaying = false;
						});
						$voice.off('ended').on('ended',()=>{
							if(!this.$refs['audio'][i].muted){
								this.isPlaying = false;
								if(this.isAutoPlay){
									this.initLeft();
								}
							}
						});	

						this.$refs['audio'][i].currentTime = 0;
						this.$refs['audio'][i].muted = true;
						this.$refs['audio'][i].play();

					})	
				});

				if(data){
					if(data.voiceStyle){
						this.voiceStyle = data.voiceStyle;
					}
					this.listClass = data.listClass;
				}



				/*setTimeout(()=>{
					this.$refs['audio'][0].currentTime = 0;
					this.$refs['audio'][0].muted =false;
					this.$refs['audio'][0].play();
					//this.playAudio();
				},10)*/

			})

			obserable.on('initList',()=>{
				this.showList = true;
				var i = -1;
				var t = setInterval(()=>{
					i++;
					this.listIndex = i;
					if(i>this.voiceList.length){
						clearInterval(t);
					}
				},60)
			})



		}
	}
</script>