<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <el-button type="primary" @click="goTo('backTopOne')">backTop页面1</el-button>
    <el-button type="primary" @click="goTo('backTopTwo')">backTop页面1</el-button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  created() {
    axios.get('/data.json').then(res => {
      console.log(res)
    })
  },
  methods: {
    goTo(name) {
      this.$router.push({ name: name })
    }
  }
}
</script>
