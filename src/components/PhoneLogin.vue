<template>
  <div>
    <el-form ref="phoneForm" :model="phoneForm" :rules="rules">
      <el-form-item prop="phone">
        <el-input v-model="phoneForm.phone">
          <i slot="prefix" class="el-icon-phone"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-row :gutter="20">
          <el-col :span="16">
            <el-input v-model="phoneForm.code">
              <i slot="prefix" class="el-icon-tickets"></i>
            </el-input>
          </el-col>
          <el-col :span="8">
            <el-button style="width: 100%;" @click="sendCode" :disabled="disabled">{{btnText}}</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 100%;" @click="phoneLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "PhoneLogin",
  props: {
    phoneForm: {
      type: Object,
      required: true
    },
    countDown: {
      type: Number,
      default: 60
    }
  },
  data() {
    let checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      } else {
        let reg = /^1[3|4|5|7|8|9][0-9]{9}$/
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('手机号错误'))
        }
      }
    }
    return {
      rules: {
        phone: [
          { validator: checkPhone, trigger: 'change' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'blur' }
        ]
      },
      disabled: false,
      btnText: '发送验证码',
      time: 0
    }
  },
  mounted() {
    this.time = this.countDown
  },
  methods: {
    sendCode() {
      // 手机号必须正确，否则提示
      this.$refs.phoneForm.validateField('phone', errorMessage => {
        console.log(errorMessage)
        if (errorMessage) {
          this.$message.error(errorMessage)
        } else {
          // 倒计时
          // 按钮禁用
          // 倒计时结束，按钮、文字恢复
          // 倒计时过程中按钮文字改变
          let timer = setInterval(() => {
            this.time --
            this.btnText = `${this.time}s后重新发送`
            this.disabled = true
            if (this.time === 0) {
              this.disabled = false
              this.btnText = '发送验证码'
              this.time = this.countDown
              clearInterval(timer)
            }
          }, 1000)
          this.$emit('send')
        }
      })
    },
    phoneLogin() {
      this.$refs.phoneForm.validate(valid => {
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

<style scoped>

</style>
