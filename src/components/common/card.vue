<template>
    <div class="card">
    	<div class="img">
    		<img v-lazy="url" width="100%">
    		<div class="playcount">
    			<span class="listen"></span>
    			<span class="num">{{ playcount }}</span>
    		</div>
    		<div class="nickname">
    			<span class="listen person"></span>
    			<span class="num">{{ nickname }}</span>
    		</div>
    	</div>
    	<div class="bg"></div>
    	<div class="tip">{{ tip }}</div>
    </div>
</template>

<script>
export default {
	props:{
		url : {
			type : String,
			default : ''
		},
		tip : {
			type : String,
			default : ''
		},
		nickname : {
			type : String,
			default : ''
		},
		playcount : {
			type : Number,
			default : 0
		}
	}
    
}
</script>

<style scoped  lang="scss">
@import '../../scss/px2rem.scss';
@import '../../scss/mixin.scss';
.card{
	position: relative;
}
.bg{
	position: absolute;
	background-color: rgba(0,0,0,.2);
	height: px2rem(350);
	width: 100%;
	top: 0;
	left: 0;
	border-radius: px2rem(8);
	z-index: 13;
}
.img{
	position: relative;
	width: 100%;
	height: px2rem(350);
	color: white;
	img{
		width: 100%;
		height: 100%;
		border-radius: px2rem(8);
	}
	.playcount{
		width: 100%;
		height: px2rem(40);
		line-height: px2rem(40);
		text-align: right;
		font-size: px2rem(22);
		color: white;
		position: absolute;
		top: 0;
		left: 0;
		@include flex(flex-end);
		z-index: 14;
	}
	.listen{
		display: inline-block;
		width: px2rem(35);
		height: px2rem(35);
		@include bg('../../images/listen.svg');
		margin-right: px2rem(5);
		}
	.num{
		display: inline-block;
		line-height: px2rem(26);
		margin-right: px2rem(10);
	}
	.nickname{
		width: 100%;
		height: px2rem(50);
		line-height: px2rem(50);
		font-size: px2rem(22);
		color: white;
		position: absolute;
		bottom: 0;
		left: px2rem(10);
		@include flex;
		z-index: 14;
		.person{
			@include bg('../../images/person.svg');
			width: px2rem(35);
			height: px2rem(35);
		}
	}

}
.tip{
	height: px2rem(80);
	line-height: px2rem(40);
	font-size: px2rem(24);
	width: 100%;
	text-align: left;
	overflow: hidden;
	display:-webkit-box; 
	text-overflow:ellipsis;
	-webkit-line-clamp:2;
	-webkit-box-orient:vertical;
	font-size: px2rem(24);
	margin-top: px2rem(20);
}

</style>
