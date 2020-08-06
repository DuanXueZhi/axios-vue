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
    async getList() {
      let res = await this.$Http.getContactList()
      this.list = Object.freeze(res.data)
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
    async onSave(info) {
      if (this.isEdit) { // 编辑保存
        let res = await this.$Http.editContact(info)
        if (res.code === 200) {
          Toast('编辑成功')
          this.showEdit = false
          await this.getList()
        }
      } else { // 新建保存
        let res = await this.$Http.newContactForm(info, true)
        if (res.code === 200) {
          Toast('新建成功')
          this.showEdit = false
          await this.getList()
        }
      }
    },

    // 删除联系人
    async onDelete(info) {
      let res = await this.$Http.delContact({ id: info.id })
      if (res.code === 200) {
        Toast('删除成功')
        this.showEdit = false
        await this.getList()
      }
    },
  }
}
</script>
