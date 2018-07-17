<template>
   	<div class="history">
		<div v-for="item,index in history" class="item" @click="search(item)">
			<i class="iconfont icon-time"></i>
			<div class="right">
				<div>{{ item }}</div>
				<i class="iconfont icon-chacha"  @click="del($event,index)"></i>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props:{
		history : {
			type : Array,
			default: ()=>{
				return []
			}
		}
	},
	methods:{
		del(e,index){
			this.$emit('del', index);
			e.stopPropagation();
		},
		search(word){
			this.$emit('search', word);
		}
	}
    
}
</script>

<style scoped  lang="scss">
@import '../scss/mixin.scss';

.history{
	@include padding(0 0 0 px2rem(20));
	.item{
		height: px2rem(100);
		@include flex;
		font-size: px2rem(26);
		cursor: pointer;
		i{
			font-size: px2rem(36);
			color: gray;
			margin-right: px2rem(20);
		}
		.right{
			@include prix(flex, 1);
			@include flex(space-between);
			border-bottom: px2rem(.5) solid #ccc;
			height: 100%;
			div{
				height: 100%;
				line-height: px2rem(100);
				max-width: px2rem(600);
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}
}


</style>
