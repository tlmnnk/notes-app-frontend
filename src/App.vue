<template>
  <div id="app">
    <AddTaskFormModal v-if="isModal" @closeModal="closeModal" />
    <Topbar />
    <router-view @AddNote="addNote" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Topbar from './components/Topbar.vue'
import AddTaskFormModal from './components/AddTaskFormModal'

export default {
  name: 'App',
  components: {
    Topbar,
    AddTaskFormModal,
  },
  data: () => ({
    isModal: false,
  }),
  methods: {
    ...mapActions('auth', ['getCurrentUser']),
    addNote() {
      this.isModal = true
    },
    closeModal() {
      this.isModal = false
    },
  },
  mounted() {
    this.getCurrentUser()
  },
}
</script>

<style>
body {
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
ul:focus {
  outline: none;
}
.container {
  padding: 0 20px;
  margin: 0 auto;
  max-width: 1140px;
}
</style>
