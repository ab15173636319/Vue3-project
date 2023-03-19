<script lang="ts" setup>
import { NTable, NButton, listDark } from 'naive-ui'
import { ElMessage } from 'element-plus'
import { useTime } from '../ts/time'
import reg from '../ts/reg'
import { reactive } from 'vue'

const data = reactive({
  list: reg.get_info(),
  user: reg.get_user()
})

const del = (id: number) => {
  if (data.user.role == 1) {
    for (let i = 0; i < data.list.length; i++) {
      if (data.list[i].uid == id) {
        data.list.splice(i, 1)
        reg.replace_info(data.list)
      }
    }
  }
  ElMessage.error('权限不足')
}

const modi = (id: number) => {
  data.user.role == 1 ? ElMessage.success('成功') : ElMessage.error('权限不足')
}

</script>
<template>
  <div class="table-name">用户管理系统------<span class="bg-green-300">用户{{ data.user.username }}</span><span class="bg-red-600">[{{ data.user.role == 1 ? "所有权限" : "部分权限" }}]</span></div>
  <n-table :bordered="true" :single-line="false">
    <thead>
      <tr>
        <th>uid</th>
        <th>用户名</th>
        <th>密码</th>
        <th>注册时间</th>
        <th>权限</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="l in data.list" :key="l.uid" class="bg">
        <td>{{ l.uid }}</td>
        <td>{{ l.username }}</td>
        <td v-if="data.user.role == 1">{{ l.password }}</td>
        <td v-else>权限不足</td>
        <td>{{ useTime(l.time) }}</td>
        <td>
          <span v-if="l.role == 1">所有权限</span>
          <span v-else>基础权限</span>
        </td>
        <td>
          <n-button round type="primary" @click="modi(l.uid)">修改</n-button>
          <n-button round type="error" @click="del(l.uid)">删除</n-button>
        </td>
      </tr>
    </tbody>
  </n-table>
</template>
<style>
.table-name {
  @apply p-3 text-dark-50 bg-blue-100;
  text-align: center;
  font-size: 1.5rem;
}
</style>