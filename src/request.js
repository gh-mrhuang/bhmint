import axios from 'axios'

const data = {
  baseURL: '',
  timeout: 1000 * 60 * 2,
  headers: {}
}
// 创建axios 实例
const service = axios.create(data)

// 添加请求拦截器
service.interceptors.request.use()

// 添加响应拦截器
service.interceptors.response.use()

export default service
