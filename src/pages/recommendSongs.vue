<template>
    <div class="rSongs">
    	<heador>
    		<div slot="middle">每日推荐</div>
    	</heador>
    	<div class="content">

    		<div class="banner">
    			<div class="date">{{ date }}</div>
    			<div class="tip">根据您的音乐口味生成,每天6:00更新</div>
    		</div>

    		<div class="list">

    			<div class="menu">
    				<div class="play"></div>
    				<div class="playall">播放全部</div>
    				<div class="choose">
    					<span class="icon"></span>
    					<span >多选</span>
    				</div>
    			</div>

    			<div class="items">
    				<mitem v-for="item, index in songs"
    				  	   :index="String(index+1).length == 1 && '0' + String(index+1)
    				  	        || String(index+1)"
    				       :key="index" :song="item"
    				       v-on:addSongs="addSongs"></mitem>
    			</div>

    		</div>
    	</div>
    </div>

</template>

<script>
import heador from '../components/common/header.vue';
import mitem from '../components/music-item.vue';
import { getDaySongs } from '../service/getData.js';
import { clone } from '../service/utlis.js';

export default {
	data(){
		return{
			date  : "",
			songs : []
		}
	},
	methods:{
		async getDaySongs(){
			try{
				let res = await getDaySongs();
				this.songs = res.data.code == 200 && res.data.recommend || [];
				
			}catch(e){
				this.$toast('您的网络出现问题了哦');
			}
		},
		addSongs(index){

			let songs = clone(this.songs);
			let i = Number(index)-1;
			this.$store.commit('addSongs', {song:songs, recommend:true, index : i});
		}
	},
	components:{	
		heador,
		mitem
	},
	mounted(){
		this.date = new Date().getDate();
		this.getDaySongs();
		
	}
    
}
</script>

<style scoped  lang="scss">
@import '../scss/mixin.scss';
@import '../scss/px2rem.scss';

.rSongs{
	width: 100%;
	height: 100%;
	background-color: white;
	overflow: scroll;
	.banner{
		height: px2rem(400);
		@include bg('../images/banner1.jpg');
		color: white;
		position: relative;
		.date{
			width: px2rem(160);
			height: px2rem(160);
			@include bg('../images/date_b.svg');
			text-align: center;
			line-height: px2rem(170);
			font-size: px2rem(56);
			position: absolute;
			left: px2rem(60);
			top: 50%;
			transform: translateY(-50%);
		}
		.tip{
			position: absolute;
			font-size: px2rem(24);
			bottom: px2rem(60);
			left: px2rem(60);
			line-height: px2rem(30);

		}
	}
	
	.menu{
		height: px2rem(120);
		line-height: px2rem(120);
		@include flex(space-between);
		border-bottom: px2rem(2) solid #ccc;

		.play{
			width: px2rem(120);
			height: px2rem(120);
			@include bg('../images/play_b.svg');
			background-size: 40% 40%;
			background-position: center center;
		}
		.playall{
			font-size: px2rem(36);
			height: 100%;
			line-height: px2rem(120);
			@include prix(flex, 1);

		}
		.choose{
			height: 100%;
			width: px2rem(120);
			@include flex(space-around);
			font-size: px2rem(26);
			padding :0 px2rem(20) 0 0;
			.icon{
				@include bg('../images/catalog_b.svg');
				display: inline-block;
				width: px2rem(40);
				height: px2rem(40);
			}
		}
	}

}




</style>
