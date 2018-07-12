<template>
    <div class="music_play">
        <div class="bg"></div>

    	<div class="header">
            <div class="back" @click="$router.go(-1)"></div>
            <div class="info">
                <div class="title">{{ $play.name }}</div>
                <div class="author">
                    <span>{{ $play.artists[0].name}}</span>
                    <span class="icon"></span>
                </div>
            </div>
            <div class="share"></div>   
        </div>

        <div class="allbox">
            <div class="wrapper" ref="scroll" @click="hide('lyric')"
                 :style="{ zIndex : zIndex1 }">

                <div class="content" v-if="$store.state.lyric.length">

                    <div class="item" v-for="item,i in $store.state.lyric" 
                         :ref="'$'+item[0].split('.')[0]"
                         :class="{ on : $time == '$'+ item[0].split('.')[0]}">
                        {{ item[1] }}
                    </div>
                </div>

                <div class="none" v-show="!$store.state.lyric.length">正在加载歌词...</div>
            </div>

            <div class="disk_wrapper" @click="hide('disk')" :style="{ zIndex : zIndex2 }">

                <div class="box">
                    <div class="needle" :class="{ paused : $store.state.states == 'paused'  }"></div>
                    <div class="disk">
                        <img :src="$play.album.picUrl" :style="{transform:'rotate('+deg+'deg)'}">
                    </div>
                </div>

                <div class="btns">
                    <div class="love"></div>
                    <div class="download"></div>
                    <div class="comment" @click="goComment"></div>
                    <div class="more" @click="showFunList"></div>
                </div>

            </div>
        </div>
    	
        <div class="progress">
            <progress-line :precent="$store.state.currentTime/($play.duration/1000)"
                           :currentTime="s2m($store.state.currentTime)"
                           :duration="s2m($play.duration/1000)"
                           @setProgress="setProgress">
            </progress-line>
        </div>

        <div class="player">

            <div class="type" @click="changeType"
                 :class="{ random : $store.state.type == '随机播放',
                           recycle: $store.state.type == '列表循环',
                           one    : $store.state.type == '单曲循环' }">
            </div>

            <div class="choose">
                <div class="pre" @click="playPre"></div>

                <div class="middle" @click="play"
                     v-show="$store.state.states == 'paused'"></div>

                <div class=" middle middle2" @click="pause"
                     v-show="$store.state.states == 'playing'"></div>

                <div class="next" @click="playNext"></div>

            </div>
            <div class="list" @click="showList"></div>
        </div>
    </div>
</template>

<script>

import Bscroll        from 'better-scroll';
import { Bus }        from '../bus.js';
import { s2m, m2s }   from '../service/utlis.js';
import { mapGetters } from 'vuex';
import progressLine   from '../components/progress-line.vue';

