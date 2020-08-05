<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
</template>

<script>
// 错误处理：请求错误时进行的处理
import axios from 'axios'

export default {
  name: 'Home',
  components: {},
  created() {
    axios.interceptors.request.use(config => {
      return config
    }, err => {
      return Promise.reject(err)
    })
    axios.interceptors.response.use(res => {
      return res
    }, err => {
      return Promise.reject(err)
    })
    axios.get('/data.json').then(res => {
      console.log(res)
    }).catch(err => { // 请求错误、响应错误
      console.log(err)
    })

    // 例子：实际开发过程中，一般添加统一的错误处理
    let instance = axios.create({})
    instance.interceptors.request.use(config => {
      return config
    }, err => {
      // 请求错误 一般http状态码4xx 400 401 404
      $('#modal').show()
      setTimeout(() => {
        $('#modal').hide()
      }, 2000)
      return Promise.reject(err)
    })
    instance.interceptors.response.use(res => {
      return res
    }, err => {
      // 响应错误 一般http状态码5xx，500 502
      $('#modal').show()
      setTimeout(() => {
        $('#modal').hide()
      }, 2000)
      return Promise.reject(err)
    })
    instance.get('data.json').then(res => {
      console.log(res)
    })
  }
}
</script>
