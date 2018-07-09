<template>
    <div class="player" v-if="$store.state.songs.length">

		<audio ref="audio" preload  @timeupdate="setTime"
		 	   @ended="end"
		      :src="'http://music.163.com/song/media/outer/url?id='
		      + $play.id +'.mp3'">
		</audio>
		
    	<img :src="$play.album.picUrl" @click="$router.push('/mplay')">
    	<div class="middle">
    		<div class="title">{{ $play.name }}</div>
    		<div class="lyric">作曲　:　文健</div>
    	</div>

    	<div class="play1" @click="play" v-show="$store.state.states == 'paused'"></div>
    	
    	<div class="play2" @click="pause" v-show="$store.state.states == 'playing'">
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
import { clone } from '../service/utlis.js';
import { getLyric } from '../service/getData.js';


export default {
	data(){
		return{
			state : 'paused',
			radius : 60,
			isChange : false
		}
	},
	props:{
		imgurl : {
			type : String,
			default : 'static/error.png'
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
			'$play',
			'$currentLength'
		]),
		$precent(){
			let duration = this.$play.duration/1000;
			return Math.min(1, this.$store.state.currentTime/duration);
		}

	},
	methods:{
		showList(){
			Bus.$emit('showList');
		},
		play(){
			this.$refs.audio && this.$refs.audio.paused && this.$refs.audio.play();
			this.$store.state.states = "playing";
			Bus.$emit('playing');
		},
		pause(){
			this.$refs.audio && this.$refs.audio.played && this.$refs.audio.pause();
			this.$store.state.states = "paused";
		},
		setTime(){
			this.$store.state.currentTime = this.$refs.audio && this.$refs.audio.currentTime;
			localStorage.setItem('current'+this.id, this.$store.state.currentTime);
		},
		end(){
			this.$store.state.states = 'paused';
			localStorage.removeItem('current'+this.id);
			this.switch(1);
		},
		switch(num){
			let currentIndex = this.$store.state.currentIndex;
			let length = this.$store.state.songs.length;
			if(this.$store.state.type == '列表循环'){
				console.log('列表循环');
				if(num>0){
					if(length-1 == currentIndex){
						this.$store.state.currentIndex = 0;
					}else{
						this.$store.state.currentIndex ++;
					}
				}else{
					this.$store.state.currentIndex --;
				}
			}else if(this.$store.state.type == '随机播放'){
				console.log('随机播放');
				let random = Math.floor(Math.random()*length);
				if(random == currentIndex){
					random = random+1;
					if(random >= length-1) random = 0;
				}
				this.$store.state.currentIndex = random;
			}else{
				console.log('单曲循环');
				let song = clone(this.$store.state.songs[currentIndex]);
				this.$store.state.songs.splice(currentIndex, 1, song);
			}
		},
		async getLyric(){

            this.$store.state.lyric = [];
            let res =  await getLyric(this.$play.id);

            let lyric = res.data.lrc.lyric;
            let arr = lyric.split('[');
            arr.splice(0,1);

            arr.forEach(a=>{
                this.$store.state.lyric.push(a.split(']'));
            })
            console.log(this.$store.state.lyric);
        }
	}, 
	watch: {
		// 监听播放歌曲变化.
		$play : function(){

			console.log('下一曲');

			this.$nextTick(()=>{
				if(this.isChange){
					this.play();
				}else{
					this.$refs.audio.currentTime = 0;
					this.play();
				}
				this.getLyric();
				this.isChange = false;
			});
			localStorage.setItem('songs', JSON.stringify(this.$store.state.songs));
		},
		$currentLength : function(){
			this.isChange = true;
		}

	},
	components:{
		cprogress
	},
	mounted(){
		if(this.$store.state.songs.length){
			this.$refs.audio.currentTime = Number(localStorage.getItem('current'+this.id)) || 0;
		};
		Bus.$on('play_music',()=>{
			this.$refs.audio && this.$refs.audio.paused && this.$refs.audio.play();
		});
		Bus.$on('pause_music',()=>{
			this.$refs.audio && this.$refs.audio.played && this.$refs.audio.pause();
		});
		Bus.$on('play_pre',()=>{
			this.switch(-1);
		});
		Bus.$on('play_next', ()=>{
			this.switch(1);
		});
		Bus.$on('setProgress',(time)=>{
			this.$refs.audio.currentTime = time;
		})
	},
	created(){
		this.getLyric();
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