export default {
    data(){
        return{
            loading : false,
            lyric   : [],
            scroll  : null,
            precent : 0,
            type    : ['随机播放', '单曲循环', '列表循环'],
            count   : 0,
            current : localStorage.getItem('lyric_pos') || '00:00',
            deg     : 10,
            timer   : null,
            startx  : null,
            starty  : null,
            zIndex1 : 13,
            zIndex2 : 15,
            map     : {}
        }
    },
    created(){
        console.log(this.$play);
        this.$store.state.lyric.length && this.initMap(); 
        this.count = this.type.findIndex((value)=>{
            return value == this.$store.state.type;
        });
        
    },
    mounted(){
        this.initScroll();
        this.$store.state.states == 'playing' && this.rotate(true);
        Bus.$on('playing',()=>{ 
            this.rotate(true) ;
        });
    },
    beforeRouteLeave(to, from, next){
        /*退出时清空所有定时器*/
        this.timer && clearInterval(this.timer);
        next();
    },
    methods:{

        /*初始化bscroll*/
        initScroll(){
            this.$nextTick(()=>{
                this.scroll = this.$refs.scroll
                && new Bscroll(this.$refs.scroll,{click:true}) || null;
            });
        },

        showList(e){
            e.stopPropagation();
            Bus.$emit('showList')
        },
        showFunList(e){
            e.stopPropagation();
            Bus.$emit('showFunList',this.$play);

        },
        changeType(){
            this.count++;
            this.$store.state.type = this.type[this.count%3];
            localStorage.setItem('list_type',  this.$store.state.type);
        },
        playPre(){
           Bus.$emit('play_pre');
        },
        play(){
            Bus.$emit('play_music');
            this.$store.state.states = "playing";
            this.rotate();
        },
        pause(){
            Bus.$emit('pause_music');
            this.$store.state.states = "paused";
            this.timer && clearInterval(this.timer);
        },
        playNext(){
           Bus.$emit('play_next');
        },

        /*显示或隐藏歌词界面和光碟*/
        hide(word){
            if(word == 'lyric'){
                this.zIndex1 = 13;
                this.zIndex2 = 15;
            }else{
                this.zIndex1 = 15;
                this.zIndex2 = 13;
            }
        },

        /*光碟旋转动画*/
        rotate(clear){
            if(clear) this.deg = 0;
            this.timer && clearInterval(this.timer);
            this.timer = setInterval(()=>{
                this.deg = this.deg + 0.6;
                if(this.deg >= 360) this.deg = 0;
            },50)
        },

        s2m(s){
            return s2m(s);
        },

        /*设置进度条*/
        setProgress(precent){
            Bus.$emit('setProgress',Math.floor(this.$play.duration/1000 * precent))
        },

        /*初始化歌词map*/
        initMap(){
            this.map = {};
            for(let i=0; i<this.$store.state.lyric.length; i++){

                let r = this.$store.state.lyric[i][0];

                this.map['$'+r.split('.')[0]] = [];
                this.map['$'+r.split('.')[0]].push(m2s(r));

                if(i == this.$store.state.lyric.length-1){
                    this.map['$'+r.split('.')[0]].push(this.$play.duration/1000);
                }else{
                    this.map['$'+r.split('.')[0]].push(m2s(this.$store.state.lyric[i+1][0]));
                }
            }
        },
        // 评论
        goComment(){
            this.$router.push({
                path : '/comment',
                query:{
                    id       : this.$play.id,
                    url      : this.$play.album.picUrl,
                    nickname : this.$play.artists[0].name,
                    tip      : this.$play.name,
                    type     : 'music'
                }
            })
        }
    },

    computed:{

        ...mapGetters([
            '$play'
        ]),

        /*根据当前时间结合map返回key*/
        $time(){
            let c = this.$store.state.currentTime;
            for(let key in this.map){
                if( c >= this.map[key][0] && c < this.map[key][1] ){
                    return key
                }
            }
        },

        $lyric(){
            return this.$store.state.lyric;
        }
    },
    watch:{

        /*观察歌词数组,初始化*/
        $lyric(){
            if(this.$store.state.lyric.length){
                this.initScroll();
                this.initMap(); 
                for(let key in this.$refs){
                    /*切换歌曲后,dom销毁, 但是this.refs的对象key并未相应删除,手动删除*/
                    this.$refs[key] instanceof Array
                    && !this.$refs[key].length
                    && delete this.$refs[key]
                }
            }
        },

        /*监听时间的变化,歌词滚动*/
        $time(){ 
            let el = this.$refs[this.$time];
            if(!el) return;
            this.scroll && this.scroll.scrollToElement(el[0],500,0,-400);
        }
    },
    components:{
        progressLine
    }
}
</script>

<style scoped  lang="scss">

@import '../scss/px2rem.scss';
@import '../scss/mixin.scss';

