<template>
    <div class="rank-item" @click="go">
    	<div class="left">
    		<div class="img" :style="{ backgroundImage : 'url('+ info.url +')' }"></div>
    		<div class="tip">每天更新</div>
    	</div>
    	<div class="right">
    		<div class="song" v-for="item,index in info.songs">
    			{{index+1}}.{{ item.name }}　－　 {{ item.ar[0].name }}
    		</div>
    	</div>
    </div>
</template>

<script>
export default {
    props:{
    	info : {
    		type : Object,
    		default : ()=>{
    			return {}
    		}
    	}
    },
    methods:{
    	go(){
    		this.$emit('goDetail');
    	}
    }
}
</script>

<style scoped  lang="scss">
@import '../scss/mixin.scss';

.rank-item{
	width: 100%;
	color: gray;
	@include flex;
	height: px2rem(250);
	font-size: px2rem(20);
	@include padding(px2rem(10) px2rem(20) 0 px2rem(10));
	.left{
		width: px2rem(250);
		height: px2rem(240);
		position: relative;
		margin-right: px2rem(20);
	}
	.img{
		width: 100%;
		height: 100%;
		border-radius: px2rem(8);
		background-size: 100% 100%;
	}
	.tip{
		bottom: 0;
		width: 100%;
		color: white;
		left: px2rem(15);
		height: px2rem(60);
		position: absolute;
		line-height: px2rem(60);
	}
	.right{
		height: 100%;
		@include prix(flex, 1);
		@include flex(space-between, column);
		border-bottom: px2rem(1) solid #ccc;
		div{
			width: 100%;
			max-width: px2rem(450);
			height: px2rem(80);
			line-height: px2rem(80);
			@include ellipsis;
		}
	}
}


</style>
