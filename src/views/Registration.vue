<template>
  <div class="reg__form">
    <el-form
      :model="regFormData"
      status-icon
      :rules="regRules"
      ref="regFormData"
      label-width="120px"
    >
      <el-form-item label="email" prop="email">
        <el-input type="email" v-model="regFormData.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="password" prop="password">
        <el-input type="password" v-model="regFormData.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item class="reg__btn">
        <el-button type="primary" :loading="isLoading" @click="submitForm('regFormData')">
          <span v-if="isLoggedIn">Go to my Notes</span>
          <span v-else>Register</span>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Notification } from 'element-ui'
import { passValidator } from '../helpers/passValidator'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Register',
  data: () => ({
    regFormData: {
      email: '',
      password: '',
    },
    regRules: {
      email: [
        {
          required: true,
          type: 'email',
          message: 'Please input a valid email',
          trigger: ['blur', 'change'],
        },
      ],
      password: [{ required: true, validator: passValidator, trigger: 'blur' }],
    },
  }),
  computed: {
    ...mapGetters('auth', ['isLoading', 'getErrors', 'isLoggedIn']),
  },
  methods: {
    ...mapActions('auth', ['register']),
    submitForm(formName) {
      if (this.isLoggedIn) {
        this.$router.push({ name: 'Tasks' })
        return
      }
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          await this.register({
            email: this.regFormData.email,
            password: this.regFormData.password,
          })
          if (!this.getErrors) {
            this.$router.push({ name: 'Tasks' })
          } else {
            this.errorMessages()
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
.reg__form {
  margin: 0 auto;
  max-width: 720px;
  text-align: center;
}
.reg__btn {
  margin-top: 32px;
}
</style>
