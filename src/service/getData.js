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

// 推荐新音乐
export const getNewSongs = ()=>$http('/personalized/newsong');

// 获取歌词
export const getLyric = (id)=>$http('/lyric?id='+id);

// 获取全部歌单
export const getAllSheet = (limit)=>$http('/top/playlist?limit='+limit);

// 获取精品歌单
export const getFineSheet = (limit)=>$http('/top/playlist/highquality?limit='+limit);

// 获取歌单详情
export const getSheetDetail = (id)=>$http('/playlist/detail?id='+id);

// 获取歌单评论
export const getComment = (type,id,limit)=>$http(`/comment/${type}?id=${id}&limit=${limit}`);

// 给评论点赞或者取消
export const praise = (id,cid,t,type)=>$http(`/comment/like?id=${id}&cid=${cid}&t=${t}&type=${type}`)
