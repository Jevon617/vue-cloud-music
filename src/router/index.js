import Vue    from 'vue'
import Router from 'vue-router'
import home   from '../pages/home.vue'
import login  from '../pages/login.vue'
import main   from '../pages/main.vue'
import manage from '../pages/manage.vue'
import music  from '../pages/music.vue'
import radio  from '../pages/radio.vue'
import search from '../pages/search.vue'
import rSongs from '../pages/recommendSongs.vue'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/main',
      name: 'main',
      component: main,
      redirect : '/main/music',
      children : [
        {
          path: '/main/manage',
          name: 'manage',
          component: manage
        },
        {
          path: '/main/music',
          name: 'music',
          component: music
        },
        {
          path: '/main/radio',
          name: 'radio',
          component: radio
        }
      ]
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path : '/rsongs',
      name : 'rsongs',
      component: rSongs
    }
  ]
})
