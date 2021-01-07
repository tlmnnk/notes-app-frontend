<template>
  <div>
    <div class="container">
      <div v-if="isLoggedIn">
        <div class="tasks_container">
          <AddTaskCard @AddNote="$emit('AddNote')" @closeModal="$emit('closeModal')" />
          <Task @deleteTask="deleteTaskById" v-for="task in tasks" :key="task.id" :task="task" />
        </div>
      </div>
      <div v-else class="tasks__empty">Please, sign in to see your tasks</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Task from '../components/Task'
import AddTaskCard from '../components/AddTaskCard'

export default {
  name: 'Tasks',
  components: {
    Task,
    AddTaskCard,
  },
  computed: {
    ...mapGetters('auth', ['isLoggedIn']),
    ...mapGetters('task', ['tasks']),
  },
  methods: {
    ...mapActions('task', ['getTasks', 'deleteTask']),
    deleteTaskById(id) {
      this.deleteTask(id)
    },
  },
  mounted() {
    this.getTasks()
  },
}
</script>

<style>
.tasks_container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.tasks__empty {
  text-align: center;
}
</style>
