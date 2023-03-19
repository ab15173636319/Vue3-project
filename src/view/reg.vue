
<script lang="ts" setup>
import { NInput, NButton, NFormItem, NForm } from 'naive-ui'
import { reactive } from 'vue'
import REG from '../ts/reg'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter()
const data = reactive({
  regInfo: {
    uid: 0,
    username: "",
    password: "",
    time: "",
    role: 2
  },
  haveContent: 0,
  apassword: "",
  width: "0px",
  rules: {
    username: [
      {
        required: true,
        validator(rule: any, value: any) {
          if (!/^[a-zA-Z][0-9]{4,16}$/.test(value)) {
            return new Error('由字母开头，至少要有4个数字')
          } else {
            data.haveContent += 1
            return true
          }
        }
        , trigger: ['change']
      },
    ],
    password: [
      {
        required: true,
        validator(rule: any, value: any) {
          console.log(value);
          if (!/^[a-zA-Z0-9]{6,}$/.test(value)) {
            return new Error('密码必须包含字母和数字,且长度必须大于6')
          } else {
            data.haveContent += 1
            return true
          }
        }
        , trigger: ['change']
      },
    ],
    apassword: [
      {
        required: true,
        validator(rule: any, value: any) {
          console.log(value != data.regInfo.password)
          if (!value) {
            return new Error('请再次输入密码！')
          } else if (value != data.regInfo.password) {
            return new Error('两次密码不相同')
          } else {
            data.haveContent += 1
            return true
          }
        }
        , trigger: ['change']
      }
    ]
  }
})

const reg = () => {
  if (REG.save_info(data.regInfo)) {
    ElMessage.success('注册成功，即将跳转')
    setTimeout(() => {
      router.push({ path: '/', query: { username: data.regInfo.username } })
    }, 1000);
  } else {
    ElMessage.error('注册失败，账号被使用或未输入')
  }
}

</script>
<template>
  <img class="login-img" src="https://w.wallhaven.cc/full/1p/wallhaven-1p398w.jpg" alt="">
  <div class="login">
    <div class="blur"></div>
    <el-form label-position="right" label-width="100px" :model="data.regInfo" style="max-width: 460px" :rules="data.rules">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="data.regInfo.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="data.regInfo.password" />
      </el-form-item>
      <el-form-item label="验证密码" prop="apassword">
        <el-input v-model="data.apassword" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="reg()">注册</el-button>
      </el-form-item>
      <el-link type="primary" href="/">已有账号？</el-link>
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