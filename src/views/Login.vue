<template>
  <div class="login__form">
    <el-form :model="loginData" status-icon :rules="loginRules" ref="loginData" label-width="120px">
      <el-form-item label="email" prop="email">
        <el-input type="email" v-model="loginData.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="password" prop="password">
        <el-input type="password" v-model="loginData.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item class="login__btn">
        <el-button type="primary" :loading="isLoading" @click="submitForm('loginData')">
          <span v-if="isLoggedIn">Go to my Notes</span>
          <span v-else>Login</span>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Notification } from 'element-ui'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Login',
  data: () => ({
    loginData: {
      email: '',
      password: '',
    },
    loginRules: {
      email: [
        {
          required: true,
          type: 'email',
          message: 'Please input a valid email',
          trigger: ['blur', 'change'],
        },
      ],
      password: [{ required: true, trigger: 'blur' }],
    },
  }),
  computed: {
    ...mapGetters('auth', ['isLoading', 'getErrors', 'isLoggedIn']),
  },
  methods: {
    ...mapActions('auth', ['login']),
    submitForm(formName) {
      if (this.isLoggedIn) {
        this.$router.push({ name: 'Tasks' })
        return
      }
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          await this.login({
            email: this.loginData.email,
            password: this.loginData.password,
          })
          if (this.getErrors) {
            this.errorMessages()
          } else {
            this.$router.push({ name: 'Tasks' })
          }
        } else {
          return false
        }
      })
    },
    errorMessages() {
      Object.entries(this.getErrors).forEach(([key, error]) => {
        setTimeout(() => {
          Notification({
            title: 'Error',
            message: `${key}: ${error}`,
            type: 'error',
            closable: true,
            duration: 5000,
          })
        }, 0)
      })
    },
  },
}
</script>

<style>
.login__form {
  margin: 0 auto;
  max-width: 720px;
  text-align: center;
}
</style>
