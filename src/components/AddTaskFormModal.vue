<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <el-button icon="el-icon-close" circle @click="$emit('closeModal')"></el-button>
          <div class="login__form">
            <el-form
              :model="noteData"
              status-icon
              label-position="top"
              :rules="noteRules"
              ref="noteData"
              label-width="120px"
            >
              <el-form-item label="title" prop="title">
                <el-input
                  type="text"
                  v-model="noteData.title"
                  autocomplete="off"
                  placeholder="Please input title"
                ></el-input>
              </el-form-item>
              <el-form-item label="description" prop="description">
                <el-input
                  type="textarea"
                  :rows="3"
                  v-model="noteData.description"
                  autocomplete="off"
                  placeholder="Please input description"
                ></el-input>
              </el-form-item>
              <el-form-item class="login__btn">
                <el-button type="primary" :disabled="isLoading" @click="submitForm('noteData')">
                  Add Note
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AddTaskFormModal',
  data: () => ({
    noteData: {
      title: '',
      description: '',
    },
    noteRules: {
      title: [
        {
          required: true,
          message: 'Please input title',
          trigger: ['blur', 'change'],
        },
        { min: 3, max: 50, message: 'Length should be 3 to 50', trigger: 'blur' },
      ],
      description: [
        {
          required: true,
          message: 'Please input description',
          trigger: ['blur', 'change'],
        },
        { min: 3, max: 200, message: 'Length should be 3 to 200', trigger: 'blur' },
      ],
    },
  }),
  computed: {
    ...mapGetters('task', ['isLoading']),
  },
  methods: {
    ...mapActions('task', ['addTask']),
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          await this.addTask({
            title: this.noteData.title,
            description: this.noteData.description,
          })
          this.$emit('closeModal')
        } else {
          return false
        }
      })
    },
  },
}
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 380px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}
.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
