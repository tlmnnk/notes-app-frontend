<template>
   <transition appear>
    <div class="add-Task task-item transition-box" @click="$emit('AddNote')">
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix add-Task__header">
          Add Note
        </div>
          <el-button class="add-Task__btn" type="success" icon="el-icon-circle-plus-outline" circle></el-button>
      </el-card>
    </div>
   </transition>
</template>

<script>
export default {
  name: 'AddTaskCard',
}
</script>

<style>
.add-Task {
  cursor: pointer;
}
.add-Task__header {
  font-size: 22px;
  color: #606266;
  font-weight: 500;
  text-align: center
}
.add-Task .el-card__body {
    display: flex;
    justify-content: center;
}
.add-Task__btn {
  cursor: none;
}
</style>