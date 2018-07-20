<template>
    <div calss="history">
    	<heador>
    		<div slot="middle">最近播放</div>
    		<div slot="right" style="text-align: right">清空</div>
    	</heador>
    	<music-item v-for=""></music-item>

    </div>
</template>

<script>
import { getHistory } from '../service/getData.js';
import musicItem      from '../components/music-item.vue';
import heador         from '../components/common/header.vue';
export default {
	data(){
		return{
			history : []
		}
	},
	methods:{
		async getHistory(){
			let uid = JSON.parse(localStorage.getItem('userinfo'));
			if(!uid)this.$router.push('/');

			let res = await getHistory(uid);
			this.history = res.data.code == 200 && res.data.weekData;

		}

	},
	components:{
		heador,
		musicItem
	}
    
}
</script>



<style scoped  lang="scss">


</style>
