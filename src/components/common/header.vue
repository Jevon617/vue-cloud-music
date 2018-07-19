<template>
    <div class="head" :style="{ backgroundColor : bgColor }">
    	<div class="left">
    		<div class="back" @click="$router.go(-1)"></div>
    		<div class="middle">
    			<slot name="middle"  />
    		</div>
    	</div>
    	<div class="right">
    		<slot name="right" />
    	</div>
    </div>
</template>

<script>
export default {
	props : {
		bgColor : {
			type : String,
			default : '#9f1d1d'
		}
	}
    
}
</script>

<style scoped  lang="scss">

@import "../../scss/mixin.scss";

.head{
	width: 100%;
	height: px2rem(120);
	font-size: px2rem(36);
	color: white;
	@include flex(space-between);
	@include padding(0 px2rem(40));
	position: fixed;
    top: 0;
    left: 0;
    z-index: 12;
}
.left{
	width: 52%;
	height: 100%;
	@include flex(space-between);
	.middle{
		width: 80%;
		text-align: left;
		overflow: hidden;
		white-space: nowrap;
	}
}
.back{
	width: px2rem(50);
	height: px2rem(50);
	@include bg("../../images/back.svg");
}
.right{
	width: 25%;
}

</style>
