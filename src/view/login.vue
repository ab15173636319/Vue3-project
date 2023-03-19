
<script lang="ts" setup>
import { NInput, NButton, NFormItem, NForm } from 'naive-ui'
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import reg from '../ts/reg'
const router = useRouter()
const data = reactive({
  username: "",
  password: "",
  width: "0px",
  user_list: reg.get_info(),
  rules: {
    username: [
      {
        required: true,
        message: '请输入账号',
        trigger: ['blur', 'change'],
      },
    ],
    password: [
      {
        required: true,
        message: '请输入密码',
        trigger: ['blur', 'change'],
      },
    ],
  },
})

data.width = "0%"

const login = () => {
  data.width = "80%"
  let success = false
  success = reg.user_login(data.username, data.password)
  success ? SUCCESS() : FAIL()
}

const SUCCESS = () => {
  ElMessage.success('登陆成功')
  router.push('/main')
}
const FAIL = () => {
  ElMessage.error('账号或密码错误')
}

// 获取注册成功后用户名
data.username = location.search.substring(location.search.indexOf('=') + 1,)


</script>
<template>
  <img class="login-img" src="https://w.wallhaven.cc/full/1p/wallhaven-1p398w.jpg" alt="">
  <div class="login">
    <div class="blur"></div>
    <el-form label-position="right" label-width="100px" style="max-width: 460px" :rules="data.rules">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="data.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="data.password" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login()">登录</el-button>
      </el-form-item>
      <el-link type="primary" href="/reg">没有账号？</el-link>
    </el-form>
  </div>
</template>
<style>
body {
  overflow: hidden;
  padding: 0;
  margin: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: aliceblue; */
}

.login {
  /* margin: 0 auto; */
  z-index: 100;
  position: relative;
  /* box-shadow: 2px 2px 5px #000; */
  padding: 15px;
  border-radius: 5px;
}

.blur {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  /* background-image: url(https://w.wallhaven.cc/full/1p/wallhaven-1p398w.jpg); */
  background-size: 120vw 100vh;
  background-position: -720px -250px;
  border-radius: 10px;
  /* background-color: rgba(0, 0, 0, 0.3); */
  box-shadow: 0 0 5px rgba(255, 255, 255, 0.1), 0 0 10px rgba(255, 255, 255, 0.1), 0 0 15px rgba(255, 255, 255, 0.1)
}

.login-img {
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  width: 100%;
  height: 100%;
}

.loaing_line {
  height: 2px;
  width: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
}

.loaing_line .line {
  height: 100%;
  width: 0px;
  background-color: aqua;
  transition: width 1s;
}

.nform {
  @apply w-96 p-4;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 0.2rem;
  box-shadow: 2px 2px 5px #000;
  position: relative;
}
</style>