.music_play{
	height: 100%;
    color: white;
    position: relative;
    /* 渐变色 */
    background-image: linear-gradient(147deg, #77776b 0%, #805f5f 49%, #6d1a1a 100%);
    font-size: px2rem(28);
    z-index: 10;
    .bg{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 14;
        background-image: linear-gradient(147deg, #77776b 0%, #805f5f 49%, #6d1a1a 100%);
    }
    .header{
        height: px2rem(120);
        line-height: px2rem(120);
        @include flex(space-around);
        background-size: 100% 1%;
        background-repeat: no-repeat;
        background-position: bottom;
        background-image: linear-gradient(147deg, #77776b 0%, #ccc 49%, #6d1a1a 100%);
        z-index: 14;
        position: relative;
        .back{
            width: px2rem(120);
            height: px2rem(120);
            @include bg('../images/back.svg');
            background-size: 40% 40%;
            background-position: center center;
        }
        .share{
            width: px2rem(120);
            height: px2rem(120);
            @include bg('../images/share_b.svg');
            background-size: 40% 40%;
            background-position: center center;
        }
        .info{
            @include prix(flex, 1);
            font-size: px2rem(32);
            .title{
                line-height: px2rem(70);
                max-width: px2rem(510);
                overflow: hidden;
                white-space: normal;
                height: px2rem(70);
                text-align: left;
            }
            .author{
                font-size: px2rem(24);
                line-height: px2rem(50);
                height: px2rem(50);
                max-width: px2rem(510);
                overflow: hidden;
                white-space: normal;
                @include flex;
                color: #bfbfbf;
                .icon{
                    width: px2rem(22);
                    height: px2rem(22);
                    display: inline-block;
                    @include bg('../images/goto_b.svg');
                }
            }
        }
    }
    .allbox{
        height: 75vh;
        position: relative;
    }
    .wrapper{
        width: 100%;
        height: 75vh;
        overflow: scroll;
        position: absolute;
        z-index: 14;
        top: 0;
        left: 0;
        .content{
            min-height: 75vh;
            padding-top: px2rem(30);
            .item{
                min-height: px2rem(45);
                line-height: px2rem(45);
                width: px2rem(500);
                text-align: center;
                color: #afafaf;
                margin: px2rem(45) auto;
            }
            .on{
                color: white;
            }
        }
        .none{
            line-height: px2rem(200);
            color: #afafaf;
            text-align: center;
            font-size: px2rem(32);
        }
    }
    .disk_wrapper{
        width: 100%;
        height: 75vh;
        @include padding(px2rem(150) 0 0);
        position: absolute;
        overflow: hidden;
        z-index: 13;
        top: 0;
        left: 0;
        .box{
            height: px2rem(550);
            @include bg('../images/disk_bg.png');
            background-position: center center;
            @include flex(center);
        }
        .disk{
            width: px2rem(540);
            height: px2rem(540);
            @include bg('../images/disk_circle.png');
            @include flex(center);
            img{
                width: 66%;
                height: 66%;
                border-radius: 50%;
            }
        }
        .needle{
            width: px2rem(200);
            height: px2rem(270);
            position: absolute;
            @include bg('../images/needle.png');
            top:-3.5%;
            left: 50%;
            transform-origin: 20% 10%;
            @include prix(transform, rotate(15deg));
            transition: all .5s ease;  
        }
        .paused{
            @include prix(transform, rotate(0deg));
        }
        .btns{
            width: px2rem(500);
            height: px2rem(250);
            @include flex(space-between);
            margin: px2rem(80) auto;
            div{
                width: px2rem(50);
                height: px2rem(50);
            }
            .love{
                @include bg('../images/love_g.svg')
            }
            .download{
                @include bg('../images/download_g.svg')
            }
            .comment{
                @include bg('../images/comment_g.svg')
            }
            .more{
                @include bg('../images/more_g.svg')
            }
        }
    }
   
   
    .progress{
        z-index: 14;
        position: relative;
        width: 100%;
        @include padding( px2rem(20));
    }
    .player{
        z-index: 14;
        position: relative;
        @include padding(px2rem(20) px2rem(50));
        height: px2rem(100);
        @include flex(space-between);
        .type, .list{
            width: px2rem(55);
            height: px2rem(55);
        }
        .type{
            @include bg('../images/random.svg');
        }
        .random{
            @include bg('../images/random.svg');
        }
        .one{
            @include bg('../images/one.svg');
        }
        .recycle{
            @include bg('../images/recycle.svg');
        }
        .list{
            @include bg('../images/list_w.svg');
        }
        .choose{
            width: 55%;
            height: 100%;
            @include flex(space-between);
            .pre{
                width: px2rem(60);
                height: px2rem(60);
                @include bg('../images/pre.svg');
            }
            .next{
                width: px2rem(60);
                height: px2rem(60);
                @include bg('../images/next.svg');
            }
            .middle{
                width: px2rem(80);
                height: px2rem(80);
                border-radius: 50%;
                border: px2rem(4) solid #bfbfbf;
                @include bg("../images/play_c.svg");
                background-size: 70% 70%;
                background-position: 70% center;
            }
            .middle2{
                @include bg("../images/stop.svg");
                background-size: 60% 60%;
                background-position: center center;
            }
        }
    }
}



</style>
