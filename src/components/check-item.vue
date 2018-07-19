<template>
    <div class='check-item'>
    	<div class="item">
    		<div class="left">
    			<i class="icon-font icon-check-box-outline-blank" v-show="type=='unselect'">
    			</i>
    			<i class="icon-font icon-check-box" v-show="type=='selected'">
    			</i>
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
	data(){
		return{
			type : 'unselect'
		}
	},
	song:{
		type : Object,
		default: ()=>{
			return {}
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
	height: px2rem(120);
	text-align: center;
	line-height: px2rem(120);
}
i{
	font-size: px2rem(40);
}
.icon-check-box{
	color: $bg;
}

.right{
	@include prix(flex, 1);
}
.title{
	@include ellipsis;
	height: px2rem(80);
	font-size: px2rem(28);
	line-height: px2rem(80);
}
.author{
	color: gray;
	@include ellipsis;
	height: px2rem(40);
	font-size: px2rem(20);
	line-height: px2rem(40);
}
</style>
