<template>
  <div class="login-wrapper">
    <el-row type="flex" class="loginForm" justify="center" align="middle">
      <el-col :xs="12" :sm="10" :md="8" :lg="6" :xl="4" class="login-content">
        <el-form label-position="top" :model="loginForm" :rules="rules" ref="loginForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">登录</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios"

export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          // required 是否为必填项
          // message 当前规则检验失败时的提示
          // trigger 表单验证的触发时机  blur表示失去焦点时触发
          { required: true, message: "用户名为必填项", trigger: "blur" },
          {
            min: 3,
            max: 6,
            message: "用户名长度在 3 到 6 个字符",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "密码为必填项", trigger: "blur" },
          {
            min: 3,
            max: 6,
            message: "密码长度在 3 到 6 个字符",
            trigger: "blur"
          }
        ]
      }
    }
  },
  methods: {
    login() {
      axios
        .post("http://localhost:8888/api/private/v1/login", this.loginForm)
        .then(res => {
          const { data, meta } = res.data
          // console.log(data)
          if (meta.status === 200) {
            // console.log("登录成功")
            localStorage.setItem('token', data.token);
            this.$router.push("/home")
          } else {
            // this.$message.error(meta.msg);
            this.$message({
              type: 'error',
              message: meta.msg,
              duration: 1000
            })
          }
        })
    },

    submitForm() {
      this.$refs.loginForm.validate(valid => {
        // valid 表示是否校验成功，如果成功就为：true，失败就为：false
        if (valid) {
          // alert("submit!");

          // 获取用户名和密码
          // console.log(this.loginForm);
          this.login()
        } else {
          // 校验失败
          return false
        }
      })
    },
    resetForm() {
      this.$refs.loginForm.resetFields()
    }
  }
};
</script>

<style>
  .login-wrapper, .loginForm {
    height: 100%;
  }

  .loginForm {
    background-color: #2D434C;
  }

  .login-content {
    min-width: 240px;
    background-color: #fff;
    padding: 20px 35px;
    border-radius: 10px;
  }
</style>