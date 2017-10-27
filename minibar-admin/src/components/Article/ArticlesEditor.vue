<template>
  <div class="type-editor">
    <el-row>
      <el-col :span="22" :offset="1">
        <el-form :model="artForm" :rules="rules" ref="artForm" label-width="100px" class="demo-artForm">
          <el-form-item label="用户名" prop="user_id">
            <span v-if="isEditor">{{artForm.user_id.username}}</span>
            <el-select v-else v-model="artForm.user_id" placeholder="请选择">
              <el-option v-for="item in users" :key="item._id" :label="item.username" :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标签" prop="tag_id">
            <el-select v-model="artForm.tag_id" placeholder="请选择">
              <el-option v-for="item in tags" :key="item._id" :label="item.name" :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标题" prop="title">
            <span v-if="isEditor">{{artForm.title}}</span>
            <el-input v-else v-model="artForm.title"></el-input>
          </el-form-item>
          <el-form-item v-if="isEditor" label="阅读量" prop="readNumber">
            <span>{{artForm.readNumber}}</span>
          </el-form-item>
          <el-form-item v-if="isEditor" label="评论量" prop="replyNumber">
            <span>{{artForm.replyNumber}}</span>
          </el-form-item>
          <el-form-item v-if="isEditor" prop="createTime" label="创建时间">
            <span>{{artForm.createTime}}</span>
          </el-form-item>
          <el-form-item v-if="isEditor" prop="updateTime" label="更新时间">
            <span>{{artForm.updateTime}}</span>
          </el-form-item>
          <el-form-item label="内容" prop="connect">
            <div v-if="isEditor" v-html="artForm.connect"></div>
            <div v-else id="editorElem" style="text-align:left"></div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('artForm')">提交</el-button>
            <el-button v-if="!isEditor" @click="resetForm('artForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import E from "wangeditor";
import M from 'moment';
import { postCreate, getById, postUpdate } from "./../../serveice/article";
import { getUserData } from "./../../serveice/member";
import { getTagData } from "./../../serveice/tag";
export default {
  data() {
    return {
      isEditor: false, // 是否是编辑,判断不同的提交地址
      id: "", // 当前记录的id值,默认为空表示是新增操作
      editor: {}, // 富文本编辑器
      users: [],
      tags: [],
      artForm: {
        user_id: "",
        tag_id: "",
        title: "",
        connect: "",
        readNumber: "",
        replyNumber: "",
        createTime: "",
        updateTime: "",
      },
      rules: {
        user_id: [
          { required: true, message: '请选择用户名', trigger: 'blur' }
        ],
        tag_id: [
          { required: true, message: '请选择标签', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur' }
        ],
        connect: [
          { required: true, message: '请输入内容', trigger: 'blur' },
          { min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      if(this.isEditor){
        this.artForm.user_id = this.artForm.user_id._id;
      }
      else {
        delete this.artForm.createTime;
        delete this.artForm.updateTime;
        delete this.artForm.readNumber;
        delete this.artForm.replyNumber;
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert('submit!');
          if (this.isEditor) {
            // 编辑
            postUpdate(this.id, this.artForm).then(res => {
              if (res.data.status == "y") {
                // 成功之后处理
                this.$message({
                  message: res.data.msg,
                  type: "success"
                });
                this.$router.push({
                  name: "AL"
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
            postCreate(this.artForm).then(res => {
              if (res.data.status == "y") {
                // 成功之后处理
                this.$message({
                  message: res.data.msg,
                  type: "success"
                });
                this.$router.push({
                  name: "AL"
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
        this.artForm= res.data.data;
        this.artForm.createTime = M(res.data.data.createTime).format('YYYY-MM-DD HH:mm:ss')
        this.artForm.updateTime = M(res.data.data.updateTime).format('YYYY-MM-DD HH:mm:ss')
      });
    },
  },
  created() {
    if (this.$route.query.id) {
      this.isEditor = true;
      this.id = this.$route.query.id;
      this.getDataById();
    }
    getUserData()
      .then(res=>{
        this.users = res.data.data.list
      })
    getTagData()
      .then(res=>{
        this.tags = res.data.data.list
      })
  },
  mounted() {
    // 创建富文本编辑器
    this.editor = new E("#editorElem");
    this.editor.customConfig.onchange = html => {
      this.artForm.connect = html;
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
