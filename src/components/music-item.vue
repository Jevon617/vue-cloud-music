<template>
    <div class="musicItem">
    	<div class="left">{{ index }}</div>
    	<div class="right">
    		<div class="info">
    			<div class="title">{{ song.name }}</div>
    			<div class="author">
    				<span class="sq">SQ</span>
    				{{ song.artists[0].name+ '-' + song.album.name }}
    			</div>
    		</div>
    		<div class="play" @click="add"></div>
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
			default : 0		
		},
		song : {
			type : Object,
			default : ()=>{
				return {}
			}
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
@import '../scss/px2rem.scss';

.musicItem{
	width: 100%;
	height: px2rem(120);
	@include flex;
	.left{
		width: px2rem(120);
		height: 100%;
		line-height: px2rem(120);
		color: gray;
		text-align: center;
	}
	.right{
		@include prix(flex, 1);
		border-bottom: px2rem(2) solid #ccc;
		height: 100%;
		@include padding(px2rem(10) 0 px2rem(20));
		@include flex(space-between);
		.info{
			@include prix(flex, 1);
		}
		.title{
			width: px2rem(400);
			font-size: px2rem(30);
			line-height: px2rem(70);
			height: px2rem(70);
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}
		.author{
			width: px2rem(400);
			font-size: px2rem(24);
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
