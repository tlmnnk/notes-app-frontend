<template>
  <transition appear>
    <div class="task-item transition-box">
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix task-item__header">
          <span class="task-item__header">{{ task.title }}</span>
          <el-button
            class="task-item__btn"
            type="danger"
            icon="el-icon-delete"
            @click="$emit('deleteTask', task.id)"
            circle
          />
        </div>
        <div>{{ task.description }}</div>
        <div class="task-item__time">
          <div>created: {{ createdAt }}</div>
          <div>time passed: {{ timePassed }}</div>
        </div>
      </el-card>
    </div>
  </transition>
</template>

<script>
import { getDateTimeSince } from '../helpers/getTimeElapsed'

export default {
  props: {
    task: {
      type: Object,
    },
  },
  name: 'Task',
  data() {
    return {
      isChecked: true,
      timeElapsed: getDateTimeSince(new Date(this.task.createdAt)),
    }
  },
  computed: {
    createdAt() {
      return new Date(this.task.createdAt).toLocaleString()
    },
    timePassed() {
      return this.timeElapsed
    },
  },
  methods: {
    onCheckboxChange() {},
    setTimeElapsed() {
      this.timeElapsed = getDateTimeSince(new Date(this.task.createdAt))
    },
  },
  mounted() {
    this.timerID = setInterval(this.setTimeElapsed, 1000)
  },
  beforeDestroy() {
    clearInterval(this.timerID)
  },
}
</script>

<style>
.task-item .box-card {
  position: relative;
  margin-right: 15px;
  margin-bottom: 15px;
  display: inline-block;
  min-width: 280px;
  max-width: 812px;
  overflow: hidden;
}
.task-item .el-card__body {
  flex-direction: column;
  align-items: start !important;
}
.add-Task .el-card__body {
  align-items: center !important;
}
.el-card__header {
  height: 78px;
}
.box-card .el-card__body,
.task-item__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-card__body {
  min-height: 100px;
}
.task-item__checkbox .el-checkbox__label {
  font-size: 22px;
}
.task-item__checkbox.is-checked .el-checkbox__label {
  opacity: 0.4;
  text-decoration: line-through;
}
.task-item__btn.el-button.is-circle {
  margin-left: 15px;
}
.task-item__time {
  position: absolute;
  font-size: 12px;
  color: #adabab;
  bottom: 0;
  transform: translateY(-20%);
}
.el-card__header {
  font-size: 20px;
  color: #409eff;
}
</style>
