<template>
	<transition name='main'>
		<div  class="lt-full zmiti-main-main-ui " v-tap='next'  v-show='show' ref='page'>
			<canvas :style="{zIndex:100-i}"  :width='viewW' :height="viewH" ref='canvas' v-for='(canvas,i) in mainImgList' ></canvas>
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
		</div>
	</transition>
</template>

<script>
	import './index.css';
	import {imgs,mainImgList} from '../lib/assets.js';
	console.log(mainImgList)
	import $ from 'jquery';
	export default {
		props:['obserable','pv','randomPv','nickname','headimgurl'],
		name:'zmitiindex',
		data(){
			return{
				imgs,
				showTeam:false,
				showQrcode:false,
				show:true,
				mainImgList,
				index:-1,
				viewW:window.innerWidth,
				viewH:window.innerHeight,
				showMasks:false,
				animating:false,//正在动画

			}
		},
		components:{
		},
		
		methods:{

			next(){
				if(this.animating){
					return;
				}
				this.animating = true;
				this.index +=1;
				if(!this.mainImgList[this.index]){
					return;
				}
				var w =this.viewW,
					h =this.viewH,
					x = 0,
					y = 0,
					centerX = this.viewW/2,
					centerY = this.viewH/2,
					context = this.mainImgList[this.index].context,
					r =centerY * 1.5; ;
				var speed = 5;
				var t = setInterval(()=>{

					w-=speed*2;
					h-=this.viewH/this.viewW*speed*2;

					x += speed;
					r -=speed;
					y +=this.viewH/this.viewW*speed;

					switch(this.mainImgList[this.index].type){
						case "rect":
							this.drawImage(this.mainImgList[this.index].url,(img)=>{
								context.fillStyle=  'red';
								context.drawImage(img,0,0,this.viewW,this.viewH);
								context.globalCompositeOperation="destination-atop";
								context.fillRect(x,y, w,h);
								
							});
							if(w<=0){
								context.clearRect(0,0,this.viewW,this.viewH)
								clearInterval(t);
								this.animating = false;
							}
						break;
						case "none":
							context.clearRect(0,0,this.viewW,this.viewH)
							this.animating = false;
						break;
						case "circle":

							if(r<=0){
								clearInterval(t);
								this.animating = false;
								context.clearRect(0,0,this.viewW,this.viewH)
								return;
							}
							this.drawImage(this.mainImgList[this.index].url,(img)=>{
								context.drawImage(img,0,0,this.viewW,this.viewH);
								context.globalCompositeOperation="destination-atop";
								context.beginPath();
								context.arc(centerX,centerY,r,0,Math.PI*2,false);
								context.closePath();
								context.fill();
								
							});


						break;
					}

					
					
					
				},20);
			},

			initCanvas(){
				var centerX = this.viewW/2,
					centerY = this.viewH/2,
					r = 100;;
				this.mainImgList.forEach((main,i)=>{
					var canvas = this.$refs['canvas'][i];
					var context = canvas.getContext('2d');
					main.context = context;
					this.drawImage(main.url,(img)=>{
						main.context.drawImage(img,0,0,this.viewW,this.viewH);
					});

					if(main.type === 'none'){

					}


				/*	if(i===0){
						this.drawImage(main.url,(img)=>{
							//context.fillStyle=  'red';
							context.drawImage(img,0,0,this.viewW,this.viewH);
							context.globalCompositeOperation="destination-atop";
							context.beginPath();
							context.arc(centerX,centerY,r,0,Math.PI*2,false);
							context.closePath();
							context.fill();
							
						});
					}
*/
					
					
					
				});
				
				


			},
			drawImage(url,fn){
				var img = new Image();
				img.onload = function(){
					fn(this);
				}
				img.src = url;
			}
			 
		 
		 
		 
		},
		mounted(){
			
			this.initCanvas();

			var {obserable} = this;

		}
	}
</script>