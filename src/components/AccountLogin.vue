<template>
  <div>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="90px">
      <el-form-item label="账号" prop="username">
        <el-input v-model="ruleForm.username">
          <i slot="prefix" class="el-icon-user"></i>
        </el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" show-password>
          <i slot="prefix" class="el-icon-lock"></i>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 100%;" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'AccountLogin',
  props: {
    ruleForm: {
      type: Object,
      required: true
    },
    rules: {
      type: Object,
      required: true
    }
  },
  methods: {
    login() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$emit('submit')
        } else {
          this.$emit('errHandle')
        }
      })
    }
  }
}
</script>

<style scoped lang="less">

</style>
