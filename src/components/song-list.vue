<template>
    <div class="song-list">
		<div class="menu">
			<div class="playall" @click="addSongs()">
				<div class="play"></div>
				<div class="btn">播放全部 <span class="all">(共{{songs.length}}首)</span></div>
			</div>
			<div class="collect">
				<span class="add">+</span> 收藏
			</div>
		</div>

		<div class="list">
			<mitem v-for="item, index in songs"
				   :key="index"
		           :song="item"
		           :show="false"
		  	       :index="String(index+1).length == 1 && '0' + String(index+1)
		  	  		  || String(index+1)"
		           v-on:addSongs="addSongs">
		    </mitem>
		</div>
    </div>
</template>

<script>
import mitem from './music-item.vue';
import { clone } from '../service/utlis.js';

export default {
	props : {
		songs : {
			type : Array,
			default : ()=>{
				return []
			}
		}
	},
	methods:{
		addSongs(index=1){
			let songs = clone(this.songs);
			let i = Number(index)-1;
			this.$store.commit('addSongs', {song:songs, recommend:true, index : i});
		}
	},
	components:{
		mitem
	}

    
}
</script>

<style scoped  lang="scss">
@import '../scss/mixin.scss';

.song-list{
	background-color: rgb(112, 63, 63);
	margin-top: px2rem(-1);
	.menu{
		border-top-left-radius: px2rem(20);
		border-top-right-radius: px2rem(20);
		height: px2rem(100);
		line-height: px2rem(100);
		@include flex;
		border-bottom: px2rem(1) solid #ccc;
		background-color:white;
		overflow: hidden;
	}
	.list{
		background-color:white;
	}
	.playall{
		width: 68%;
		height: 100%;
		@include flex;
		.play{
			width:px2rem(100);
			height: px2rem(100);
			@include bg('../images/play_b.svg');
			background-size: 50% 50%;
			background-position: center center;
		}
		.all{
			color: gray;
			font-size: px2rem(28);
			line-height: px2rem(100);
		}
		.btn{
			font-size: px2rem(32);
			@include prix(flex,1);
			height: 100%;
		}
	}
	.collect{
		width: 32%;
		height: 100%;
		color: white;
		background-color: $bg;
		line-height: px2rem(100);
		font-size: px2rem(28);
		text-align: center;
		.add{
			font-size: px2rem(32);
		}
	}
}

</style>
