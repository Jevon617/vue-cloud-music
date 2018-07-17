<template>
    <div class="main" :class="{ padding : !$store.state.songs.length}">
    	<header>
			<div class="left" @click="showDrawer"></div>
    		<div class="middle">
    			<router-link tag="div" class="manage" to="/main/manage"
    			             :class="{ 'manage_on' : $route.path == '/main/manage'}">
    			</router-link>

    			<router-link tag="div" to="/main/music" class="music"
    						 :class="{ 'music_on' : $route.path == '/main/music'}">
    			</router-link>

    			<router-link tag="div" to="/main/radio" class="radio" 
    			             :class="{ 'radio_on' : $route.path == '/main/radio'}">
    			</router-link>
    		</div>
			<div class="right" @click="$router.push('/search')"></div>
		</header>
		<div class="content">
    		<router-view/>
		</div>
		
    </div>
</template>

<script>
import { Bus } from "../bus.js";

export default {
	data(){
		return{

		}
	},
	methods:{
		showDrawer(){
			Bus.$emit('toggleMenu');
		}
	}
    
}
</script>

<style scoped  lang="scss">

@import "../scss/mixin.scss";
.main{
	height: 100%;
}
header{
	height: px2rem(120);
	@include flex(space-between);
	background-color: $bg;
	position: fixed;
	top: 0;
    left: 0;
    z-index: 6;
	.left{
		width: px2rem(50);
		height: px2rem(50);
		@include bg("../images/catalog.svg");
	}
	.right{
		width: px2rem(50);
		height: px2rem(50);
		@include bg("../images/search.svg");
	}
	.middle{
		width: 45%;
		height:100%;
		@include flex(space-between);
		div{
			width: px2rem(50);
			height: px2rem(50);
			@include padding(px2rem(50));
		}
		.manage{
			@include bg("../images/music_b.svg");
			background-size: 50% 50%;
    		background-position: center center;
		}
		.manage_on{
			@include bg("../images/music.svg");
			background-size: 50% 50%;
    		background-position: center center;
		}
		.music{
			@include bg("../images/home_b.svg");
			background-size: 50% 50%;
    		background-position: center center;
		}
		.music_on{
			@include bg("../images/home.svg");
			background-size: 50% 50%;
    		background-position: center center;
		}
		.radio{
			@include bg("../images/radio_b.svg");
			background-size: 50% 50%;
    		background-position: center center;
		}
		.radio_on{
			@include bg("../images/radio.svg");
			background-size: 50% 50%;
    		background-position: center center;
		}
	}
}
.content{
	overflow: scroll;
	height: 100%;
}
.padding{
	@include padding(px2rem(120) 0 0 0);
}


</style>
