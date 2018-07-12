<template>
    <div class="manage">
    	<div class="swipe">
	    	<swiper :options="swiperOption" ref="mySwiper" class="mySwiper">
			    <swiper-slide v-for="item,i in banners" :key="i">
			    	<img :src="item.picUrl">
			    </swiper-slide>
			    <div class="swiper-pagination" slot="pagination"></div>
			</swiper>
    	</div>
    	<div class="catalog">
    		<div>
    			<div class="img person_img"></div>
    			<div class="tip">私人FM</div>
    		</div>
    		<div @click="$router.push('/rsongs')">
    			<div class="img recommend_img">
    				{{ date }}
    			</div>
    			<div class="tip">每日推荐</div>
    		</div>
    		<div @click="$router.push('/sheets')">
    			<div class="img sheet_img"></div>
    			<div class="tip">歌单</div>
    		</div>
    		<div>
    			<div class="img rank_img"></div>
    			<div class="tip">排行榜</div>
    		</div>
    	</div>
    	<div class="content">
    		<panel title="推荐歌单" :list="sheet" route="/music"></panel>
    		<panel title="独家放送" :list="specials" route="/music"  urlType="sPicUrl"></panel>
    		<panel title="推荐MV" :list="mvs" route="/music"  ></panel>
    		<panel title="主播电台" :list="radios" route="/music" urlType="coverUrl"></panel>
    		<panel title="最新音乐" :list="newSongs" route="/music" urlType="song"></panel>

    	</div>
    </div>
</template>

<script>
import { getImages, getSheet, getMvs      } from '../service/getData.js';
import { getNewSongs, getradios, getSpecials } from '../service/getData.js';

import panel from '../components/panel.vue';

export default {
	data(){
		return{
			banners   : [],
			date      : 1,
			sheet 	  : [],
			mvs 	  : [],
			radios 	  : [],
			specials  : [],
			newSongs  : [],	
			swiperOption:{
				autoplay : true,
				pagination: { el: '.swiper-pagination'},
			},
		}
	},
	methods:{
		async getImages(){
			try{
				let res = await getImages();
				this.banners = (res.data.code == 200) && res.data.banners || [];
			}catch(e){
				this.$toast('网络好像出现了问题哦!');
			}
		},
		async getSheet(){
			try{
				let res = await getSheet();
				this.sheet = (res.data.code == 200) && res.data.recommend || [];
				this.sheet = this.sheet.splice(0,3);
			}catch(e){
				this.$toast('网络好像出现了问题哦!');
			}
		},
		async getMvs(){
			try{
				let res = await getMvs();
				this.mvs = (res.data.code == 200) && res.data.result || [];
				this.mvs = this.mvs.splice(0,3);
			}catch(e){
				this.$toast('网络好像出现了问题哦!');
			}
		},
		async getradios(){
			try{
				let res = await getradios();
				this.radios = (res.data.code == 200) && res.data.programs || [];
				this.radios = this.radios.splice(0,3);
			}catch(e){
				this.$toast('网络好像出现了问题哦!');
			}
		},
		async getSpecials(){
			try{
				let res = await getSpecials();
				this.specials = (res.data.code == 200) && res.data.result || [];
				this.specials = this.specials.splice(0,3);
			}catch(e){
				this.$toast('网络好像出现了问题哦!');
			}
		},
		async getNewSongs(){
			try{
				let res = await getNewSongs();
				this.newSongs = (res.data.code == 200) && res.data.result || [];
				this.newSongs = this.newSongs.splice(0,3);
			}catch(e){
				this.$toast('网络好像出现了问题哦!');
			}
		}
	},
	mounted(){
		this.date = new Date().getDate();
		this.getImages();
		this.getSheet();
		this.getMvs();
		this.getradios();
		this.getSpecials();
		this.getNewSongs();
	},
	components:{
		panel
	}

}
</script>

<style scoped  lang="scss">
@import '../scss/mixin.scss';
@import '../scss/px2rem.scss';

.manage{
	height: 100%;
	overflow: scroll;
	.swipe{
		height: px2rem(300);
		.mySwiper{
			height: 100%;
			img{
				width: 100%;
				height: 100%;
			}
		}
	}
	.catalog{
		height: px2rem(220);
		@include flex(space-around);
		border-bottom: 1px solid $border;
		.img{
			width: px2rem(100);
			height: px2rem(100);
			border-radius: 50%;
			background-color: $bg;
			margin-left: px2rem(25);
			box-shadow: 10px 10px 50px rgba(0,0,0,.5);
		}
		.tip{
			font-size: px2rem(26);
			text-align: center;
			height: px2rem(60);
			line-height: px2rem(60);
		}
		.person_img{
			@include bg('../images/radio_w.svg');
			background-size: 50% 50%;
			background-position: center center;
		}
		.recommend_img{
			@include bg('../images/date.svg');
			background-size: 50% 50%;
			background-position: center center;
			color: white;
			font-size: px2rem(20);
			line-height: px2rem(100);
			text-align: center;
		}
		.sheet_img{
			@include bg('../images/music-menu.svg');
			background-size: 50% 50%;
			background-position: center center;
		}
		.rank_img{
			@include bg('../images/rank.svg');
			background-size: 50% 50%;
			background-position: center center;
		}
	}
	.catalog>div{
		width: px2rem(150);
		text-align: center;
	}
	
}

</style>
