<template>
    <div id="app">
        <vue-drawer-layout ref="drawer" :drawer-width="600" 
            :enable="true" :animatable="true"
            :z-index="0" :drawable-distance="Math.floor(800/3)"
            :content-drawable="true" :backdrop="true">

                <div class="drawer-content" slot="drawer">
                    <div class="leftMenu">我是侧滑菜单</div>
                </div>
                
                <div slot="content" class="container">
                    <player imgurl="http://p1.music.126.net/HQxTggMCB7AHUXN-ZFEtmA==/1371091013186741.jpg"
                     title="小半">
                    </player>

                    <mlist ref="list" :list="$store.state.songs"></mlist>

                    <flist ref="flist" :song="song"></flist>
                    <router-view/>
                </div>
        </vue-drawer-layout>
    </div>
</template>

<script>

import player  from './components/player.vue';
import mlist   from './components/music_list.vue';
import flist   from './components/funlist.vue';
import { Bus } from "./bus.js";

export default {
    data(){
        return{
            song : {}
        }
    },
    components:{
        player,
        mlist,
        flist
    },
    mounted(){
        Bus.$on('toggleMenu', ()=>{
            this.$refs.drawer.toggle();
        });
        Bus.$on('showList', ()=>{
            this.$refs.list.showList();
        });
        Bus.$on("showFunList", (song)=>{
            console.log(song);
            this.song = song;
            this.$refs.flist.showList();
        })
    }
}
</script>

<style  lang="scss">
@import "./scss/px2rem";
@import "./scss/common.scss";
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
    background-color: white;
    letter-spacing:px2rem(3);
    box-sizing: border-box;
    overflow: hidden;
    .container{
        height: 100%;
        padding-bottom: px2rem(110);
        padding-top: px2rem(120);
    }
   

}
</style>
