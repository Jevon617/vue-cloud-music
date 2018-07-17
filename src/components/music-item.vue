<template>
    <div class="musicItem">
    	<div class="left" v-show="Number(index)">{{ index }}</div>
    	<div class="right">
    		<div class="info"  @click="add">
    			<div class="title">{{ song.name }}</div>
    			<div class="author">
    				<span class="sq" v-show="show">SQ</span>
    				<span v-if="song.artists">
    					{{  song.artists[0].name+ '-' + song.album.name }}
    				</span>
    				<span v-else>
    					{{  song.ar[0].name+ '-' + song.al.name }}
    				</span>
    			</div>
    		</div>
    		<div class="play"></div>
    		<div class="more" @click="showFunList"></div>
    	</div>
    </div>
</template>

<script>
import { Bus } from '../bus.js';
export default {

	props:{
		index : {
			type : String,
			default : '0'		
		},
		song : {
			type : Object,
			default : ()=>{
				return {}
			}
		},
		show : {
			type : Boolean,
			default : true
		}
	},
	methods:{
		add(){
			this.$emit('addSongs', this.index);
		},
		showFunList(){
			let index = Number(this.index) - 1;
			Bus.$emit('showFunList', this.song);
		}
	}
    
}
</script>

<style scoped  lang="scss">

@import '../scss/mixin.scss';

.musicItem{
	width: 100%;
	height: px2rem(140);
	@include flex;
	@include padding(0 0 0 px2rem(5));
	.left{
		width: px2rem(140);
		height: 100%;
		line-height: px2rem(130);
		color: gray;
		text-align: center;
	}
	.right{
		@include prix(flex, 1);
		border-bottom: px2rem(2) solid #ccc;
		height: 100%;
		@include padding(px2rem(10) 0 px2rem(20));
		@include flex(space-between);
		margin-left: px2rem(5);
		.info{
			@include prix(flex, 1);
		}
		.title{
			width: px2rem(400);
			font-size: px2rem(26);
			line-height: px2rem(70);
			height: px2rem(70);
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}
		.author{
			width: px2rem(400);
			font-size: px2rem(20);
			line-height: px2rem(24);
			color: gray;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			.sq{
				display: inline-block;
				color: $bg;
				border: 1px solid $bg;
				border-radius: px2rem(5);
				margin-right: px2rem(16);
				padding: 0 px2rem(2);
				font-weight: 600;
				font-size: px2rem(20);
			}
		}
		.play{
			width: px2rem(100);
			height: 100%;
			@include bg('../images/play_g.svg');
			background-size: 50% 60%;
			background-position: center center;

		}
		.more{
			width: px2rem(100);
			height: 100%;
			@include bg('../images/more.svg');
			background-size: 40% 60%;
			background-position: center center;
		}
	}
}



</style>
