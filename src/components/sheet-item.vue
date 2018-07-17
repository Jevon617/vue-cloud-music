<template>
    <div class="sheet-item" @click="$router.push('/sheet?id='+playlist.id)">
    	<img class="left" v-lazy="playlist.coverImgUrl" >
    	<div class="right">
    		<div class="title">{{playlist.name}}</div>
    		<div class="creator">by {{playlist.creator.nickname }}</div>
    		<div class="tip"><span>摇滚</span>{{ playlist.copywriter }}</div>
    	</div>
    </div>
</template>

<script>
export default {
	props:{
		playlist : {
			type : Object,
			default: ()=>{
				return {}
			}
		}
	},
	methods:{
		goDetail(){

		}
	}
}
</script>

<style scoped  lang="scss">
@import '../scss/mixin.scss';
.sheet-item{
	width: 100%;
	height: px2rem(280);
	@include flex;
	margin-top: px2rem(8);
	.left{
		width: px2rem(260);
		height: px2rem(280);
		border-radius: px2rem(5);
	}
	.right{
		@include prix(flex, 1);
		@include flex(space-between, column);
		@include prix(align-items, flex-start);
		@include padding( px2rem(20));
		height: 100%;
		border-bottom: px2rem(1) solid #ccc;
	}
	.title{
		font-size: px2rem(28);
		line-height: px2rem(50);
	}
	.creator{
		font-size: px2rem(20);
		color: #aaa;
		line-height: px2rem(30);
	}
	.tip{
		line-height: px2rem(40);
		font-size: px2rem(20);
		color: gray;
		span{
			font-size: px2rem(16);
			padding: px2rem(5);
			border: px2rem(1) solid $bg;
			color: $bg;
			margin-right: px2rem(12);
		}
	}
}

</style>
