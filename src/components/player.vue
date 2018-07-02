<template>
    <div class="player" v-if="$store.state.songs.length">
    	<img :src="$store.state.songs[$current].album.picUrl">
    	<div class="middle">
    		<div class="title">{{ $store.state.songs[$current].name }}</div>
    		<div class="lyric">作曲　:　文健</div>
    	</div>
    	<div class="play"></div>
    	<div class="list" @click="showList"></div>
    </div>
</template>
<script>

import { mapGetters } from 'vuex';
import { Bus } from '../bus.js';

export default {
	props:{
		imgurl : {
			type : String,
			default : '../../static/error.png'
		},
		title : {
			type : String,
			default : ''
		},
		author : {
			type : String,
			default : ''
		},
		list : {
			type : Array,
			default : ()=>{
				return []
			}
		}
	},
	computed:{
		...mapGetters([
			'$current',
			'$getLength'
		])

	},
	methods:{
		showList(){
			Bus.$emit('showList');
		}
	},
	watch: {
		// 观察数组长度并缓存.
		$getLength: function(a, b) {
			console.log(this.$store.state.songs);
			localStorage.setItem('songs', JSON.stringify(this.$store.state.songs));
		}
	}
}	
</script>

<style scoped  lang="scss">

@import "../scss/mixin.scss";
@import "../scss/px2rem.scss";

.player{
	height: px2rem(110);
	width: 100%;
	position: absolute;
	bottom: 0;
	right: 0;
	z-index: 8;
	@include flex(space-between);
	border-top: px2rem(2) solid #ccc;
	background-color: rgba(255,255,255,.9);
	@include padding(0 px2rem(10));
	box-shadow: 0px 0px 3.1rem 0.033rem rgba(37, 37, 37, 0.5);
	img{
		width: px2rem(90);
		height: px2rem(90);
		border-radius: px2rem(5);
		margin-right: px2rem(20);
	}
	.middle{
		@include prix(flex, 1);
		.title{
			font-size: px2rem(28);
			line-height: px2rem(70);
			height: px2rem(70);
			overflow: hidden;
		}
		.lyric{
			font-size: px2rem(24);
			color: gray;
			font-size: px2rem(20);
			line-height: px2rem(40);
		}
	}
	.play{
		width: px2rem(80);
		height: px2rem(80);
		@include bg('../images/play_b.svg');
		background-size: 60% 60%;
		background-position: center center;
	}
	.list{
		width: px2rem(80);
		height: px2rem(80);
		@include bg('../images/catalog_d.svg');
		background-size: 60% 60%;
		background-position: center center;
	}
}

</style>
