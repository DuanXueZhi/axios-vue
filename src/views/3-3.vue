<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
</template>

<script>
// 拦截器：在请求相应被处理前拦截他们
// 请求拦截器，响应拦截器
import axios from 'axios'

export default {
  name: 'Axios3-3',
  components: {},
  created() {
    // 请求拦截器
    axios.interceptors.request.use(config => {
      // 在请求前做些什么
      return config
    }, err => {
      // 在请求错误的时候做些什么
      return Promise.reject(err)
    })
    // 响应拦截器
    axios.interceptors.response.use(res => {
      // 请求成功对响应数据做处理
      return res
    }, err => {
      // 响应错误做些什么
      return Promise.reject(err)
    })
    // 使用
    axios.get('/data.json').then().catch()
    // 取消拦截器
    let interceptors = axios.interceptors.request.use(config => {
      config.headers = { auth: true }
      return config
    })
    axios.interceptors.request.eject(interceptors)

    // 实际开发 登录状态
    // 需要登录的接口
    let instance = axios.create({})
    instance.interceptors.request.use(config => {
      config.headers.token = '' // 点方法直接负值token
      return config
    })
    // 不需要登录的接口
    let newInstance = axios.create({})

    // 移动端开发
    let instance_phone = axios.create({})
    instance_phone.interceptors.request.use(config => {
      $('#modal').show() // 请求弹窗展示
      return config
    })
    instance_phone.interceptors.response.use(res => {
      $('#modal').hide() // 请求弹窗隐藏
      return res
    })
  }
}
</script>
