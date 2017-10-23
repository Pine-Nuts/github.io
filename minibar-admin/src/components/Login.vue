<template>
  <div class="login">
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="demo-loginForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="loginForm.password" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="upload" @click="submitForm('loginForm')">登陆</el-button>
            <el-button type="warning" icon="upload2" @click="resetForm('loginForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { postLogin } from "./../serveice/member";
import { setLogined } from "./../utils/tools";
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入管理员账号", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 1 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 100, message: "长度在 3 到 100 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          postLogin(this.loginForm)
            .then(res => {
              console.log(res.data)
              if(res.data.status == 'y'){
                this.$message({
                  message: res.data.msg,
                  type: 'success'
                }),
                setLogined(this.loginForm.username),
                this.$router.push({
                  name: 'main'
                })
              }
              else{
                this.$message({
                  message: res.data.msg,
                  type: 'error'
                })
              }
            })
        } else {
          this.$message({
            message: '提交失败',
            type: 'error'
          });
        };
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
