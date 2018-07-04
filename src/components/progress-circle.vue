<template>
    <div class="progress-circle">
	    <svg :style="{ width : px2rem(radius,750)+'rem', height: px2rem(radius,750)+'rem' }"
	         viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
	    <circle class="progress-background" r="50" cx="50" cy="50" fill="transparent" />
	    <circle class="progress-bar" r="50" cx="50" cy="50" fill="transparent"
	            :stroke-dasharray="dashArray" :stroke-dashoffset="dashOffset"/>
	    </svg>
	    <slot></slot>
  </div>
</template>

<script>
export default {
	data(){
		return{
			dashArray : Math.PI * 100
		}
	},
	props: {
		radius: {
			type: Number,
			default: 20
		},
		percent: {
			type: Number,
			default: 0
		}
	},
	computed: {
		dashOffset() {
			return (1 - this.percent) * this.dashArray
		}
    },
    mounted(){
    	console.log(this.px2rem(10,750))
    }
}
</script>

<style scoped  lang="scss">
@import "../scss/px2rem.scss";
@import "../scss/mixin.scss";

.progress-circle{
	height: 100%;
	position: relative;

	svg{
		position: absolute;
		top: 50%;
		left: 50%;
		@include prix(transform, translate(-50%, -50%));
	}

	.progress-background{
		stroke-width: px2rem(4);
      	transform-origin: center;
      	transform: scale(0.9);
        stroke: #ccc;
	}
	.progress-bar{
		stroke-width: px2rem(4);
      	transform-origin: center;
		transform: scale(0.9) rotate(-90deg);
        stroke:red;
	}
}


</style>
