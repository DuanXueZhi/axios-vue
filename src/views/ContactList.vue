<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <!-- 联系人列表 -->
    <van-contact-list :list="list" @add="onAdd" @edit="onEdit" />
    <!-- 联系人编辑 -->
    <van-popup v-model="showEdit" position="bottom"><!-- 弹窗 -->
      <van-contact-edit
          :contact-info="editingContact"
          :is-edit="isEdit"
          @save="onSave"
          @delete="onDelete"
      />
    </van-popup>

  </div>
</template>

<script>
import axios from 'axios'
import { ContactList, Toast, ContactEdit, Popup } from 'vant'

export default {
  name: 'Home',
  components: {
    [ContactList.name]:ContactList,
    // [Toast.name]:Toast, // 在dom中没有使用则不需要注册
    [ContactEdit.name]:ContactEdit,
    [Popup.name]:Popup
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
      instance: null, // axios实例
      showEdit: false, // 编辑弹窗展示变量
      editingContact: {},
      isEdit: false
    }
  },
  created() {
    // 创建实例
    this.instance = axios.create({
      baseURL: 'http://localhost:9000/api',
      timeout: 1000
    })
    this.getList()
  },
  methods: {
    // 获取联系人列表
    getList() {
      this.instance.get('/contactList').then(res => {
        this.list = Object.freeze(res.data.data)
      }).catch(err => {
        Toast(`请求失败，请稍后重试${err}`)
      })
    },

    // 添加联系人
    onAdd() {
      this.showEdit = true
      this.isEdit = false // 保险起见
    },

    // 编辑联系人
    onEdit(info) {
      this.showEdit = true
      this.isEdit = true // 保险起见
      this.editingContact = info
    },

    // 保存联系人
    onSave(info) {
      if (this.isEdit) { // 编辑保存
        this.instance.put('/contact/edit', info).then(res => {
          if (res.data.code === 200) {
            Toast('编辑成功')
            this.showEdit = false
            this.getList()
          }
        }).catch(err => {
          Toast(`请求失败，请稍后再试${err}`)
        })
      } else { // 新建保存
        this.instance.post('/contact/new/json', info).then(res => {
          if (res.data.code === 200) {
            Toast('新建成功')
            this.showEdit = false
            this.getList()
          }
        }).catch(err => {
          Toast(`请求失败${err}`)
        })
      }
    },

    // 删除联系人
    onDelete(info) {
      this.instance.delete('/contact', { params: { id: info.id }}).then(res => {
        if (res.data.code === 200) {
          Toast('删除成功')
          this.showEdit = false
          this.getList()
        }
      }).catch(err => {
        Toast(`请求失败${err}`)
      })
    },
  }
}
</script>
