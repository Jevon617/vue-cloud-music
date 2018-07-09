<template>
	<div class="list_box" >
		<div class="bg" @click="hideList" v-show="show"></div>
		<transition name="flist" >
		    <div class="funlist"  v-show="show" v-if="JSON.stringify(song) != '{}'">
		    	<div class="title">
		    		歌曲:　{{ song.name }}
		    	</div>
		    	<div class="list">
		    		<item :border="true" v-for="item,i in list" :key="i" >
						<div slot="left" class="img"
						     :style="{ background: 'url(' +item.url +') no-repeat',
						               backgroundSize: '50% 50%',
						               backgroundPosition: 'center center'}">
						</div>
						<div slot="right" class="word" @click="item.func">
								{{ item.name }} 
							<span v-show="i == 5" style="color: black" >
								{{song.artists[0].name}} 
							</span>
							<span v-show="i == 6" style="color: black">
							    {{song.album.name}} 
							</span>
						</div>
					</item>
		    	</div>
		    </div>
	    </transition>
	</div>
	
	
</template>

<script>
import item from './common/item.vue';
import { clone } from '../service/utlis.js';

export default {
	data(){
		return{
			show : false,
			list : [
				{ name : '下一首播放' , url : 'static/play.svg'     , func : this.addNext    },
				{ name : '收藏到歌单' , url : 'static/add.svg'  	  , func : this.collect    },
				{ name : '下载'      , url : 'static/download.svg' , func : this.downLoad   },
				{ name : '评论'		, url : 'static/comment.svg'  , func : this.getComment },
				{ name : '分享'		, url : 'static/share.svg' 	  , func : this.share 	   },
				{ name : '歌手:'		, url : 'static/artist.svg'   , func : this.getSinger  },
				{ name : '专辑:'		, url : 'static/pan.svg'      , func : this.getAlbum   },
				{ name : '查看视频'	, url : 'static/video.svg'    , func : this.getMv      },
				{ name : '不感兴趣'	, url : 'static/stop.svg'     , func : this.del        }
			]
		}
	},
	props : {
		song:{
			type : Object,
			default : ()=>{
				return {};
			}
		}
	},
	methods:{
		showList(){
			this.show = true;
		},
		hideList(){
			this.show = false;
		},
		addNext(){
			let song = clone(this.song);
			song.play =  false;
			this.$store.commit('addSongs', { song:song, next:true });
			this.show = false;
		},
		downLoad(){
			console.log('download');
		},
		collect(){
			console.log('collect');
		},
		getComment(){
			console.log('comment');
		},
		share(){
			console.log('share');
		},
		getSinger(){
			console.log('singer');
		},
		getAlbum(){
			console.log('album');
		},
		getMv(){
			console.log('mv');
		},
		del(){
			console.log('不感兴趣');
		}
	},
	components:{
		item
	}
    
}
</script>

<style scoped  lang="scss">
@import "../scss/mixin.scss";
@import "../scss/px2rem.scss";

.bg{
	width: 100%;
	height: 100vh;
	background-color: rgba(0,0,0,.5);
	position: fixed;
	bottom: 0;
	z-index: 15;
}

.flist-enter-active, .flist-leave-active{
	transition: all .2s ease-in;
}
.flist-enter, .flist-leave-active{
	transform:translateY(100%);
}

.on{
	color: $bg !important;
}

.funlist{
	height: px2rem(767);
	width: 100%;
	background-color: white;
	border-top-left-radius: px2rem(20);
	border-top-right-radius: px2rem(20);
	position: fixed;
	bottom: 0;
	z-index:15;
	font-size: px2rem(28);
	.title{
		width: 100%;
		border-top-left-radius: px2rem(20);
		border-top-right-radius: px2rem(20);
		height: px2rem(120);
		line-height: px2rem(120);
		@include padding(0 0 0 px2rem(30));
		font-size: px2rem(30);
		color: gray;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.list{
		height: px2rem(640);
		overflow: scroll;
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
	}
	
}

</style>
