<template>
    <div class="player" v-if="$store.state.songs.length">
		<audio ref="audio" preload  @timeupdate="setTime"
		 	   @ended="end"
		      :src="'http://music.163.com/song/media/outer/url?id='
		      + $play.id +'.mp3'">
		</audio>
		
    	<img :src="$play.album.picUrl">
    	<div class="middle">
    		<div class="title">{{ $play.name }}</div>
    		<div class="lyric">作曲　:　文健</div>
    	</div>

    	<div class="play1" @click="play" v-show="state == 'paused'"></div>
    	
    	<div class="play2" @click="pause" v-show="state == 'playing'">
    		<cprogress :radius="radius" :percent="this.$precent">
				<div class="icon"></div>
			</cprogress>
    	</div>
    	<div class="list" @click="showList"></div>
    </div>
</template>
<script>

import { mapGetters } from 'vuex';
import { Bus } from '../bus.js';
import cprogress from './progress-circle.vue';

export default {
	data(){
		return{
			state : 'paused',
			radius : 60,
			currentTime :  Number(localStorage.getItem('current' + this.id)) || 0
		}
	},
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
		id : {
			type : String,
			default : ''
		}
		
	},
	computed:{
		...mapGetters([
			'$play'
		]),
		$precent(){
			let duration = this.$play.duration/1000;
			return Math.min(1, this.currentTime/duration);
		}

	},
	methods:{
		showList(){
			Bus.$emit('showList');
		},
		play(){
			this.$refs.audio && this.$refs.audio.paused && this.$refs.audio.play();
			this.state = "playing";
		},
		pause(){
			this.$refs.audio && this.$refs.audio.pause();
			this.state = "paused";
		},
		setTime(){
			this.currentTime = this.$refs.audio.currentTime;
			localStorage.setItem('current'+this.id, this.currentTime);
		},
		end(){
			this.state = 'paused';
			localStorage.removeItem('current'+this.id);
			let currentIndex = this.$store.state.currentIndex;
			let lenght = this.$store.state.songs.length;

			if(this.$store.state.type == '列表循环'){

				if(length - 1 == currentIndex){
					this.$store.state.currentIndex = 0;
				}else{
					this.$store.state.currentIndex ++;
				}
			}else if(this.$store.state.type == '随机播放'){
				let random = Math.random(Math.floor(-1,length));
				this.$store.state.currentIndex = random;
			}else{
				this.$store.state.currentIndex = currentIndex;
			}
		}
	}, 
	watch: {
		// 监听播放歌曲变化.
		$play : function(){
			console.log('下一曲');
			this.$nextTick(()=>{
				this.play();
			})
			localStorage.setItem('songs', JSON.stringify(this.$store.state.songs));
		}
	},
	components:{
		cprogress
	},
	mounted(){
		this.$refs.audio.currentTime = Number(localStorage.getItem('current' + this.id)) || 0;
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
	.play1{
		width: px2rem(80);
		height: px2rem(80);
		@include bg('../images/play_b.svg');
		background-size: 70% 70%;
		background-position: center center;
	}
	.play2{
		width: px2rem(80);
		height: px2rem(80);
		@include flex(center);
	}
	.list{
		width: px2rem(80);
		height: px2rem(80);
		@include bg('../images/catalog_d.svg');
		background-size: 60% 60%;
		background-position: center center;
	}
	.icon{
		position: absolute;
		width: px2rem(30);
		height: px2rem(30);
		top: 50%;
		left: 50%;
		@include bg('../images/pause.svg');
		@include prix(transform,translate(-50%, -50%));
	}
}

</style>
