<template>
	<transition name='main'>
		<div v-swipeup='next' v-swipeleft='next' v-swipedown='prev' v-swiperight='prev' class="lt-full zmiti-main-main-ui "  :class="{'show':show}" ref='page'>
			<div class="zmiti-main-canvas-C"    :style="{zIndex:isNext?19:10}">
				<canvas :width='viewW' :height="viewH" ref='canvas'  ></canvas>
			</div>
			<div class="zmiti-main-canvas-C"  style="z-index: 10"   :style="{zIndex:isNext?9:19}">
				<canvas :width='viewW' :height="viewH" ref='canvas1'  ></canvas>
			</div>

			<transition name='text'>
				<div class="zmiti-dashiji" v-if='showShiji' v-tap='[hideShiji]'>
					<img :src="imgs.shiji">
				</div>
			</transition>
			
			<transition name='text'>
				<div class="zmiti-img-text" v-if='showText && mainImgList[index][0] && !showShiji'>
					<img :src="imgs.textBg" class="zmiti-text-bg">
					<h4>{{mainImgList[index][0].date}}</h4>
					<div>{{mainImgList[index][0].text}}</div>
					<div class="zmiti-text-line">
						<span>
							
						</span>
						<img :src="imgs.close" v-tap='[close,"$event"]'>
					</div>
				</div>
			</transition>

			<div class="zmiti-photo" v-tap='[photo]'>
				<img :src="imgs.photo">
				<span>我要拍照</span>
			</div>

			<div class="zmiti-title">
				<img :src="imgs.title">
			</div>

			<div class="zmiti-year" v-if='false'>
				<img :src="imgs.year">
			</div>


			<div v-if='!animating && index < mainImgList.length-1'  v-tap='[next]' class="zmiti-next" ></div>
			<div v-if='!animating && index > 0' v-tap='[prev]'  class="zmiti-prev"></div>
			
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
				show:false,
				showShiji:false,
				mainImgList,
				showText:true,
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

			hideShiji(){
				this.showShiji = false;
			},

			close(e){
				e.preventDefault();
				this.showShiji = true;
			},

			photo(){
				var {obserable} = this;
				obserable.trigger({
					type:'toggleUpload',
					data:{
						show:true
					}
				})
			},

			next(){

				
				if(!this.mainImgList[this.index] || this.animating){
					return;
				}

				if(this.index>=this.mainImgList.length-1){
					this.index = this.mainImgList.length -1;
					return;
				}
				this.showText = false;
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
                        this.showText  = true;

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
					if(this.index<0){
						this.index = 0;
					}
					return;
				}

				this.animating = true;
				this.showText = false;

				

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
						this.showText = true;
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
		watch:{
			index(index){
				var {obserable} = this;
				obserable.trigger({
					type:'fillIndex',
					data:index
				})
			}
		},
		mounted(){

			window.s = this;
			
			this.initCanvas();

			var {obserable} = this;

			obserable.on('toggleMain',(data)=>{
				this.show = data.show;
				if(data.index){
					this.index = data.index;
					this.initCanvas();
				}
			})



		}
	}
</script>