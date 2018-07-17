<template>
	<transition name="suggest">
	    <div class="suggest" v-show="show && keywords">
			<div class="first" @click="search" >
				搜索 "{{keywords}}"
			</div>
			<div v-for="item in suggest">
				<div v-for="v,k in item" class="list">
					<div class="name">{{ map[k] }}</div>
					<div class="item" v-for="s in v">
						<div v-if="k == 'songs'" @click="addsong(s)">
							<i class="iconfont icon-search"></i>
							{{ s.name }} - {{ s.artists[0].name }}
						</div>
						<div v-if="k == 'mvs'">
							<i class="iconfont icon-search"></i>
							{{ s.name }} - {{ s.artistName }}
						</div>
						<div v-if="k == 'albums'">
							<i class="iconfont icon-search"></i>
							{{ s.name }}
						</div>
						<div v-if="k == 'artists'">
							<i class="iconfont icon-search"></i>
							{{ s.name }}
						</div>
						<div v-if="k == 'playlists'" @click="goPage('/sheet',s.id)">
							<i class="iconfont icon-search"></i>
							{{ s.name }}
						</div>

					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>

import { clone } from '../service/utlis.js';
import { getAlbum } from '../service/getData.js';

export default {
	data(){
		return{
			map : {songs:'音乐', artists : '歌手', albums : '专辑', mvs : 'mv',playlists :'歌单'},
			show : false
		}
	},
	props:{
		keywords : {
			type : String,
			default : ""
		},

		suggest  : {
			type : Array,
			default : ()=>{
				return [];
			}
		}
	},
	methods:{
		async addsong(song){
			let s = clone(song);
			// 解决建议中的歌曲没有专辑图片问题
			let res = await getAlbum(song.album.id);
			s.album.picUrl = res.data.code == 200 && res.data.album.picUrl || '';
			this.$store.commit('addSongs', { song : s })
		},
		goPage(path,id){
			this.$router.push({ path, query:{ id } });
		},
		search(){
			this.$emit('search');
		}
	}
    
}
</script>

<style scoped  lang="scss">
@import '../scss/mixin.scss';

.suggest{
	position: fixed;
	top: px2rem(120);
	left: 50%;
	width: 90%;
	height: 80vh;
	z-index: 16;
	font-size: px2rem(30);
	background-color: #f8f8f8;
	@include prix(transform, translateX(-50%));
	box-shadow: 0 px2rem(10) px2rem(50) px2rem(5) gray;
	overflow: scroll;
	transition : all .3s;
	.list{
		div{
			width: 100%;
			height: px2rem(90);
			line-height: px2rem(90);
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
			@include padding(0 px2rem(30));
			border-bottom: px2rem(1) solid #ccc;
		}
		.name{
			background-color: #f2f2f2;
		}
	}
	
	.first{
		color: #3777e4;
		width: 100%;
		height: px2rem(90);
		line-height: px2rem(90);
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		@include padding(0 px2rem(30));
		border-bottom: px2rem(1) solid #ccc;
	}
	.icon-search{
		font-size: px2rem(40);
		color: #ccc;
	}
}
.suggest-enter{
	opacity : 1;
}
.suggest-leave-active{
	opacity: 0;
}

</style>
