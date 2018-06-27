<template>
    <div class="main">
    	<div>123</div>
    	<header>
    		<div class="left"></div>
    		<div class="middle">
    			<router-link tag="img" :src="{ $route.path == '/main/manage' 
    			             && '../images/music.svg' 
    			             || '../images/music_b.svg' }">
    			</router-link>

    			<router-link tag="img" :src="{ $route.path == '/main/music'
    			             && '../images/home.svg' 
    			             || '../images/home_b.svg' }">
    			</router-link>

    			<router-link tag="img" :src="{ $route.path == '/main/radio'
    			             && '../images/radio.svg'
    			             || '../images/radio_b.svg' }">
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
.main{
	height: 100%;
	min-height: 100vh;
}

header{
	height: px2rem(120);
	@include flex(space-between);
	.left{
		width: px2rem(40);
		height: px2rem(40);
		@include bg("../images/catalog.svg");
	}
	.right{
		width: px2rem(40);
		height: px2rem(40);
		@include bg("../images/search.svg");
	}
	.middle{
		width: 50%;
		@include flex(space-between);
		img{
			width: px2rem(40);
			height: px2rem(40);
		}
	}
}

</style>
