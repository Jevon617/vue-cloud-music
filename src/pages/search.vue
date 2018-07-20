<template>
    <div class="search" :class="{ padding : !$store.state.songs.length}">
    	<header>
    		<div class="back" @click="$router.go(-1)"></div>
    		<div class="input">
    			<input type="text" placeholder="请输入关键字" v-model="keywords"
    			       @focus="showSuggest" @blur.prevent="hideSuggest"
    			       @keyup.enter="search">
    		</div>
    	</header>
    	<template v-if="!show">
	    	<div class="singer">
	    		<i class="iconfont icon-person man"></i>
	    		<span>歌手分类</span>
	    		<i class="iconfont icon-552cc1babd9aa go">	</i>
	    	</div>
	    	<div class="hot">
	    		<div class="title">热门搜索</div>
	    		<div class="btn" v-for="item,index in hots" @click="clickHot(item.first)">
	    	   		{{ item.first }} 
	    		</div>
	    		<div class="clear"></div>
	    	</div>

	    	<history :history="history" @del="del" @search="clickHot"></history>
    	</template>
    	<suggest :suggest="suggest" :keywords="keywords" @search="search"  ref="sug">
	    		
	    </suggest>

    	<search-content :keywords="keywords" v-if="show" ref="myContent"></search-content>
    </div>
</template>

<script>

import { getHots, getSuggest } from '../service/getData.js';
import history 	     from '../components/history.vue';
import suggest 		 from '../components/suggest.vue';
import searchContent from '../components/search-content.vue';


export default {
	components:{
		history,
		suggest,
		searchContent
	},
	data(){
		return{
			keywords : '',
			hots     : [],
			suggest  : [],
			show     : false,
			history  : JSON.parse(localStorage.getItem('search_history')) || []
		}
	},
	created(){
		this.getHots();
	},
	methods:{
		async getHots(){
			try{
				let res = await getHots();
				this.hots = (res.data.code == 200) && res.data.result.hots || [];
			}catch(e){
				this.$toast('网络好像出现了问题哦!');
			}
		},
		async getSuggest(){
			try{
				this.suggest = [];
				let res      = await getSuggest(this.keywords);
				let result   = res.data.result;

				if(res.data.code == 200){
					result.order && result.order.forEach(o=>{
						let item = {};
						item[o]  = result[o];
						this.suggest.push(item);
					})
				}
			}catch(e){
				this.$toast('网络好像出现了问题哦!');
			}
		},
		search(){
			this.show = true;
			this.$refs.sug.show = false;
			this.$nextTick(()=>{
				this.$refs.myContent.reset();
				this.$refs.myContent.search();
				if(this.history.includes(this.keywords)) return;
				this.history.unshift(this.keywords);
				this.history.length >= 6 && this.history.pop();
				localStorage.setItem('search_history', JSON.stringify(this.history));
			})
		},

		clickHot(word){
			this.keywords = word;
			this.search();
		},
		showSuggest(){
			this.$refs.sug.show = true;
		},

		hideSuggest(){
			this.$refs.sug.show = false;
		},
		del(index){
			this.history.splice(index, 1);
			localStorage.setItem('search_history', JSON.stringify(this.history));
		}
	},
	watch:{
		keywords(){
			this.getSuggest();
		}
	}
    
}
</script>

<style scoped  lang="scss">
@import '../scss/mixin.scss';

.search{
	z-index: 8;
	height: 100%;
	overflow: hidden;
	position: relative;
	background-color: white;
	header{
		top: 0;
		left: 0;
		width: 100%;
		@include flex;
		position: fixed;
		height: px2rem(120);
		background-color: $bg;
		@include padding(px2rem(20));
	}
	.back{
		width: px2rem(50);
		height: px2rem(50);
		margin:0 px2rem(25);
		@include bg("../images/back.svg");
	}
	.input{
		height: 100%;
		@include prix(flex, 1);
		border-bottom: px2rem(.5) solid #ccc;
		input{
			width: 100%;
			color: #eee;
			height: 100%;
			font-size: px2rem(30);
		}
		input::-webkit-input-placeholder{
			color: rgba(255,255,255,.3);
		}
	}
	.singer{
		width: 100%;
		height: px2rem(110);
		@include flex(center);
		font-size: px2rem(30);
		border-bottom: px2rem(.5) solid #ccc;
		.man{
			font-size: px2rem(60);
		}
		.go{
			font-size: px2rem(40);
		}
		span{
			margin: 0 px2rem(10);
		}
	}
	.hot{
		@include padding(px2rem(30) px2rem(20));
		.title{
			color: gray;
			height: px2rem(100);
			font-size: px2rem(24);
			line-height: px2rem(100);
		}
		.btn{
			float: left;
			font-size: px2rem(26);
			margin-right: px2rem(20);
			margin-bottom: px2rem(20);
			border-radius: px2rem(30);
			border: px2rem(1) solid #ccc;
			padding: px2rem(12) px2rem(20);
		}
		.clear{
			clear: both;
		}
	}
}

.padding{
	@include padding(px2rem(120) 0 0 0);
}

</style>
