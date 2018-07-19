<template>
    <div class="item" :style="{ height: height/45 + 'rem' }">
    	<div class="left">
    		<slot name="left" />
    	</div>
    	<div class="right" :style="{ border : !border && 'none'  }">
    		<slot name="right" />
    	</div>
    </div>
</template>

<script>

export default {
	data(){
		return{}
	},
	props:{
		height : {
			type : Number,
			default: 100
		},
		border : {
			type : Boolean,
			default : true 
		}
	}
    
}
</script>

<style scoped  lang="scss">

@import "../../scss/mixin.scss";

.item{
	width: 100%;
	height: px2rem(100);
	@include flex(space-between);
	.right{
		height: 100%;
		@include prix(flex, 1);
		border-bottom: 1px solid #ccc;
	}
	.left{
		width: 15%;
		height: 100%;
		@include flex(center);
	}
}



</style>
