<template>
	<div class="list_box">
		<div class="bg" @click="hideList" v-show="show && $store.state.songs.length"></div>
		<transition name="list" >
		    <div class="music_list"  v-show="show && $store.state.songs.length">
		    	<div class="title">
		    		<div class="type" @click="changeType">
		    			{{ $store.state.type }} ({{list.length}})
		    		</div>
		    		<div class="collection">
		    			收藏全部
		    		</div>
		    		<div class="clearall" @click="clearAll">
		    			清空
		    		</div>
		    	</div>
		    	<div class="list">
		    		<div class="item" v-for="item,index in list"
		    		    :class="{ on : index == $store.state.currentIndex }">
		    			<div class="info" @click="change(index)">
		    				<span class="name">{{item.name}}</span> 
		    				<span class="author"
		    				     :class="{ on : index == $store.state.currentIndex }">
		    					-　{{ item.artists[0].name }}
		    				</span>
		    			</div>
		    			<div class="close" @click="del(index)"></div>
		    		</div>
		    	</div>
		    </div>
	    </transition>
	</div>
	
	
</template>

<script>
export default {
	data(){
		return{
			count : 0,
			type : ["随机播放", "单曲循环", "列表循环"],
			show : false
		}
	},
	props : {
		list:{
			type : Array,
			default : ()=>{
				return [];
			}
		}
	},
	methods:{
		changeType(){
			this.count ++;
			this.$store.state.type = this.type[this.count%3];
			localStorage.setItem('list_type', this.$store.state.type )
		},
		showList(){
			this.show = true;
		},
		hideList(){
			this.show = false;
		},
		clearAll(){
			this.$store.state.songs = [];
		},
		del(index){
			// 如果为当前播放歌曲,跳到下一首
			if(index == this.$store.state.currentIndex){
				let next = this.$store.state.songs[index+1] && (index+1) || 0;
				this.$store.state.currentIndex =  next;
			}
			// 恢复当前播放的index
			if(index < this.$store.state.currentIndex){
				this.$store.state.currentIndex--;
				console.log(this.$store.state.currentIndex);
			}
			this.$store.state.songs.splice(index, 1);
		},
		change(index){
			let currentIndex = this.$store.state.currentIndex
			if(index == currentIndex) return;
			this.$store.state.currentIndex = index;
		}
	},
	mounted(){
		this.count = this.type.findIndex(value=>{
			return value == this.$store.state.type;
		})
	}
    
}
</script>

<style scoped  lang="scss">
@import "../scss/mixin.scss";
.bg{
	width: 100%;
	height: 100vh;
	background-color: rgba(0,0,0,.5);
	position: fixed;
	bottom: 0;
	z-index: 15;
}

.list-enter-active, .list-leave-active{
	transition: all .2s ease-in;
}
.list-enter, .list-leave-active{
	transform:translateY(100%);
}

.on{
	color: $bg !important;
}

.music_list{
	height: px2rem(767);
	width: 100%;
	background-color: white;
	border-top-left-radius: px2rem(20);
	border-top-right-radius: px2rem(20);
	position: fixed;
	bottom: 0;
	z-index: 15;
	.title{
		width: 100%;
		border-top-left-radius: px2rem(20);
		border-top-right-radius: px2rem(20);
		height: px2rem(120);
		line-height: px2rem(120);
		@include flex(space-between);
		font-size: px2rem(28);
		border-bottom: 1px solid #ccc;
		.type{
			@include prix(flex, 1);
			@include padding(px2rem(20));
		}
		.collection{
			width: px2rem(150);
		}
		.clearall{
			width: px2rem(80);
			color: gray;
		}
	}

	.list{
		height: px2rem(640);
		overflow: scroll;
		@include padding(0 0 0 px2rem(20));
		.item{
			width: 100%;
			height: px2rem(100);
			@include flex(space-between);
			border-bottom: 1px solid #ccc;

		}
		.info{
			@include prix(flex, 1);
		}
		.name{
			font-size: px2rem(28);
			margin-right: px2rem(10);
			overflow: hidden;
			height: px2rem(100);
			line-height: px2rem(100);
			display: inline-block;
			max-width: px2rem(500);
		}
		.author{
			font-size: px2rem(20);
			color: gray;
			overflow: hidden;
			height: px2rem(100);
			line-height: px2rem(100);
			display: inline-block;
		}
		.close{
			width: px2rem(40);
			height: px2rem(40);
			@include bg('../images/close.svg');
			margin-right: px2rem(10);
		}
		
	}
	
}

</style>
