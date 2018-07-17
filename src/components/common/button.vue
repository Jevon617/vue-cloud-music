<template>
    <div class="btn" :style="{ color : color, borderColor: border }">
    	<slot></slot>
    </div>
</template>

<script>
export default {
	props:{
		color: {
			type: String,
			default: ""
		},
		border: {
			type: String,
			default: ""
		}
	}
    
}
</script>

<style scoped  lang="scss">

@import "../../scss/mixin.scss";

.btn{
	width: 100%;
	color: white;
	font-size: px2rem(40);
	height: px2rem(90);
	line-height: px2rem(90);
	border-radius:px2rem(80);
	border: px2rem(2) solid white;
	text-align: center;
}

</style>
