// 导入 axios 模块
import axios from 'axios';

// 创建 axios 实例，并设置基本配置
const request = axios.create({
    baseURL: 'http://geek.itheima.net/v1_0', // 基础 URL
    timeout: 5000 // 超时时间
});

// 添加请求拦截器
request.interceptors.request.use((config) => {
    // 在请求发送前做些什么
    return config;
}, (error) => {
    // 处理请求错误
    return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use((response) => {
    // 对 2xx 范围内的状态码进行处理
    return response.data;
}, (error) => {
    // 处理超出 2xx 范围的错误
    return Promise.reject(error);
});

// 导出 request 实例
export { request };