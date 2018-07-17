<template>
    <div class="comment_item">
    	<div class="img" :style="{ backgroundImage :'url('+ comment.user.avatarUrl +')'}"></div>
    	<div class="right">
    		<div class="top">
    			<div class="nickname">{{ comment.user.nickname }}</div>
    			<div class="praise" :class="{ liked : comment.liked }" @click="praise">
    				<div class="num" v-if="comment.likedCount"> {{ comment.likedCount }} </div>
    				<i class="iconfont  icon-iconfontzhizuobiaozhun44"></i>
    			</div>
    		</div>
    		<div class="date">{{ $time }}</div>
    		<div class="content">
    			<div class="myComment">{{ comment.content }}</div>
    			<div class="replied" v-if="comment.beReplied.length">
    				<span class="user">@{{ comment.beReplied[0].user.nickname }}:</span>
    				<span>{{ comment.beReplied[0].content}}</span>
    			</div>	
    		</div>
    	</div>
    </div>
</template>

<script>
import { addPrix } from '../service/utlis.js';
export default {
	data(){
		return{
			
		}
	},
	props:{
		comment : {
			type : Object,
			default : ()=>{
				return {}
			}
		}
	},
	methods:{
		praise(){
			console.log('praise');
			this.$emit('praise',this.comment);
		}
	},
	
	computed:{
		$time(){

			let t 	    = new Date(this.comment.time);
			let now 	= new Date();

			let nowYear = now.getFullYear();
			let nowDay  = now.getDate();
			let nowMon  = now.getMonth()+1; 

			let year    = t.getFullYear();
			let month   = t.getMonth()+1;
			let day     = t.getDate();
			let hour    = t.getHours();
			let min     = t.getMinutes();

			let time    = null;

			if(nowYear == year && nowDay == day && nowMon == month){
				time = addPrix(hour) + ':' + addPrix(min);

			}else if(nowYear != year){
				time = `${year}年${addPrix(month)}月${addPrix(day)}日`;
			}else{
				time = `${addPrix(month)}月${addPrix(day)}日`;
			}

			return time;
		}
	}
    
}
</script>

<style scoped  lang="scss">

@import '../scss/mixin.scss';

.comment_item{
	@include padding(px2rem(30) px2rem(20));
	@include flex;
	@include prix(align-items, flex-start);
	.img{
		width: px2rem(70);
		height: px2rem(70);
		background-size: 100% 100%;
		margin-right: px2rem(20);
		border-radius: 50%;
	}
	.right{
		@include prix(flex, 1);
		.top{
			height: px2rem(50);
			line-height: px2rem(50);
			font-size: px2rem(26);
			color: gray;
			@include flex(space-between);
		}

		.praise{
			@include flex(space-between);
		}
		.iconfont{
			font-size: px2rem(32);
			margin-left: px2rem(8);
		}
		
		.date{
			font-size: px2rem(18);
			line-height: px2rem(25);
		}
		.liked{
			color: $bg;
		}
		.content{
			margin-top: px2rem(20);
			font-size: px2rem(24);
			.myComment{
				line-height: px2rem(50);
				font-style: px2rem(28);
			}
			.replied{
				background-color: #fff;
				border-radius: px2rem(4);
				border: px2rem(1) solid #ccc;
				margin-top: px2rem(20);
				@include padding(px2rem(15));
				line-height: px2rem(50);
				color: gray;
				.user{
					color: #759cea;
				}
			}
		}
	}
}

</style>
