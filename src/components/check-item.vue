<template>
    <div class='check-item'>
    	<div class="item">
    		<div class="left" @click="song.select = !song.select">
    			<i class="iconfont icon-unselect" v-show="!song.select"></i>
    			<i class="iconfont icon-selected" v-show="song.select"></i>
    		</div>
    		<div class="right">
    			<div class="title">{{ song.name }}</div>
    			<div class="author">
    				<span v-if="song.artists">
    					{{  song.artists[0].name+ '-' + song.album.name }}
    				</span>
    				<span v-else>
    					{{  song.ar[0].name+ '-' + song.al.name }}
    				</span>
    			</div>
    		</div>
    	</div>
    	
    </div>
</template>

<script>
export default {
	props:{
		song:{
			type : Object,
			default: ()=>{
				return {}
			}
		}
	}
    
}
</script>

<style scoped  lang="scss">
@import '../scss/mixin.scss';

.item{
	@include flex;
	height: px2rem(120);
}
.left{
	width: px2rem(120);
	text-align: center;
	height: px2rem(120);
	line-height: px2rem(120);
}
i{
	font-size: px2rem(50);
	color: gray;
}
.icon-selected{
	color: $bg;

}

.right{
	@include prix(flex, 1);
	border-bottom: px2rem(1) solid #ccc;
}
.title{
	@include ellipsis;
	height: px2rem(70);
	font-size: px2rem(28);
	max-width: px2rem(600);
	line-height: px2rem(70);
}
.author{
	color: gray;
	@include ellipsis;
	height: px2rem(50);
	font-size: px2rem(20);
	max-width: px2rem(600);
	line-height: px2rem(50);
}
</style>
