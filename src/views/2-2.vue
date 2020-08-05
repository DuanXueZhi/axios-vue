<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
</template>

<script>
/*
    axios请求方法：get、post、put、patch、delete

    get：获取数据
    post：提交数据（表单提交+文件上传）
    put：更新数据（所有数据都推送到后端）
    patch：更新数据（只将修改的数据推送到后端）
    delete：删除数据
*/
import axios from 'axios'

export default {
  name: 'Home',
  components: {},
  created() {
    // get
    axios.get('/data.json', {
      params: {
        id: 12
      }
    }).then(res => {
      console.log(res)
    })
    axios({
      method: 'get',
      url: '/data.json'
    }).then(res => {
      console.log(res)
    })
    // post(别名访问)
    // form-data 表单提交（图片、文件上传）multipart/form-data
    // application/json
    let data = {
      id: 12
    }
    axios.post('/post', data).then(res => {
      console.log(res)
    })
    axios({
      method: 'post',
      url: '/post',
      data: data
    }).then(res => {
      console.log(res)
    })
    // form-data请求
    let formData = new FormData()
    for(let key in data) {
      formData.append(key, data[key])
    }
    axios.post('/post', formData).then(res => {
      console.log(res)
    })

    // put
    axios.put('/put', data).then(res => {
      console.log(res)
    })
    // patch
    axios.patch('/patch'.data).then(res => {
      console.log(res)
    })

    // delete
    axios.delete('url', {
      params: {
        id: 12
      }
    }).then(res => {
      console.log(res)
    })
    axios.delete('url', {
      data: {
        id: 12
      }
    }).then(res => {
      console.log(res)
    })
    axios({
      method: 'delete',
      url: '/delete',
      parmas: {},
      data: {}
    }).then(res => {
      console.log(res)
    })
  }
}
</script>
