<template>
  <div class="login">
    <el-row :gutter="20">
      <el-col :span="22" :offset="1">
        <el-form :model="registerForm" :rules="rules" ref="registerForm" label-width="100px" class="demo-registerForm">
          <el-form-item prop="username">
            <el-input v-model="registerForm.username" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="registerForm.password" type="password" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item prop="phone">
            <el-input v-model="registerForm.phone" type="phone" placeholder="手机"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="upload" @click="submitForm('registerForm')">确定</el-button>
            <el-button type="warning" icon="setting" @click="resetForm('registerForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { postCreate } from "./../../serveice/member";
import { setLogined } from "./../../utils/tools";
import { getValidateUser } from "./../../serveice/validate";

export default {
  data() {
    var validateUser = (rule, value, callback) => {
      getValidateUser(value).then(res=>{
        if(res.data.status== 'n'){
          callback(new Error('用户名已存在'))
        }
        callback()
      })
    };
    var validatePhone = (rule, value, callback) => {
      if(! (value.length == 11) ){
        callback(new Error('手机号必须11位'))
      }
      if(! (/^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value))){
        callback(new Error('请输入正确的手机号格式'))
      }
      callback()
    };
    return {
      id: "",
      registerForm: {
        username: "",
        password: "",
        phone: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' },
          { validator: validateUser, trigger: 'blur' }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: "请输入11位手机", trigger: "blur" },
          { validator: validatePhone, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          postCreate(this.registerForm)
            .then(res => {
              if(res.data.status == 'y'){
                this.id = res.data.id
                this.$message({
                  message: '注册成功',
                  type: 'success'
                })
                this.$router.push({
                  name: 'login'
                })
              }
              else{
                this.$message({
                  message: '注册失败',
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
