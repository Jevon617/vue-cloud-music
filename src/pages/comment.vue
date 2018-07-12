<template>
    <div class="comment">
    	<heador>
    		<div slot="middle">评论({{total}})</div>
    	</heador>
    	<scroll class="wrapper" ref="mscroll"
		        :pullUpLoad="true" :probeType=3 
		        :scrollbar="true" :list="newComments" 
		        :click="true"
		        @pullingUp="getSheetComment" >

			<div slot="content">
				<div class="sheetInfo">
					<img :src="$route.query.url" alt="">
					<div class="middle">
						<div class="title"> {{ $route.query.tip }} </div>
						<div class="nickname">
							<span style="color:gray;">by</span>
							{{ $route.query.nickname}}
						</div>
					</div>
					<div class="go"></div>
				</div>
    			<div class="hotComment"></div>
    			<div class="newComment"></div>

    		</div>
			<img class="loading" slot="pullUping" src="../../static/loading.gif">
		</scroll>
    </div>
</template>

<script>
import heador from '../components/common/header.vue';
import scroll from '../components/common/scroll.vue';
import { getSheetComment } from '../service/getData.js';

export default {
	data(){
		return{
			hotComments : [],
			newComments : [],
			total       : 0
		}
	},
	created(){
		this.getSheetComment();
	},
	methods:{
		async getSheetComment(){
			try{
				let res 		 = await getSheetComment(this.$route.query.id);
				this.hotComments = (res.data.code == 200) && res.data.hotComments || [];
				this.newComments = (res.data.code == 200) && res.data.comments || [];
				this.total       = (res.data.code == 200) && res.data.total || 0;
				console.log(res);
				console.log(this.newComments);
			}catch(e){
				this.$toast('网络好像出现了问题哦!');
			}
		}
	},
	components:{
		heador,
		scroll
	}

    
}
</script>

<style scoped  lang="scss">

@import "../scss/mixin.scss";
@import "../scss/px2rem.scss";
.comment{
	height: 100%;
	z-index: 12;
	position: relative;
    background-color: white;
    @include padding(px2rem(120) 0 0 0);

    .wrapper{
    	height: 100%;
    }

    .sheetInfo{
    	height: px2rem(220);
    	@include flex(space-between);
    	@include padding(0 px2rem(20));

    	img{
    		width: px2rem(180);
    		height: px2rem(180);
    		border-radius: px2rem(10);
    	}

    	.middle{
    		@include prix(flex, 1);
    		margin-left: px2rem(20);
    	}

    	.go{
    		width: px2rem(30);
    		height: px2rem(30);
    		@include bg('../images/goto.svg');
    	}
    	.title{
    		font-size: px2rem(28);
    		line-height: px2rem(50);
    		margin-bottom: px2rem(25);
    	}
    	.nickname{
			font-size: px2rem(24);
			color: #4c7fe6;
			span{
				margin-right: px2rem(5);
			}
    	}

    }
}

</style>
