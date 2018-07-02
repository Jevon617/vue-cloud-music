<template>
    <div class="home">
    	<div class="bg"></div>
    	<div class="content">
    		<div class="btn_login" @click="$router.push('/login')">
    			<btn>登 录</btn>
    		</div>
    		<div class="register">
    			<btn>注 册</btn>
    		</div>
    	</div>
    	<div class="tip">其它登录方式</div>
    	<div class="login_others">
			<div class="qq"></div>
			<div class="wx"></div>
			<div class="wb"></div>
		</div>
    </div>
</template>

<script>

import btn from "../components/common/button.vue";

export default {
	components: {
		btn
	}
    
}
</script>

<style scoped  lang="scss">
@import "../scss/mixin.scss";
@import "../scss/px2rem.scss";
.home{
	width: 100%;
	height: 100%;
	min-height: 100vh;
	background: url(../images/bg.jpg) no-repeat;
	background-size: 100% 100%;
	position: relative;
}
.content{
	width: 100%;
	@include padding(px2rem(150) px2rem(100) px2rem(100));
}
.btn_login{
	margin-bottom: px2rem(40);
}
.login_others{
	width: 100%;
	position: absolute;
	bottom: px2rem(150);
	height: px2rem(80);
	@include flex(space-between);
	@include padding(0 px2rem(100));
	div{
		width: px2rem(80);
		height: px2rem(80);
		border-radius: 50%;
		border: px2rem(2) solid white;
		cursor: pointer;
	}
	.qq{
		@include bg('../images/qq.svg')
		background-size: 60% 60%;
		background-position: center center;

	}
	.wx{
		@include bg('../images/wx.svg')
		background-size: 60% 60%;
		background-position: center center;
	}
	.wb{
		@include bg('../images/wb.svg')
		background-size: 60% 60%;
		background-position: center center	;
	}
}
.tip{
	font-size: px2rem(24);
	color: #ccc;
	position: absolute;
	bottom: px2rem(300);
	width: 100%;
	text-align: center;
}


</style>
