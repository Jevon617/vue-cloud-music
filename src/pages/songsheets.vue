<template>
    <div class="sheet" :class="{ padding : !$store.state.songs.length}">
    	<heador>
    		<div slot="middle">歌单</div>
    	</heador>

    	<scroll class="wrapper" ref="mscroll"
		        :pullUpLoad="true" :probeType=3 
		        :scrollbar="true" :list="allSheet" 
		        :click="true"
		        @pullingUp="getAllSheet" >

			<div slot="content">

    			<div class="banner" v-if="fineSheet.length">
		    		<div class="img"
		    		    :style="{ backgroundImage :'url('+fineSheet[0].coverImgUrl+')'}">
		    		</div>
		    		<div class="right">
		    			<div class="title">
							<span class="title">精品歌单</span>
							<span class="icon"></span>
		    			</div>
		    			<div class="name">{{ fineSheet[0].name }}</div>
		    			<div class="des">{{ fineSheet[0].copywriter }}</div>
		    		</div>
		    	</div>

		    	<div class="category">
		    		<div class="all">
		    			<span>全部歌单</span>
		    			<span class="icon"></span>
		    		</div>
		    		<div class="label">
		    			<div>华语</div>
		    			<div>民谣</div>
		    			<div>电子</div>
		    		</div>
		    	</div>

		    	<div class="list" >
					<div class="card1" v-for="item in allSheet"
					     @click="$router.push('/sheet?id='+item.id)">

		    			<card :url="item.coverImgUrl" :playcount="item.playCount"
		    			      :tip="item.name" 
		    			      :nickname="String(item.creator.nickname)"></card>
					</div>
		    	</div>

    		</div>

			<img class="loading" slot="pullUping" src="../../static/loading.gif">

		</scroll>
    </div>
</template>

<script>
import heador  from '../components/common/header.vue';
import card    from '../components/common/card.vue';
import scroll  from '../components/common/scroll.vue';
import { getFineSheet, getAllSheet } from '../service/getData.js';

export default {
	data(){
		return{
			fineSheet : [],
			allSheet  : [],
			scroll    : null,
			count     : 20
		}
	},
	mounted(){
		this.getFineSheet();
		this.getAllSheet();
	},
	methods:{
		async getFineSheet(){
			try{
				let res = await getFineSheet(20);
				this.fineSheet = (res.data.code == 200) && res.data.playlists || [];
			}catch(e){

				this.$toast('网络好像出现了问题哦!');
			}
		},
		async getAllSheet(){
			try{
				let res = await getAllSheet(this.count);
				this.allSheet = (res.data.code == 200) && res.data.playlists || [];
				this.count +=20;
				console.log(this.allSheet);
			}catch(e){
				this.$refs.mscroll.finishPullUp();
				this.$toast('网络好像出现了问题哦!');
			}
		}
	},
	components:{
		heador,
		card,
		scroll
	}
}
</script>

<style scoped  lang="scss">
@import "../scss/mixin.scss";
@import "../scss/px2rem.scss";
.padding{
	@include padding(px2rem(120) 0 0 0);
}
.sheet{
	height: 100%;
	overflow: hidden;
	position: relative;
	background-color: white;
	.icon{
		display: inline-block;
		width: px2rem(30);
		height: px2rem(30);
		@include bg('../images/goto_b.svg');
	}
	.loading{
		width: px2rem(50);
		height: px2rem(50);
	}
	.wrapper{
		height: 100%;
		overflow: scroll;
	}
	.content{
		min-height: 83vh;
		padding-bottom: px2rem(2);
	}
	.banner{
		height: px2rem(300);
		background-image: linear-gradient(147deg, #77776b 0%, #ad9494 49%, #77776b 100%);
		color: white;
		@include flex();
		.img{
			width: px2rem(200);
			height: px2rem(200);
			border-radius: px2rem(8);
			background-repeat: no-repeat;
			background-size: 100% 100%;
			margin:px2rem(20) px2rem(20) 0;
		}
		.right{
			@include prix(flex, 1);
			.title{
				font-size: px2rem(36);
				line-height: px2rem(80);
			}
			.name{
				font-size: px2rem(26);
				line-height: px2rem(80);
			}
			.des{
				color: #ccc;
				font-size: px2rem(22);
				height: px2rem(60);
				overflow: hidden;
				display:-webkit-box; 
				text-overflow:ellipsis;
				-webkit-line-clamp:2;
				-webkit-box-orient:vertical;
			}
		}
	}
	.category{
		width: 100%;
		@include padding(px2rem(30) px2rem(20));
		@include flex(space-between);
		.all{
			font-size: px2rem(26);
			width: px2rem(220);
			height: px2rem(67);
			border-radius: px2rem(35);
			line-height: px2rem(67);
			text-align: center;
			border: px2rem(2) solid #ccc;
			@include flex(center);
			.icon{
				margin-left: px2rem(5);
				width: px2rem(26);
				height: px2rem(26);
			}
		}
		.label{
			width: px2rem(300);
			height: px2rem(40);
			font-size: px2rem(24);
			@include flex(space-between);
			div{
				text-align: center;
				width: 33%;
				height: px2rem(40);
				line-height: px2rem(40);
				border-right: px2rem(2) solid #ccc;
			}
			div:last-child{
				border: none;
			}
		}
	}
	.list{
		@include padding(px2rem(10));
		.card1{
			width: 49%;
			display: inline-block;
			margin: 0 0 px2rem(40);
		}
		.card1:nth-child(2n-1){
			margin-right: 2%;
		}
	}
	
}

</style>
