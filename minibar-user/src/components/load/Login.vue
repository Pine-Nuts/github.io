<template>
  <div class="login">
    <el-row :gutter="20">
      <el-col :span="22" :offset="1">
        <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="demo-loginForm">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" type="password" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="upload" @click="submitForm('loginForm')">确定</el-button>
            <el-button type="warning" icon="setting" @click="resetForm('loginForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { postLogin } from "./../../serveice/member";
import { setLogined } from "./../../utils/tools";
import { getValidateUser } from "./../../serveice/validate";
export default {
  data() {
    var validateUser = (rule, value, callback) => {
      getValidateUser(value).then(res=>{
        if(res.data.status== 'y'){
          callback(new Error('用户名不存在'))
        }
        callback()
      })
    };
    return {
      id: "",
      loginForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { validator: validateUser, trigger: 'blur' }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
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
              if(res.data.status == 'y'){
                this.id = res.data.id
                this.$message({
                  message: res.data.msg,
                  type: 'success'
                }),
                setLogined(this.id),
                this.$router.push({
                  name: 'home'
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
    },
  }
};
</script>
