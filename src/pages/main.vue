<template>
    <div class="main">
    	<header>
    		<div class="left"></div>
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
    		<div class="right"></div>
    	</header>
        <router-view/>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped  lang="scss">

@import "../scss/mixin.scss";
@import "../scss/px2rem.scss";
.main{
	height: 100%;
	min-height: 100vh;
}

header{
	height: px2rem(120);
	@include flex(space-between);
	background-color: $bg;
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

</style>
