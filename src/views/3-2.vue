<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'axios3-2',
  components: {},
  created() {
    axios.create({
      baseURL: 'http://localhost:8080',
      timeout: 1000, // 【及时释放】
      url: '/data.json', // 请求路径
      method: 'get',
      headers: { // 设置请求头
        token: ''
      },
      params: {}, // 参数拼接到url
      data: {}, // 参数放在请求体
    })

    /**
     * 参数配置（优先级由低到高 全局 < 实例 < 请求）
     */
    // 1.axios全局配置(defaults)
    axios.defaults.timeout = 1000
    axios.defaults.baseURL = 'http://localhost:8080'
    // 2.axios实例配置
    let instance = axios.create() // 无参数则使用全局配置
    instance.defaults.timeout = 3000
    // 3.axios请求配置
    instance.get('/data.json', {
      timeout: 5000
    })

    /**
     * 实际开发
     */
    // 两种请求接口
    let axiosInstance = axios.create({
      baseURL: 'http://localhost:9090',
      timeout: 1000
    })
    let axiosInstance1 = axios.create({
      baseURL: 'http://localhost:9091',
      timeout: 3000
    })
    axiosInstance.get('/data.json', { params: 12 }).then(res => {
      console.log(res)
    })
    axiosInstance1.get('/data.json', { timeout: 5000 }).then(res => {
      console.log(res)
    })
  }
}
</script>
