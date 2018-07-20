<template>
    <div class="search-content">
    	<div class="swipe">
    		<div v-for="item in menus"
    			 @click="type = item.type" 
    		     :class="{ on : type == item.type }">
    			{{ item.name }}
    		</div>
    	</div>
    	<div class="main">
			<scroll class="wrapper"    ref="mscroll"
		        	:pullUpLoad="true" :probeType=3 
		        	:scrollbar="true"  :list="map['$'+type].list" 
		        	:click="true"      
		        	@pullingUp="search(type)">
				
	    		<div class="song"  slot="content"
	    			 v-if="map['$'+1].list.length && type == '1'">

	    			<music-item v-for="item,index in map['$'+type].list"
	    					    :song="item"  :key="index">
	    			</music-item>
	    		</div>

	    		<div class="album" slot="content"
	    			 v-if="map['$'+10].list.length && type == '10'">

	    			<search-item v-for="item, index in map['$'+type].list"
	    						 :title="item.name" :key="index"
	    			             :url="item.blurPicUrl"
	    			             :author="map['$'+type].list[0].name 
	    			             + '　' + parseDate(item.publishTime)">
	    			</search-item>
	    			
	    		</div>

	    		<div class="singer" slot="content"
	    			 v-if="map['$'+100].list.length && type == '100'">

	    			<search-item v-for="item, index in map['$'+type].list"
	    						 :url="item.picUrl" :key="index"
	    						 :title="item.name">
					</search-item>

	    		</div>

	    		<div class="mvs" slot="content"
	    		 	 v-if="map['$'+1004].list.length && type == '1004'">

	    			<div class="mv" v-for="item, index in map['$'+type].list" :key="index">
	    				<img v-lazy="item.cover" alt="">
	    				<div class="right">
	    					<div class="title">{{item.name}}</div>
	    					<div class="author">
	    						{{ s2m(item.duration/1000) }} by {{ item.artistName }}
	    					</div>
	    				</div>
	    			</div>
	    		</div>

	    		<div class="playlist"  slot="content"
	    			 v-if="map['$'+1000].list.length && type == '1000'">

	    			<search-item v-for="item,index in map['$'+type].list" :key="index" 
	    			             :url="item.coverImgUrl"
	    			             :title="item.name"
	    			             :author="map['$'+type].list.length + '首　by　'
	    			             + item.creator.nickname + ', 播放' + item.playCount  + '次'">
	    			</search-item>

	    		</div>
				<img class="loading" slot="pullUping" src="../../static/loading.gif">
			</scroll>
    	</div>
    </div>
</template>

<script>
import mitem       	 from './music-item.vue';
import searchItem 	 from './search-item.vue';
import scroll        from './common/scroll.vue';
import { search } 	 from '../service/getData.js';
import { parseDate,s2m } from '../service/utlis.js';

export default {
	components:{
		musicItem : mitem,
		searchItem ,
		scroll
	},
	data(){
		return{
			type  	  : '1',
			isChange  : false,			
			map       : {},
			menus     : [
				{ type : '1'	, name : '歌曲', limit : 30, list : [] },
				{ type : '1004' , name : '视频', limit : 30, list : [] },
				{ type : '100'	, name : '歌手', limit : 30, list : [] },
				{ type : '10'	, name : '专辑', limit : 30, list : [] },
				{ type : '1000' , name : '歌单', limit : 30, list : [] }
			]
		}
	},
	created(){
		this.menus.forEach(m=>{
			this.map['$'+m.type] = m; 
		});
	},
	props:{
		keywords : {
			type : String,
			default : ''
		}
	},
	methods:{
		async search(){
			try{
				if(!this.keywords) return;

				let res = await search(this.keywords,this.map['$'+this.type].limit,this.type);
				if(res.data.code == 200){

					this.map['$'+this.type].list = res.data.result.songs 
						|| res.data.result.mvs
						|| res.data.result.albums
				    	|| res.data.result.artists
				    	|| res.data.result.playlists || [];

					this.map['$'+this.type].limit += 30;
				}else{
					this.$refs.mscroll.finishPullUp();
				}
			}catch(e){
				this.$toast('您的网络好像出错了哦')
			}
		},

		parseDate(timeStamp){
			return parseDate(timeStamp);
		},
		s2m(s){
			return s2m(s);
		},
		// 切换搜索词需要重置整个menus, 防止缓存.
		reset(){
			this.menus.forEach(m=>{
				m.list = [];
				m.limit = 30;
			})
		}

	},
	watch:{
		type(){
			!this.map['$'+this.type].list.length && this.search();
		}
	}
    
}
</script>

<style scoped  lang="scss">
@import '../scss/mixin.scss';
.search-content{
	height: 100%;
	@include flex(center, column);
	.main{
		@include prix(flex, 1);
		overflow: hidden;
		width: 100%;
	}
}
.swipe{
	width: 100%;
	color: white;
	height: px2rem(80);
	background-color: $bg;
	@include flex(space-around);
	div{
		width: 10%;
		height: px2rem(60);
		text-align: center;
		line-height: px2rem(60);
		font-size: px2rem(26);
	}
	.on{
		border-bottom: px2rem(4) solid white;
	}
}
.wrapper{
	height: 100%;
	overflow: scroll;
}
.loading{
	width: px2rem(50);
	height: px2rem(50);
}
.song{
	@include padding(0 0 0 px2rem(10));
}
.mv{
	@include flex;
	height: px2rem(180);
	@include padding(0 0 0 px2rem(10));
	img{
		width: px2rem(220);
		height: px2rem(150);
		border-radius: px2rem(5);
		margin-right: px2rem(20);
	}
	.right{
		color: gray;
		@include prix(flex, 1);
		@include flex(center, column);
		.title{
			width: 100%;
			color: black;
			font-size: px2rem(26);
			line-height: px2rem(50);
		}
		.author{
			width: 100%;
			font-size: px2rem(20);
		}
	}
}




</style>
