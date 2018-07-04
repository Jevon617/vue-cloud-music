// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import msgBox from './plugins/messageBox'
import DrawerLayout from 'vue-drawer-layout'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import VueLazyLoad from 'vue-lazyload'

Vue.use(VueLazyLoad,{
    error:'./static/error.png',
    loading:'./static/loading2.gif'
})



 
Vue.use(DrawerLayout)
Vue.use(msgBox)
Vue.use(VueAwesomeSwiper)
Vue.prototype.px2rem = window.hotcss.px2rem;


Vue.config.productionTip = false

window.$app = new Vue({
	el: '#app',
	router,
	store,
	components: { App },
	template: '<App/>'
})
