<template>
    <div class="head">
    	<div class="left">
    		<div class="back" @click="$router.go(-1)"></div>
    		<slot name="middle" />
    	</div>
    	<div class="right">
    		<slot name="right" />
    	</div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped  lang="scss">

@import "../../scss/mixin.scss";
@import "../../scss/px2rem.scss";

.head{
	width: 100%;
	height: px2rem(120);
	font-size: px2rem(36);
	color: white;
	@include flex(space-between);
	background-color: $bg;
	@include padding(0 px2rem(40))
}
.left{
	width: 38%;
	height: 100%;
	@include flex(space-between);
}
.back{
	width: px2rem(50);
	height: px2rem(50);
	@include bg("../../images/back.svg");
}

</style>
