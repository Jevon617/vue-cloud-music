<template>
    <div class="highquality" :class="{ padding : !$store.state.songs.length}">
    	<heador>
    		<div slot="middle">精品歌单</div>
    	</heador>	
    	<scroll class="wrapper" ref="mscroll"
		        :pullUpLoad="true" :probeType=3 
		        :scrollbar="true" :list="fineSheet" 
		        :click="true"
		        @pullingUp="getFineSheet">

		    <div slot="content">
		    	<sheet-item v-for="item,index in fineSheet" 
		    	            :playlist="item" :key="index"></sheet-item>
		    </div>
			<img class="loading" slot="pullUping" src="../../static/loading.gif">
    	</scroll>
    </div>
</template>

<script>
import heador from '../components/common/header.vue';
import sItem  from '../components/sheet-item.vue';
import scroll from '../components/common/scroll.vue';
import { getFineSheet } from '../service/getData.js';

export default {
	data(){
		return{
			fineSheet : [],
			count     : 20
		}
	},
	mounted(){
		this.getFineSheet();
	},
	methods:{
		async getFineSheet(){
			try{
				let res = await getFineSheet(this.count);
				this.fineSheet = (res.data.code == 200) && res.data.playlists || [];
				this.count += 20;
			}catch(e){
				this.$refs.mscroll.finishPullUp();
				this.$toast('网络好像出现了问题哦!');
			}
		}
	},
    components:{
    	heador,
    	sheetItem : sItem,
    	scroll
    }
}
</script>

<style scoped  lang="scss">
@import '../scss/mixin.scss';

.highquality{
	height: 100%;
	overflow: hidden;
	position: relative;
	background-color: white;
	z-index: 8;
	.wrapper{
		height: 100%;
		overflow: scroll;
		@include padding(px2rem(8) 0);
	}
	.loading{
		width: px2rem(50);
		height: px2rem(50);
	}
}

</style>
