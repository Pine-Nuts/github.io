<template>
  <div class="type-editor">
    <el-row>
      <el-col :span="22" :offset="1">
        <el-form :model="userForm" :rules="rules" ref="userForm" label-width="100px" class="demo-userForm">
          <el-form-item label="用户名" prop="username" v-if="!this.isPwd">
            <span>{{userForm.username}}</span>
          </el-form-item>
          <el-form-item label="头像" v-if="!this.isPwd">
            <!--图片上传使用本地服务器 上传文件后显示的地址需要拼接一下服务地址-->
            <el-upload class="avatar-uploader" :action="serverUrl+'/api/v3/common/file/uploadfile'" :show-file-list="false" :on-success="handleAvatarScucess" :before-upload="beforeAvatarUpload">
              <img v-if="userForm.userphoto" :src="serverUrl+userForm.userphoto" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item v-if="this.isPwd" label="原密码" prop="pwd">
            <el-input type="password" v-model="userForm.pwd"></el-input>
          </el-form-item>
          <el-form-item v-if="this.isPwd" label="新密码" prop="password">
            <el-input v-model="userForm.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age" v-if="!this.isPwd">
            <el-input v-model="userForm.age"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="isMale" v-if="!this.isPwd">
            <el-radio-group v-model="userForm.isMale">
              <el-radio label="true">男</el-radio>
              <el-radio label="false">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="邮箱" prop="email" v-if="!this.isPwd">
            <el-input v-model="userForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="phone" v-if="!this.isPwd">
            <el-input v-model="userForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="介绍" prop="description" v-if="!this.isPwd">
            <div id="editorElem" style="text-align:left"></div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('userForm')">提交</el-button>
            <el-button type="warning" @click="resetForm('userForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import E from "wangeditor";
import { getUserById, postUpdate } from "./../serveice/member";
import { server } from "./../utils/config";
import { getValidatePwd } from "./../serveice/validate";

export default {
  data() {
    var validatePwd = (rule, value, callback) => {
      getValidatePwd(value,this.id).then(res=>{
        if(res.data.status== 'n'){
          callback(new Error('原密码输入错误'))
        }
        callback()
      })
    };
    var validatePass = (rule, value, callback) => {
        if (value == this.userForm.pwd) {
          callback(new Error('两次输入密码不能一致!'));
        }
        callback();
      };
    return {
      isPwd: false,
      id: "", // 当前记录的id值
      editor: {}, // 富文本编辑器
      userForm: {
        username: "",
        userphoto: "/images/user.png",
        password: "",
        description: "",
        isMale: "",
        age: "",
        email: "",
        phone: "",
      },
      serverUrl: server,
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '请输入原密码', trigger: 'blur' },
          { validator: validatePwd, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 编辑
          if(this.isPwd){
            delete this.userForm.username;
            delete this.userForm.userphoto;
            delete this.userForm.description;
            delete this.userForm.isMale;
            delete this.userForm.age;
            delete this.userForm.email;
            delete this.userForm.phone;
          }
          else{
            delete this.userForm.password;
          }
          postUpdate(this.id, this.userForm).then(res => {
            if (res.data.status == "y") {
              // 成功之后处理
              this.$message({
                message: res.data.msg,
                type: "success"
              });
              this.$router.push({
                name: "home"
              });
            } else {
              this.$message({
                message: res.data.msg,
                type: "error"
              });
            }
          });
        } else {
          this.$message({
            message: "操作失败",
            type: "error"
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getDataById() {
      // 根据id获取数据
      getUserById(this.id).then(res => {
        this.userForm= res.data.data;
        this.userForm.password = ''
        this.editor.txt.html(this.userForm.description); // 设置富文本编辑器的默认内容
      });
    },
    handleAvatarScucess(res) {
      // 图片上传
      this.userForm.userphoto = res.url; // URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  },
  created() {
    if (this.$route.query.isPwd){
      this.isPwd = true
    }
    if (this.$route.query.id) {
      this.id = this.$route.query.id;
      this.getDataById();
    }
  },
  mounted() {
    // 创建富文本编辑器
    this.editor = new E("#editorElem");
    this.editor.customConfig.onchange = html => {
      this.userForm.description = html;
    };
    this.editor.create();
  }
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}

.avatar-uploader .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
