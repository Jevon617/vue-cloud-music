<template>
    <div class="progress">
    	<div class="start">{{ currentTime }}</div>
    	<div class="line" @touchstart="getStart" @touchend="getEnd">
	    	<div class="gray"></div>
	    	<div class="red" :style="{ width : precent*100 + '%'  }"></div>
	    	<div class="circle" :style="{ left : precent*100 + '%'  }" @touchmove="setProgress">
	    		<div class="dot"></div>
	    	</div>
    	</div>
    	<div class="end">{{ duration }}</div>
    </div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
	data(){
		return{
			startX : 0
		}
	},
	props:{
		precent:{
			type : Number,
			default : 0
		},
		duration : {
			type : String,
			default : "04:00"
		},
		currentTime : {
			type : String,
			default : "00:00"
		}
	},
	methods:{
		setProgress(e){
			e.stopPropagation();
			let movex = e.changedTouches[0].clientX-134;
			if(movex < 0 || movex>490){
				return;
			}
			let precent = movex/490;
			this.$emit('setProgress', precent);
		},

		getStart(e){
			this.startX = e.changedTouches[0].clientX;
		},
		
		getEnd(e){
			let disX = Math.abs(e.changedTouches[0].clientX - this.startX);
			if(disX == 0 ){
				let precent = (this.startX-134)/490;
				this.$emit('setProgress', precent);
			}
		}
	},
	computed:{
		...mapGetters([
			'$play'
		])
	}
    
}
</script>

<style scoped  lang="scss">
@import "../scss/px2rem.scss";
@import "../scss/mixin.scss";

.progress{
	width: 100%;
	height: px2rem(24);
	@include flex(space-between);
	.start,.end{
		width: px2rem(90);
		height: 100%;
		height: px2rem(24);
		line-height: px2rem(24);
		font-size: px2rem(16);
		color:#bfbfbf;
		text-align: center;
	}
	.line{

		@include prix(flex, 1);
		height: px2rem(4);
		position: relative;
		padding: px2rem(20) 0 ;

		.gray{
			height: px2rem(4);
			width: 100%;
			background-color: #bfbfbf; 
			border-radius: px2rem(10);
			position: absolute;
			left: 0;
			top: 50%;
			@include prix(transform, translateY(-50%));
			z-index: 11;
		}
		.red{
			height: px2rem(4);
			background-color: #ec5858;
			border-radius: px2rem(10);
			position: absolute;
			left: 0;
			top: 50%;
			@include prix(transform, translateY(-50%));
			z-index: 12;
		}
		.circle{
			width: px2rem(24);
			height: px2rem(24);
			background-color: white;
			border-radius: 50%;
			position: absolute;
			top: 50%;
			@include prix(transform, translate(-50%,-50%));
			z-index: 13;

			.dot{
				position: absolute;
				width: px2rem(6);
				height: px2rem(6);
				background-color: #ec5858;
				border-radius: 50%;
				top: 50%;
				left: 50%;
				@include prix(transform, translate(-50%, -50%));
			}
		}
	}


}

</style>
