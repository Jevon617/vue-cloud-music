import axios from 'axios'

const $http = axios.create({
  baseURL: process.env.API_ROOT   // 读取配置文件中的请求地址, 区分开发和生产环境
});



