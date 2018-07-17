<template>
    <div class="comment">
    	<div class="bg"></div>
    	<heador>
    		<div slot="middle">评论({{ total }})</div>
    	</heador>
    	<scroll class="wrapper" ref="mscroll"
		        :pullUpLoad="true" :probeType=3 
		        :scrollbar="true" :list="newComments" 
		        :click="true"
		        @pullingUp="getComment" >

			<div slot="content">
				<div class="sheetInfo" @click="$router.go(-1)">
					<img :src="$route.query.url" alt="">
					<div class="middle">
						<div class="tip"> {{ $route.query.tip }} </div>
						<div class="nickname">
							<span style="color:gray;">by</span>
							{{ $route.query.nickname}}
						</div>
					</div>
					<div class="go"></div>
				</div>
    			<div class="hotComment" v-if="hotComments.length" >
    				<div class="title">精彩评论</div>
    				<div class="list">
    					<comment v-for="item,index in hotComments"
                                 :comment="item" :key="index"
                                 @praise="praise">
    					</comment>
    				</div>
    			</div>
    			<div class="newComment" v-if="newComments.length">
    				<div class="title">最新评论( {{ newComments.length }} )</div>
    				<div class="list">
    					<comment v-for="item,index in newComments"
                                 :comment="item" :key="index"
                                 @praise="praise">
    					</comment>
    				</div>
    			</div>

    		</div>
			<img class="loading" slot="pullUping" src="../../static/loading.gif">
		</scroll>
        <div class="writeComment">
            <div class="ipt">
                <input type="text" v-model="content" class="iconfont" :placeholder="icon">
            </div>
            <div class="submit" @click="publishComment">发送</div>
        </div>
    </div>
</template>

<script>
import heador  from '../components/common/header.vue';
import scroll  from '../components/common/scroll.vue';
import comment from '../components/comment-item.vue';
import { getComment, praise } from '../service/getData.js';


export default {
	data(){
		return{
			hotComments : [],
			newComments : [],
			total       : 0,
			count       : 20,
            content     : '',
            icon        : '\ue645 听这么diao的音乐, 你说什么都对' // vue在placeholder中显示图标
		}
	},
	created(){
		this.getComment();
	},
	methods:{
		async getComment(){
			try{
                let query        = this.$route.query;
				let res          = await getComment(query.type,query.id,this.count);
				this.hotComments = (res.data.code == 200) && res.data.hotComments || [];
				this.newComments = (res.data.code == 200) && res.data.comments || [];
				this.total       = (res.data.code == 200) && res.data.total || 0;
				this.count += 20;
			}catch(e){
				this.$toast('网络好像出现了问题哦!');
			}
		},
        publishComment(){
            this.content && this.$toast('api暂时还不支持!');
        },
        async praise(comment){
            try{
                let t    = comment.liked && '0' || '1';
                let type = this.$route.query.type;
                let id   = this.$route.query.id;
                let map  = { music : 0, mv : 1, playlist : 2, album : 3, dj : 4 };
                let res  = await praise(id, comment.commentId, t, map[type]);
                if (res.data.code == 200) comment.liked = !comment.liked; 
            }catch(e){
                this.$toast('网络好像出现了问题哦!');
            }
        }
	},
	components:{
		heador,
		scroll,
		comment
	}

    
}
</script>

<style scoped  lang="scss">

@import "../scss/mixin.scss";
.comment{
	height: 100%;
	z-index: 11;
	position: relative;
    @include padding(px2rem(120) 0 0 0);
    .bg{
    	width: 100%;
    	height: 100vh;
    	position: fixed;
    	top: 0;
    	left: 0;
    	z-index: 10;
    	background-color: white;
    }
    .wrapper{
    	height: 100%;
    	z-index: 11;
    	position: relative;
    }
    .loading{
    	width: px2rem(40);
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
    	.tip{
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
    .title{
    	height: px2rem(50);
    	line-height: px2rem(50);
    	color: gray;
    	font-size: px2rem(24);
    	@include padding(0 px2rem(20));
    	background-color: #f0f0f0;
    }
    .writeComment{
        position: fixed;
        width: 100%;
        bottom: px2rem(-2);
        z-index: 12;
        height: px2rem(100);
        font-size: px2rem(24);
        @include flex;
        background-color: white;
        @include padding(px2rem(10) px2rem(20));
        border-top: px2rem(1) solid #ccc;
        .submit{
            width: px2rem(80);
            text-align: right;
            color: gray;
            font-size: px2rem(26);
        }
        .ipt{
            @include prix(flex, 1);
            height: 100%;
            background-size: 10% 50%;
            background-position: left bottom;
            background-color: rgba(255,255,255,.9);
            input{
                outline: none;
                color: black;
                width: 100%;
                height: 100%;
                border-bottom: 1px solid #ccc;
                font-size: px2rem(24);
            }
            input::-webkit-input-placeholder{
                color: gray;
            }
            
        }
    }
}

</style>
