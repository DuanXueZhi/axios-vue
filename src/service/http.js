import axios from 'axios'
import service from './contactApi'
import { Toast } from 'vant'

// service 循环遍历输出不同的请求方法
let instance = axios.create({
  baseURL: 'http://localhost:9000/api',
  timeout: 1000
})
const Http = {} // 包裹请求方法的容器

// 请求格式/参数的统一
for (let key in service) {
  let api = service[key] // url method
  Http[key] = async function (params, isFormData, config = {}) {
    let newParams = {}
    // content-type是否是form-data的判断
    if (params && isFormData) {
      newParams = new FormData()
      for (let i in params) {
        newParams.append(i, params[i])
      }
    } else {
      newParams = params
    }
    // 不同请求的判断
    let response = {} // 请求返回值
    if (api.method === 'put' || api.method === 'post' || api.method === 'patch') {
      try {
        response = await instance[api.method](api.url, newParams, config)
      } catch (err) {
        response = err
      }
    } else if (api.method === 'delete') {
      config.params = newParams // config.data = newParams
      try {
        response = await instance[api.method](api.url, config)
      } catch (err) {
        response = err
      }
    } else {
      // get请求
      config.params = newParams
      try {
        response = await instance[api.method](api.url, config)
      } catch (err) {
        response = err
      }
    }
    return response // 返回响应值
  }
}

// 拦截器
instance.interceptors.request.use(config => {
 // 发起前
  Toast.loading({
    mask: false,
    duration: 0, // 一直存在
    forbidClick: true, // 禁止点击
    message: '加载中'
  })
  return config
}, err => {
  // 请求错误
  Toast.clear()
  Toast(`相应失败，请稍后重试${err}`)
})
// 相应拦截器
instance.interceptors.response.use(res => {
  Toast.clear()
  if (res.status === 200) {
    return res.data
  }
}, err => {
  Toast.clear()
  Toast(`相应失败，请稍后重试${err}`)
})

export default Http
