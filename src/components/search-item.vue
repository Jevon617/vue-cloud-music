<template>
    <div class="search-item" @click="go">
    	<!-- 添加key可以解决url改变,图片不加载的bug -->
    	<img v-lazy="url" :key="url" alt="" >
    	<div class="middle">
    		<div class="title">{{ title }}</div>
    		<div class="author">{{ author }}</div>
    	</div>
    	<div class="right" v-if="show" @click="more">
    		<i class="iconfont icon-more"></i>
    	</div>
    </div>
</template>

<script>
export default {
	props:{
		url : {
			type : String,
			default : ''
		},
		title : {
			type : String,
			default : ''
		},
		author : {
			type : String,
			default : ''
		},
		show : {
			type : Boolean,
			default : false
		}
	},
	methods:{
		go(){
			this.$emit('go')
		},
		more(e){
			this.$emit('more',e);
		}
	}
    
}
</script>

<style scoped  lang="scss">
@import '../scss/mixin.scss';

.search-item{
	height: px2rem(140);
	@include flex;
	@include padding(0 0 0 px2rem(10));
	img{
		width: px2rem(120);
		height: px2rem(120);
		border-radius: px2rem(5);
		margin-right: px2rem(10);
	}
	.middle{
		height : px2rem(140);
		@include flex(center, column);
		border-bottom: px2rem(1) solid #ccc;
		@include prix(flex, 1);
		text-align: left;
		margin-left: px2rem(10);
		.title{
			width: 100%;
			height: px2rem(80);
			line-height: px2rem(80);
			font-size: px2rem(26);
			overflow: hidden;
		}
		.author{
			width: 100%;
			font-size: px2rem(20);
			color: gray;
		}
	}
	.right{
		color: #888;
		width: px2rem(60);
		height: px2rem(140);
		line-height: px2rem(140);
		border-bottom: px2rem(1) solid #ccc;
	}
	i{
		font-size: px2rem(36);
	}
}

</style>
