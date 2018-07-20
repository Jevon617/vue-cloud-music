<template>
    <div class="sheet" ref="sheet" :class="{ padding : !$store.state.songs.length}">

    	<heador bgColor="#703f3f">
    		<div slot="middle">{{show && playlist.name || '歌单'}}</div>
    		<div slot="right" class='icons'>
    			<div class="search"></div>
    			<div class="more"></div>
    		</div>
    	</heador>

    	<div class="banner" ref="banner">

    		<div class="info" v-if="JSON.stringify(playlist) != '{}'">
    			<div class="img" :style="{backgroundImage:'url('+playlist.coverImgUrl+')'}">
    			</div>
	    		<div class="right">
	    			<div class="title">
						<span class="title">{{playlist.name}}</span>
	    			</div>
	    			<div class="author">
	    				<span class="headImg" 
	    				     :style="{ backgroundImage:'url('+playlist.creator.avatarUrl+')'}">
	    				</span>
	    				<span class="name">{{playlist.creator.nickname }}</span>
	    				<span class="icon"></span>
	    			</div>
		    	</div>
    		</div>

    		<button-group :playlist="playlist" @goComment="goComment" @goCheck="goCheck">
    			
    		</button-group>
    	</div>
    	
    	<song-list :songs="songs"></song-list>
    </div>
</template>

<script>

import { getSheetDetail, getRankList } from '../service/getData.js';
import songList           from '../components/song-list.vue';
import buttonGroup 		  from '../components/button-group.vue';
import heador  			  from '../components/common/header.vue';

export default {
	data(){
		return{
			songs : [],
			playlist : {},
			show : false
		}
	},
	created(){
		this.getSheetDetail();
	},
	mounted(){
		this.showName();
	},
	methods:{
		async getSheetDetail(){
			try{
				let res = null;
				if(this.$route.query.id){
					res = await getSheetDetail(this.$route.query.id);
				}else{
					res = await getRankList(this.$route.query.idx);
				}
				this.songs = (res.data.code == 200) && res.data.playlist.tracks || [];
				this.playlist = (res.data.code == 200) && res.data.playlist || {};
				console.log(this.playlist);
			}catch(e){
				this.$toast('网络好像出现了问题哦!');
			}
		},
		goComment(){
			this.$router.push({
				path : '/comment',
				query:{
					id       : this.playlist.id,
					url      : this.playlist.coverImgUrl,
					nickname : this.playlist.creator.nickname,
					tip      : this.playlist.name,
					type     : 'playlist'
				}
			})
		},
		goCheck(){
			this.$router.push({
				name : 'check',
				params: {songs:this.songs}
			});
		},
		showName(){
			let sheet = this.$refs.sheet;
			sheet.addEventListener('scroll',(e)=>{
				if(sheet.scrollTop>=this.$refs.banner.clientHeight){
					this.show = true;
				}else{
					this.show = false;
				}
			})
		}
	},
	components:{
		heador,
		songList,
		buttonGroup
	}
    
}
</script>

<style scoped  lang="scss">
@import "../scss/mixin.scss";

.sheet{
	height: 100%;
	overflow: hidden;
	position: relative;
	background-color: white;
	margin-top: px2rem(-2);
	overflow: scroll;

	.icons{
		@include flex(space-between);
	}

	.search{
		width: px2rem(50);
		height: px2rem(50);
		@include bg("../images/search.svg");
	}

	.more{
		width: px2rem(50);
		height: px2rem(50);
		@include bg("../images/more_g.svg");
	}

	.banner{
		background-color: rgb(112, 63, 63);
		color: white;

		.info{
			height: px2rem(300);
			@include flex();
			.img{
				width: px2rem(250);
				height: px2rem(250);
				border-radius: px2rem(8);
				background-repeat: no-repeat;
				background-size: 100% 100%;
				margin:px2rem(20) px2rem(20) 0;
			}
		}

		.right{
			@include prix(flex, 1);
		}

		.title{
			font-size: px2rem(36);
			line-height: px2rem(60);
			width: 90%;
			font-size: px2rem(32);
			margin-bottom: px2rem(20);
			min-height: px2rem(100);
		}

		.author{
			width: 90%;
			font-size: px2rem(24);
			@include flex;
			span{
				display: inline-block;
			}
			.headImg{
				height: px2rem(60);
				width: px2rem(60);
				border-radius: 50%;
				background-size: 100% 100%;
				margin-right: px2rem(20);
			}
			.icon{
				width: px2rem(28);
				height: px2rem(28);
				@include bg('../images/goto_b.svg');
			}
		}
	}
}
.padding{
	@include padding(px2rem(120) 0 0 0);
}

</style>
