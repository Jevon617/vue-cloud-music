<template>
    <div class="panel">
    	<div class="title">
    		<span>{{ title }}</span>
    		<span class="icon"></span>
    	</div>
    	<div class="list_box">
    		<div class="item" v-for="item in list">
    			<img v-lazy="item[urlType]">
    			<div class="tip"> {{ item.name }} </div>
    		</div>
    		<div class="clear"></div>
    	</div>
    </div>
</template>

<script>
export default {
	data(){
		return{
			arr :[]
		}
	},
	props:{
		list : {
			type : Array,
			default : []
		},
		title : {
			type : String,
			default : '推荐歌单'
		},
		route : {
			type : String,
			default : '/'
		},
		urlType:{
			type : String,
			default : 'picUrl'
		}
	}
}
</script>

<style scoped  lang="scss">

@import '../scss/px2rem.scss';
@import '../scss/mixin.scss';

.panel{
	width: 100%;
	@include padding(px2rem(30) px2rem(15) px2rem(30) px2rem(15));
	.title{
		line-height: px2rem(90);
		@include flex;
		font-size: px2rem(32);
		.icon{
			width: px2rem(28);
			height: px2rem(28);
			display: inline-block;
			@include bg('../images/goto.svg');
			margin-left: px2rem(20);
		}
	}
	.list_box{
		.item{
			height: px2rem(350);
			@include flex(space-between, column);
			margin-right: px2rem(10);
			float: left;
			img{
				width: px2rem(230);
				height: px2rem(230);
				border-radius: px2rem(10);
			}
			.tip{
				height: px2rem(80);
				line-height: px2rem(40);
				font-size: px2rem(26);
				width: px2rem(220);
				text-align: left;
				overflow: hidden;
				display:-webkit-box; 
				text-overflow:ellipsis;
				-webkit-line-clamp:2;
				-webkit-box-orient:vertical;
			}
		}
		.clear{
			clear: both;
		}
	}
}

</style>
