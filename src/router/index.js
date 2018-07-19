import Vue     from 'vue'
import Router  from 'vue-router'
import home    from '../pages/home.vue'
import login   from '../pages/login.vue'
import main    from '../pages/main.vue'
import manage  from '../pages/manage.vue'
import music   from '../pages/music.vue'
import radio   from '../pages/radio.vue'
import search  from '../pages/search.vue'
import rSongs  from '../pages/recommendSongs.vue'
import mplay   from '../pages/music_play.vue'
import sheets  from '../pages/songsheets.vue'
import sheet   from '../pages/songsheet.vue'
import comment from '../pages/comment.vue'
import quality from '../pages/highquality.vue'
import rank    from '../pages/rank.vue'






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
    },
    {
      path : '/mplay',
      name : 'mplay',
      component: mplay
    },
    {
      path : '/sheets',
      name : 'sheets',
      component: sheets
    },
    {
      path : '/sheet',
      name : 'sheet',
      component: sheet
    },
    {
      path : '/comment',
      name : 'comment',
      component: comment
    },
    {
      path : '/quality',
      name : 'quality',
      component: quality
    },
    {
      path : '/rank',
      name : 'rank',
      component: rank
    }
  ]
})
