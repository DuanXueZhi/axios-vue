<template>
  <div class="login">
    <h1>普通登录组件</h1>
    <div class="account">
      <account-login :rule-form="ruleForm" :rules="rules" @submit="submit" @errHandle="errHandle"></account-login>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      ruleForm: {
        userName: '',
        password: ''
      },
      rules: {
        username: [
          {required: true, message: '用户名不为空', trigger: 'blur'},
          {min: 2, max: 6, message: '用户名在2-6个字符之间', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '用户密码不为空', trigger: 'blur'},
          {min: 6, max: 15, message: '用户密码在6-15个字符之间', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submit() {
      this.$message.success('提交成功')
    },
    errHandle() {
      this.$message.error('表单填写有误，请检查')
    }
  }
}
</script>

<style scoped lang="less">
  .login {
    .account {
      width: 500px;
      margin: auto;
    }
  }
</style>
