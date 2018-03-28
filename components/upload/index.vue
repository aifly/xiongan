<template>
	<transition name='upload'>
		<div class="lt-full zmiti-upload-main-ui "  v-show='show' ref='page'>
			<div class="lt-full " :style="{background: 'url('+imgs.img1+') no-repeat center center',backgroundSize:'cover','-webkit-filter':'blur(14px)'}"></div>

			<div class="zmiti-upload-bottom" ref='list'>
				<ul :style="{width:mainImgList.length*2.4+'rem'}">
					<li v-tap='tab(i)' v-for='(img,i) in mainImgList'>
						<div :style="{background: 'url('+img[0].url+') no-repeat center center',backgroundSize:'cover'}"></div>
						<div>2018/4/01</div>
					</li>
				</ul>
			</div>
		</div>
		
	</transition>
</template>

<script>
	import './index.css';
	import {imgs,mainImgList} from '../lib/assets.js';
	import $ from 'jquery';
	import IScroll from 'iscroll';
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

			tab(i){
				console.log(i)
			}
			
		},
		mounted(){

			window.s = this;
			var {obserable} = this;

			this.scroll = new IScroll(this.$refs['list'],{
				scrollX:true,
				scrollY:false
			})
		}
	}
</script>