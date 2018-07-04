<template>
    <transition name="fade">
    	<div class="toast" v-show="show && !!info">
    		{{ info }}
    	</div>
    </transition>
</template>

<script>
export default {
    data(){
    	return{
    		show : false,
    		info : ""
    	}
    },
    methods:{
    	showToast(){
    		this.show = true;
    	},
    	hideToast(){
    		this.show = false;
    	}
    }
}
</script>

<style scoped  lang="scss">

@import "../../scss/px2rem.scss";


.fade-enter-active, .fade-leave-active{
    transition: all .5s linear;
}
.fade-enter{
    opacity:1;
}
.fade-leave-active{
    opacity:0;
}

.toast{
	width: px2rem(250);
	height:  px2rem(100);
	line-height: px2rem(100);
	text-align: center;
	text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: white;
    border-radius: px2rem(10);
    position: absolute;
    font-size: px2rem(25);
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 99;
    background-color: rgba(0,0,0,.6);
}

</style>
