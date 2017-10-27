<template>
  <div class="type-editor">
    <el-row>
      <el-col :span="22" :offset="1">
        <el-form :model="tagForm" :rules="rules" ref="tagForm" label-width="100px" class="demo-tagForm">
          <el-form-item label="名称" prop="name">
            <el-input v-model="tagForm.name"></el-input>
          </el-form-item>
          <el-form-item label="介绍" prop="connect">
            <el-input v-model="tagForm.connect"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('tagForm')">提交</el-button>
            <el-button @click="resetForm('tagForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { postCreate, getById, postUpdate } from "./../../serveice/tag";
import { server } from "./../../utils/config";
export default {
  data() {
    return {
      isEditor: false, // 是否是编辑,判断不同的提交地址
      id: "", // 当前记录的id值,默认为空表示是新增操作
      tagForm: {
        name: "",
        connect: "",
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
        ],
        connect: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert('submit!');
          if (this.isEditor) {
            // 编辑
            postUpdate(this.id, this.tagForm).then(res => {
              if (res.data.status == "y") {
                // 成功之后处理
                this.$message({
                  message: res.data.msg,
                  type: "success"
                });
                this.$router.push({
                  name: "TL"
                });
              } else {
                this.$message({
                  message: res.data.msg,
                  type: "error"
                });
              }
            });
          } else {
            // 新增
            postCreate(this.tagForm).then(res => {
              if (res.data.status == "y") {
                // 成功之后处理
                this.$message({
                  message: res.data.msg,
                  type: "success"
                });
                this.$router.push({
                  name: "TL"
                });
              } else {
                this.$message({
                  message: res.data.msg,
                  type: "error"
                });
              }
            });
          }
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
      getById(this.id).then(res => {
        this.tagForm= res.data.data;
      });
    },
  },
  created() {
    if (this.$route.query.id) {
      this.isEditor = true;
      this.id = this.$route.query.id;
      this.getDataById();
    }
  },
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
