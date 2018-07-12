<template>
    <div class="comment_item">
    	<div class="img" style="{ backgroundImage : comment.user.avatarUrl  }"></div>
    	<div class="right">
    		<div class="top">
    			<div class="nickname">{{ comment.user.nickname }}</div>
    			<div class="praise">
    				<div class="num"> {{ comment.likedCount }} </div>
    				<div class="icon"></div>
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
	computed:{
		$time(){

			let t 	    = new Date(this.comment.time);
			let now 	= new Date();

			let nowYear = now.getFullYear();
			let nowDay  = now.getDate();
			let nowMon  = now.getMonth(); 

			let year    = t.getFullYear();
			let month   = t.getMonth();
			let day     = t.getDate();
			let hour    = t.getHours();
			let min     = t.getMinutes();

			let time    = null;

			if(nowYear == year && nowDay == day && nowMon == month){
				time = hour + ':' + min;
			}else if(nowYear != year){
				time = `${year}年${month}月${day}日`;
			}else{
				time = `${month}月${day}日`;
			}

			return time;
		}


	}
    
}
</script>

<style scoped  lang="scss">

@import '../scss/mixin.scss';
@import '../scss/px2rem.scss';

.comment_item{
	@include padding(px2rem(30) px2rem(20));
	@include flex;
	@include prix(align-items, flex-start);
	.img{
		width: px2rem(60);
		height: px2rem(60);
		background-size: 100% 100%;
	}
}

</style>
