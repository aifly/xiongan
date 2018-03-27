<template>
	<div  class="lt-full zmiti-index-main-ui "   :class="{'show':show}">
		
		
	</div>
</template>

<script>
	import './index.css';
	import {imgs} from '../lib/assets.js';
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
				showBtns:false,
				showMasks:false,
				transX:0,
				transY:0,
				index:1,//当前的通道。en
				createImg:'',

			}
		},
		components:{
			 Toast
		},
		
		methods:{

			
			
		},
		mounted(){



			


		}
	}
</script>