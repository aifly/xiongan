<template>
	<transition name='main'>
		<div class="lt-full zmiti-main-main-ui "  v-show='show' ref='page'>
			<div class="zmiti-main-canvas-C"    :style="{zIndex:isNext?19:10}">
				<canvas :width='viewW' :height="viewH" ref='canvas'  ></canvas>
			</div>
			<div class="zmiti-main-canvas-C"  style="z-index: 10"   :style="{zIndex:isNext?9:19}">
				<canvas :width='viewW' :height="viewH" ref='canvas1'  ></canvas>
			</div>
			<div v-if='!animating'  v-tap='[next]' style='position:absolute;z-index: 105;border:1px solid red;left: 20px;top:100px;'  >下一个</div>
			<div v-if='!animating' v-tap='[prev]' style='position:absolute;z-index: 105;border:1px solid red;left: 120px;top:100px;' >上一个</div>
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
				index:0,
				iNow:0,
				viewW:window.innerWidth,
				viewH:window.innerHeight,
				showMasks:false,
				animating:false,//正在动画
				isNext:true,
			}
		},
		components:{
		},
		
		methods:{

			next(){

				
				if(!this.mainImgList[this.index] || this.animating){
					return;
				}
				this.animating = true;
				this.initCanvas()

				var context =this.context;
			

				var t = setInterval(function(){
                    this.iNow += 30;
                    context.save ();
                    context.rotate (40 * Math.PI / 180 );
                    context.translate ( 0, - this.iNow );
                    context.fillRect ( 0, this.viewH, this.viewW * 2, this.viewH * 1.5 );
                    context.restore ();

                    if(this.iNow > this.viewH + this.viewW){
                        //this.mainImgList[this.index][0].zIndex = 0;
                        clearInterval(t);
                        //this.isNext = false;
                        this.animating = false;

                       	this.index++;
                       	/*this.cacheData = this.mainImgList.shift();
                        console.log(this.index);*/
                        this.iNow = 0;
                    }
                }.bind(this),20);
				
			},

			prev(){


				this.index--;
				if(this.index<0 || this.animating){
					this.index = 0;
					return;
				}

				this.animating = true;

				

				this.context = this.drawDefault('canvas',this.index,0);
				this.context1 = this.drawDefault('canvas1',this.index+1);
				//this.context = this.drawDefault('canvas',this.index);
				var context =this.context1;
				var opacity=0;
				var t = setInterval(function(){
					opacity+=.1;
					if(opacity>1){
						clearInterval(t);
						this.animating = false;
						return;
					}
                    this.context = this.drawDefault('canvas',this.index,opacity);
                }.bind(this),20);
				
			},
			initCanvas(){

				this.context = this.drawDefault('canvas',this.index);
				this.context1 = this.drawDefault('canvas1',this.index+1);
				
			},

			drawDefault(ref,index,opacity=1){
				if(index<-1 || !this.mainImgList[index]){
             		return;
             	}
				var canvas = this.$refs[ref];
				var context = canvas.getContext('2d');
				context.globalCompositeOperation = "source-over";
                context.shadowBlur = 0;
                context.shadowColor = 'transparent';
                context.globalAlpha = opacity;
				this.drawImage(this.mainImgList[index][0].url,(img)=>{
					context.drawImage(img,0,0,this.viewW,this.viewH);
					context.globalCompositeOperation = "destination-out";
	                context.shadowBlur = 280;
	                context.shadowColor = 'red';

				});
				return context;
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

			window.s = this;
			
			this.initCanvas();

			var {obserable} = this;

		}
	}
</script>