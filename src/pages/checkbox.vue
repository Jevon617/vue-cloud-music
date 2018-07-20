<template>
    <div class="checkbox">
    	<heador>
    		<div slot="middle">已选择{{ $selected }}项</div>
    		<div slot="right" style="text-align: right">
    			<div @click="selectAll" v-if="!$selectAll">全选</div>
    			<div @click="cancel" v-else>取消全选</div>
    		</div>
    	</heador>
    	<check-item v-for="item,index in songs" :song="item" :key="index"></check-item>
    	<div class="btn">
    		<div class="playnext" @click='addNext'>
	        	<i class="iconfont icon-play"></i>
	        	<div class="word">下一首播放</div>
	        </div>
	        <div class="add">
	        	<i class="iconfont icon-add"></i>
	        	<div class="word">加入歌单</div>
	        </div>
	        <div class="download">
	        	<i class="iconfont icon-download"></i>
	        	<div class="word">下载</div>
	        </div>
    	</div>
    </div>
</template>

<script>

import checkItem from '../components/check-item.vue';
import heador    from '../components/common/header.vue';

export default {
	data(){
		return{
			songs         : [],
			selectedSongs : []
		}
	},
	created(){
		if(!this.$route.params.songs) return this.$router.go(-1);
		this.songs = this.$route.params.songs;
		this.songs.forEach(s=>{
			this.$set(s, 'select', false);
		});
	},
	methods:{
		selectAll(){
			this.songs.map(s=>{
				return s.select = true;
			})
		},
		cancel(){
			this.songs.map(s=>{
				return s.select = false;
			})
		},
		addNext(){
			if(!this.selectedSongs.length) return this.$toast('您还未选择任何一项');
			this.$store.commit('addSongs',
		    	{ arrNext : this.selectedSongs },this.$router.go(-1));
		}
	},
	computed:{
		$selected(){
			let count = 0;
			this.songs && this.songs.forEach(s=>{
				s.select && count ++;
				s.select && this.selectedSongs.push(s);
			});
			return count;
		},
		$selectAll(){
			let selectAll = true;
			this.songs && this.songs.forEach(s=>{
				if(!s.select) selectAll = false;
			});
			return selectAll;
		}
	},
	components:{
		checkItem,
		heador
	}
}
</script>

<style scoped  lang="scss">
@import '../scss/mixin.scss';
.checkbox{
	z-index: 15;
	height: 100%;
	overflow: scroll;
	position: relative;
	background-color: #fcfcfc;
	@include padding(px2rem(120) 0);
}
.btn{
	left: 0;
	bottom: 0;
	width: 100%;
	position: fixed;
	height: px2rem(120);
	background-color: white;
	@include flex(space-around);
	div{
		width: 30%;
		height: 100%;
		color: gray;
		text-align: center;
		@include flex(space-around, column);
	}
	i{
		color: black;
		font-size: px2rem(60);
		display: inline-block;
	}
	.word{
		width: 100%;
		text-align: center;
		font-size: px2rem(20);
	}
}


</style>
