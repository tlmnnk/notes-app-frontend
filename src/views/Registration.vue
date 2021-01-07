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
        <el-button type="primary" :disabled="isLoading" @click="submitForm('regFormData')">
          Register
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
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
    ...mapGetters('auth', ['isLoading']),
  },
  methods: {
    ...mapActions('auth', ['register']),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.register({
            email: this.regFormData.email,
            password: this.regFormData.password,
          })
          this.$router.push({ name: 'Tasks' })
        } else {
          return false
        }
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
