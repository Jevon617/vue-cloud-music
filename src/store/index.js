import Vuex from 'vuex';
import Vue from 'vue';
import mutations from './mutations';
import getters from './getters.js'

Vue.use(Vuex);

const state = {
	userInfo 	 : JSON.parse(localStorage.getItem('userInfo'))|| {},
	profile  	 : JSON.parse(localStorage.getItem('profile')) || {},
	songs    	 : JSON.parse(localStorage.getItem('songs'))   || [],
	currentIndex : -1,
}

export default new Vuex.Store({
	state,
	getters,
	mutations
})