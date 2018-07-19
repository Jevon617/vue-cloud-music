<template>
    <div class="music">
		<div class="list">
			<item >
				<div slot="left" class="img music_r"></div>
				<div slot="right" class="word">本地音乐 <span>(0)</span></div>
			</item>
			<item>
				<div slot="left" class="img play"></div>
				<div slot="right" class="word">最近播放 <span>(0)</span></div>
			</item>
			<item>
				<div slot="left" class="img download"></div>
				<div slot="right" class="word">下载管理 <span>(0)</span></div>
			</item>
			<item>
				<div slot="left" class="img radio"></div>
				<div slot="right" class="word">我的电台 <span>(0)</span></div>
			</item>
			<item>
				<div slot="left" class="img collection"></div>
				<div slot="right" class="word">我的收藏 <span>(0)</span></div>
			</item>
		</div>
		<div class="sheet">
			<div class="menu" @click="show = !show">
				<span class="icon" :class="{ 'icon1' : show }"></span>
				<span class="word">创建的歌单({{playlist.length}})</span>
				<i class="iconfont icon-setup" @click="bulidSheet"></i>
			</div>
			<div class="content" v-show="show">
				<item :border="true" :height="120" v-for="item, index in playlist" :key="index">
					<img slot="left" class="img1 love" :src="item.coverImgUrl"/>
					
					<div slot="right" class="word word1">
						{{ index == 0 && '我喜欢的音乐' || item.name }} 
						<span>({{ item.trackCount }})</span>
					</div>
				</item>
			</div>
		</div>
    	
    </div>
</template>

<script>

import item from '../components/common/item.vue';
import { getPersonalSheet, bulidSheet, updateSheet} from '../service/getData.js';

export default {
	data(){
		return{
			show : true,
			playlist : []
		}
		
	},
	mounted(){
		this.getPersonalSheet();
	},
	methods:{
		async getPersonalSheet(){
			try{
				let uid = JSON.parse(localStorage.getItem('userInfo')).id;
				let res = await getPersonalSheet(uid);
				this.playlist = res.data.code == 200 && res.data.playlist || [];
				console.log(this.playlist);

			}catch(e){
				this.$toast('你的网络好像出现了问题哦');
			}
		},
		async bulidSheet(e){
			e.stopPropagation();
			try{
				let res = await bulidSheet('回忆里的青春');
				if(res.data.code == 200){
					let playlist = res.data.playlist;
					let result = await updateSheet(
						res.data.id,playlist.name,playlist.description, playlist.tags);
					console.log(result);
					result.data.code == 200 && this.getPersonalSheet();
				} 
			}catch(e){
				this.$toast('你的网络好像出现了问题哦');
			}
		}

	},
	components:{
		item
	}
    
}

</script>


<style scoped  lang="scss">
@import "../scss/mixin.scss";

.music{
	height: 100%;
	font-size: px2rem(32);
	overflow: scroll;
	.music_r{
		@include bg('../images/music_r.svg');
	}
	.play{
		@include bg('../images/play.svg');
	}
	.download{
		@include bg('../images/download.svg');
	}
	.radio{
		@include bg('../images/radio_r.svg');
	}
	.collection{
		@include bg('../images/collection.svg');
	}
	.img{
		width: 100%;
		height: 100%;
		background-size: 50% 50%;
		background-position: center center;
	}
	.word{
		height: 100%;
		@include flex;
		span{
			font-size: px2rem(28);
			color: gray;
			margin-left: px2rem(20);
		}
	}
	.sheet{
		margin-bottom: px2rem(16);
		.menu{
			height: px2rem(60);
			background-color: #f0eeee;
			@include flex();
			@include padding( 0 px2rem(30) );
			span{
				font-size: px2rem(24);
				color: gray;
				margin-right: px2rem(40);
			}
			.icon{
				display: inline-block;
				width: px2rem(30);
				height: px2rem(30);
				@include bg('../images/goto.svg');
				transition: transform .5s;
			}
			.icon1{
				transform: rotate(90deg);
			}
			.icon-setup{
				font-size: px2rem(28);
			}
			.word{
				@include prix(flex, 1);
			}
		}
		.img1{
			width: 90%;
			height: 90%;
			background-size: 60% 60%;
			background-position: center center;
			border-radius: px2rem(10);
		}
		.word1{
			padding-left: px2rem(10)
		}
	}
}


</style>
