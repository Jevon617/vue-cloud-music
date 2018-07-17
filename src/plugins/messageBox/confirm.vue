<template>
	<div class="confirm" v-show="show && info">
		<transition name="top">
    		<div class="box" v-show="show && info">
	    		<div class="title">{{ title }}</div>
	    		<div class="content">{{ info }}</div>
	    		<div class="bottom">
	    			<div class="ensure" @click="ensure">确定</div>
	    			<div class="cancle" @click="cancle">取消</div>
	    		</div>
    		</div>
		</transition>
	</div>
</template>

<script>
import { Bus } from "./bus.js"

export default {
	data(){
		return{
			show  : false,
			title : '提示',
			info  : ''
		}
	},
	methods:{
		ensure(){
			Bus.$emit('confirm_ensure');
			this.show = false;
		},
		cancle(){
			Bus.$emit('confirm_cancle');
			this.show = false;
		},
		hide(){
			this.show = false;
		},
		showConfirm(){
			this.show = true;
		}
	}
}
</script>

<style scoped  lang="scss">
@import "../../scss/mixin.scss";

.confirm{
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,.6);
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1000;
	@include flex(center, center);
	.box{
		border-radius: px2rem(10);
		width: 80%;
		height: px2rem(350);
		text-align: center;
		background-color: white;
		font-size: px2rem(35);
		.title{
			line-height: px2rem(100);
			font-weight: 600;
			width: 100%;
		}
		.content{
			width: 100%;
			line-height: px2rem(150);
			color: #666;
		}
		.bottom{
			line-height: px2rem(100);
			border-top: 1px solid #ccc;
			@include flex;
			div{
				width: 50%;
				line-height: px2rem(100);
				color: black;
			}
			.ensure{
				border-right: 1px solid #ccc;
				color: skyblue;
			}
		}

	}
	.top-enter-active, .top-leave-active{
		transition: transform .3s;
	}
	.top-enter{
		transform: scale(.6);
	}
	.top-leave-active{
		transform: scale(.6);
	}
}


</style>
