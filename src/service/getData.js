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

// 搜索
export const search = (keywords, limit, type=1) => $http(`/search?keywords=${keywords}&limit=${limit}&type=${type}`);

// 获取热门标签
export const getHots = ()=>$http('/search/hot');

// 获取搜索建议
export const getSuggest = (keywords)=>$http(`/search/suggest?keywords=${keywords}&limit=10`);

// 获取专辑
export const getAlbum = (id)=>$http('/album?id='+id);

// 私人FM
export const getPersonalFM = ()=>$http('/personal_fm');

// 获取个人歌单
export const getPersonalSheet = (uid)=>$http('/user/playlist?uid='+uid);

// 新建歌单
export const bulidSheet = (name)=>$http('/playlist/create?name='+name);

// 更新歌单
export const updateSheet = (id, name, desc, tags)=>$http(`/playlist/update/?id=${id}&name=${name}&desc=${desc}&tags=${tags}`);

// 获取排行榜
export const getRankList = (idx)=>$http('/top/list?idx=' + idx);

// 获取历史记录
export const getHistroy = (uid)=>$http(`/user/record?uid=${uid}&type=1`);