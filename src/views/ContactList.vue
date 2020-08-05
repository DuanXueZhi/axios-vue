<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <!-- 联系人列表 -->
    <van-contact-list :list="list" @add="onAdd" @edit="onEdit" />
  </div>
</template>

<script>
import axios from 'axios'
import { ContactList, Toast } from 'vant'

export default {
  name: 'Home',
  components: {
    [ContactList.name]:ContactList,
    [Toast.name]:Toast
  },
  data() {
    return {
      list: [
        {
          id: 1,
          name: '',
          tel: ''
        }
      ],
      instance: null // axios实例
    }
  },
  created() {
    // 创建实例
    this.instance = axios.create({
      baseURL: 'http://localhost:9000/api',
      timeout: 1000
    })
    this.instance.get('/contactList').then(res => {
      this.list = res.data.data
    }).catch(err => {
      Toast('请求失败，请稍后重试')
    })
  },
  methods: {
    // 添加联系人
    onAdd() {},
    // 编辑联系人
    onEdit() {}
  }
}
</script>
