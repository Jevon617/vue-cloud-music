<template>
    <div class="item"  @click="go">
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
		
		border : {
			type : Boolean,
			default : true 
		}
	},
	methods:{
		go(){
			this.$emit('go');
		}
	}
    
}
</script>

<style scoped  lang="scss">

@import "../../scss/mixin.scss";

.item{
	width: 100%;
	height: px2rem(120);
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
