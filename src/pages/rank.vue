<template>
    <div class="rank" :class="{ padding : !$store.state.songs.length}">
    	<heador>
    		<div slot="middle">排行榜</div>
    	</heador>
    	<rank-item  v-for="item, index in rankList"
    			    :info="item" :key="index"
    			    @goDetail="goDetail(index)"></rank-item>
    </div>
</template>

<script>

import rankItem from '../components/rank-item.vue';
import heador   from '../components/common/header.vue';
import { getRankList } from '../service/getData.js';


export default {
	
	data(){
		return{
			rankList : [],
			list     : [0,1,2,3,4]
		}
	},
	methods:{
		async getRankList(idx){
			let res = await getRankList(idx);
			let rankItem = {};
			if(res.data.code == 200){
				rankItem.url = res.data.playlist.coverImgUrl;
				rankItem.songs = res.data.playlist.tracks.splice(0,3);
				this.rankList.push(rankItem);
			}
		},
		goDetail(index){
			this.$router.push('/sheet?idx=' + index);
		}
	},
	created(){
		this.list.forEach(l=>{
			this.getRankList(l);
		})
	},
	components : {
		rankItem,
		heador
	}
}
</script>

<style scoped  lang="scss">
@import '../scss/mixin.scss';
.rank{
	height: 100%;
	overflow: scroll;
	position: relative;
	z-index: 20;
}
.padding{
	@include padding(px2rem(120) 0 0 0);
}

</style>
