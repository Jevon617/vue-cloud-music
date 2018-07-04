<template>
    <div class="loading" v-show="show">
    	<img src="../../../static/loading.gif" alt="">
    </div>
</template>

<script>
export default {
	data(){
		return{
			show : false
		}
	},
	methods:{
		showLoading(){
			this.show = true;
		},
		hideLoading(){
			this.show = false;
		}
	}
}
</script>

<style scoped  lang="scss">
@import "../../scss/mixin.scss";
@import "../../scss/px2rem.scss";
.loading{
	width: px2rem(250);
	height: px2rem(250);
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translateX(-50%) translateY(-50%);
	border-radius: px2rem(30);
	background-color: rgba(0,0,0,.6);
	@include flex(center, center);
	z-index: 99;
	img{
		width: 50%;
		height: 50%;
	}
}

</style>
