<template>
    <div class="button-group">
    	<div class="comment" @click="goComment">
        	<div class="icon"></div>
        	<div class="word">{{playlist.commentCount || '评论'}}</div>
        </div>
        <div class="share">
        	<div class="icon"></div>
        	<div class="word">{{ playlist.shareCount || '分享' }}</div>
        </div>
        <div class="download">
        	<div class="icon"></div>
        	<div class="word">下载</div>
        </div>
        <div class="choose" @click="goCheck">
        	<div class="icon"></div>
        	<div class="word">多选</div>
        </div>
    </div>
</template>

<script>
export default {
	props:{
		playlist : {
			type : Object,
			default : ()=>{
				return {}
			}
		}
	},
	methods:{
		goComment(){
			this.$emit('goComment');
		},
        goCheck(){
            this.$emit('goCheck');
        }
	}
    
}
</script>

<style scoped  lang="scss">
@import '../scss/mixin.scss';
.button-group{
    width: px2rem(650);
    height: px2rem(150);
    @include flex(space-between);
    margin: 0 auto;
    div{
        width: px2rem(120);
        height: px2rem(120);
    }
    .word{
    	height: px2rem(70);
    	font-size: px2rem(24);
    	text-align: center;
    	line-height: px2rem(70);
    }
    .share>.icon{
    	@include bg('../images/share_b.svg');
		height: px2rem(50);
    }
    .download>.icon{
		@include bg('../images/download_b.svg');
		height: px2rem(50);
    }
    .comment>.icon{
        @include bg('../images/comment.svg');
		height: px2rem(50);
    }
    .choose>.icon{
        @include bg('../images/choose.svg');
        height: px2rem(50);
    }
}	

</style>
