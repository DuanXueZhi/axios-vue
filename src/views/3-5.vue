<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
</template>

<script>
// 用于取消正在进行的http请求
import axios from 'axios'

export default {
  name: 'Home',
  components: {},
  created() {
    let source = axios.CancelToken.source() // 生成source对象
    axios.get('/data.json', {
      cancelToken: source.token
    }).then(res => {
      console.log(res)
    }).catch(err => { // 取消请求进入catch方法
      console.log(err)
    })

    // 取消请求(message可选)
    source.cancel('cancel http')

    // 什么情况下可能用到取消请求
    // 商城3-5秒
  }
}
</script>
