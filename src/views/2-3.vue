<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
</template>

<script>
// 并发请求：同时惊醒多个请求，并统一处理返回值
import axios from 'axios'

export default {
  name: 'axios2-3.',
  components: {},
  created() {
    // axios。all() axios.spread()
    axios.all(
      [
        axios.get('/data.json'),
        axios.get('/city.json')
      ]
    ).then(
      axios.spread((dataRes, cityRes) => { // 分割不同返回值，参数对应请求
        console.log(dataRes, cityRes)
      })
    )
  }
}
</script>
