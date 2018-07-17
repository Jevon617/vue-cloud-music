<template>
    <div class="sheet" :class="{ padding : !$store.state.songs.length}">

    	<heador bgColor="#703f3f">
    		<div slot="middle">歌单</div>
    		<div slot="right" class='icons'>
    			<div class="search"></div>
    			<div class="more"></div>
    		</div>
    	</heador>

    	<div class="banner">

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

    		<div class="btns">
                <div class="comment" @click="goComment">
                	<div class="icon"></div>
                	<div class="word">{{playlist.commentCount}}</div>
                </div>
                <div class="share">
                	<div class="icon"></div>
                	<div class="word">分享</div>
                </div>
                <div class="download">
                	<div class="icon"></div>
                	<div class="word">下载</div>
                </div>
                <div class="choose">
                	<div class="icon"></div>
                	<div class="word">多选</div>
                </div>
            </div>

    	</div>
    	<div class="content">
    		<div class="menu">
    			<div class="playall" @click="addSongs()">
    				<div class="play"></div>
    				<div class="btn">播放全部 <span class="all">(共{{songs.length}}首)</span></div>
    			</div>
    			<div class="collect">
    				<span class="add">+</span> 收藏 (584)
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
    </div>
</template>

<script>

import { getSheetDetail } from '../service/getData.js';
import heador  from '../components/common/header.vue';
import mitem from '../components/music-item.vue';
import { clone } from '../service/utlis.js';

export default {
	data(){
		return{
			songs : [],
			playlist : {}
		}
	},
	created(){
		this.getSheetDetail();
	},
	methods:{
		async getSheetDetail(){
			try{
				let res = await getSheetDetail(this.$route.query.id);
				this.songs = (res.data.code == 200) && res.data.playlist.tracks || [];
				this.playlist = (res.data.code == 200) && res.data.playlist || {};
				console.log(this.playlist);
			}catch(e){
				this.$toast('网络好像出现了问题哦!');
			}
		},
		addSongs(index=1){
			let songs = clone(this.songs);
			let i = Number(index)-1;
			this.$store.commit('addSongs', {song:songs, recommend:true, index : i});
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
		}
	},
	components:{
		heador,
		mitem
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

		.btns{
            width: px2rem(650);
            height: px2rem(150);
            @include flex(space-between);
            margin: 0 auto;
            div{
                width: px2rem(120);
                height: px2rem(120);
            }
            .word{
            	height: px2rem(70);
            	font-size: px2rem(24);
            	text-align: center;
            	line-height: px2rem(70);
            }
            .share>.icon{
            	@include bg('../images/share_b.svg');
				height: px2rem(50);
            }
            .download>.icon{
				@include bg('../images/download_b.svg');
				height: px2rem(50);
            }
            .comment>.icon{
                @include bg('../images/comment.svg');
				height: px2rem(50);
            }
            .choose>.icon{
                @include bg('../images/choose.svg');
                height: px2rem(50);
            }
        }	

	}

	.content{
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
}
.padding{
	@include padding(px2rem(120) 0 0 0);
}

</style>
