<template>
	<div v-tap='[entry]'  class="lt-full zmiti-index-main-ui "   :class="{'show':show}">
		
		<div v-if='!showCloud'>
			<div class='zmiti-year' >
				<img @touchstart='imgStart($event)' :src="imgs.year">
			</div>

			<div class='zmiti-title1'>
				<img @touchstart='imgStart($event)' :src="imgs.title1">
			</div>
		
			<div class='zmiti-cloud' :class='{"active":beginEntry}'>
				<img @touchstart='imgStart($event)' :src="imgs.cloud">
			</div>
			

			<div class='zmiti-xiongan' :class='{"active":beginEntry}'>
				<img @touchstart='imgStart($event)' :src="imgs.xiongan" draggable='false'>
			</div>

			<div class="zmiti-text">
				{{xionganText}}
			</div>
		

			<div class="zmiti-logo">
				<img @touchstart='imgStart($event)' :src="imgs.logo">
				<span></span>
			</div>


			<div class="zmiti-entry" >
				进入
			</div>
		</div>
		
<!-- 
		<div v-show='showCloud' class="lt-full">
			<div class="lt-full"  :style="{background:'url('+imgs.kf_cloud_00000+')'}">
				
			</div>
		</div> -->

		<div v-if='showCloud' class="lt-full zmiti-cloud2">
			<div class="lt-full" v-show='i<cloudIndex' :style="{background:'url('+imgs['kf_cloud_0000'+i]+')',backgroundSize:'cover'}" v-for='(img,i) in mainImgList'>
			</div>
		</div>


		
	</div>
</template>

<script>
	import './index.css';
	import {imgs,mainImgList} from '../lib/assets.js';
	import zmitiUtil from '../lib/util';
	import $ from 'jquery';
	import Toast from '../toast/toast';
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				imgs,
				show:true,
				toastMsg:'',
				cloudIndex:0,
				showBtns:false,
				mainImgList,
				showMasks:false,
				transX:0,
				transY:0,
				style:{},
				cloundUrl:imgs['kf_cloud_00001'],
				showCloud:false,
				xionganText:window.xionganDesc,
				index:1,//当前的通道。en
				createImg:'',
				beginEntry:false,

			}
		},
		components:{
			 Toast
		},
		
		methods:{

			imgStart(e){
				e.preventDefault(); 
			},

			entry(){

				this.beginEntry = true;
				setTimeout(()=>{
					this.showCloud = true;

					var i=0;
					var t = setInterval(()=>{
						if(!imgs['kf_cloud_0000'+i]){
							var {obserable} = this;
							obserable.trigger({
								type:'toggleIndex',
								data:{
									show:false
								}
							});
							obserable.trigger({
								type:'toggleMain',
								data:{
									show:true
								}
							});
							setTimeout(()=>{
								this.showCloud = false;
							},1000)
							clearInterval(t);
							return;
						}

						this.cloudIndex++;

						this.cloundUrl = imgs['kf_cloud_0000'+i];
						this.style = {background: 'url('+this.cloundUrl+') no-repeat center center',backgroundSize:'cover'}

						i++;

					},100)


				},800)
				return;
				
			}
			
		},
		mounted(){


			var {obserable} = this;

			obserable.on('toggleIndex',(data)=>{
				this.show = data.show;
			})


			setTimeout(()=>{
				//this.entry();
			},100)

			


		}
	}
</script>