<template>
    <div class="search-item">
    	<!-- 添加key可以解决url改变,图片不加载的bug -->
    	<img v-lazy="url" :key="url" alt="" >
    	<div class="right">
    		<div class="title">{{ title }}</div>
    		<div class="author">{{ author }}</div>
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
	.right{
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
}

</style>
