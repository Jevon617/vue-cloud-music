<template>
    <div class="checkbox">
    	<check-item v-for="item in songs"></check-item>
    	
    </div>
</template>

<script>
import checkItem from '../components/check-item.vue';

export default {
	data(){
		songs : []
	},
	components:{
		checkItem
	}
}
</script>

<style scoped  lang="scss">

</style>
