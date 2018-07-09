import axios from 'axios';

const $http = axios.create({
  baseURL: process.env.API_ROOT,   // 读取配置文件中的请求地址, 区分开发和生产环境
  withCredentials : true
});



export const login = (phone, password)=> $http('/login/cellphone',{params : { phone, password }});

export const getImages = ()=> $http('/banner');

// 推荐歌单
export const getSheet = ()=> $http('/recommend/resource');

// 推荐电台
export const getradios = ()=> $http('/program/recommend');

// 独家放送
export  const getSpecials = ()=>$http('/personalized/privatecontent');

// 推荐mv
export  const getMvs = ()=>$http('/personalized/mv');

// 每日推荐歌单
export const getDaySongs = ()=>$http('/recommend/songs');

// 获取歌词
export const getLyric = (id)=>$http('/lyric?id='+id);

