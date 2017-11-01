<template>
  <div class="detail">
    <el-row>
      <el-col :span="24" class="type_nav">
        <el-menu class="el-menu-demo" mode="horizontal">
          <el-col :span="18">
            <el-menu>
              <el-menu-item style="font-size: 20px;font-weight: bold">{{msgData.title}}</el-menu-item>
            </el-menu>
          </el-col>
          <el-col :span="6">
            <el-menu-item>
              <el-button type="text" icon="d-arrow-left" @click="backHandle">返回小吧</el-button>
            </el-menu-item>
          </el-col>
        </el-menu>
      </el-col>
      <el-col :span="24">
        <el-col :span="18">
          <router-view :message="msgData" />
        </el-col>
        <el-col :span="6">
          <el-col>
            <el-card :body-style="{ padding: '0px' }" v-model="userMsg">
              <div class="top clearfix">
                <el-button type="text" class="button" @click="clearHandle">退出</el-button>
              </div>
              <img :src="serverUrl+userMsg.userphoto" class="image">
              <div style="padding: 14px;">
                <span>{{userMsg.username}}</span>
                <div class="bottom clearfix">
                  <el-button type="text" class="button" @click="userHandle">操作按钮</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-col>
      </el-col>
      <el-col>
        <el-menu class="el-menu-demo" mode="horizontal">
          <el-col :span="24">
            <h3 style="text-align: left;"><i class="el-icon-document"></i>发表回复</h3>
          </el-col>
          <el-col :span="18">
            <el-form :model="repForm" :rules="rules" ref="repForm" label-width="100px" class="demo-repForm">
              <el-form-item label="内容" prop="connect">
                <div id="editorElem" style="text-align:left"></div>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('repForm')" style="width: 100%">发表</el-button>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="6">
          </el-col>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import E from "wangeditor";
import Cookies from "js-cookie";
import { server } from "./../utils/config";
import { getById } from "./../serveice/article";
import { getUserById } from "./../serveice/member";
import { postCreate } from "./../serveice/reply";
import { clearLogined } from "./../utils/tools";

export default {
  name: 'Detail',
  data () {
    return {
      editor: {}, // 富文本编辑器
      userId: '',
      id: '',
      serverUrl: server,
      userMsg: {
        username: "",
        userphoto: "",
      },
      msgData:{
        title:"",
        connect: "",
        user_id: ""
      },
      repForm: {
        user_id: "",
        connect: "",
        msg_id: "",
      },
      rules: {
        connect: [
          { required: true, message: '请输入内容', trigger: 'blur' },
          { min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    userHandle(){
      this.$router.push({
        name: "me",
        query: {
           id: this.userId,
        }
      })
    },
    clearHandle(){
      clearLogined()
      this.$router.push({
        name: "login",
      })
    },
    backHandle() {
      this.$router.push({
        name: "home",
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.repForm.user_id = this.userId;
          this.repForm.msg_id = this.id
          postCreate(this.repForm).then(res => {
            if (res.data.status == "y") {
              // 成功之后处理
              this.$message({
                message: res.data.msg,
                type: "success"
              });
              this.$router.push({
                name: "msg",
                query:{
                  id: this.id,
                  r: Math.random(),
                }
              });
            } else {
              this.$message({
                message: res.data.msg,
                type: "error"
              });
            }
          });
          this.repForm={}
          this.editor.txt.html('<p><br></p>');
        } else {
          this.$message({
            message: "操作失败",
            type: "error"
          });
          return false;
        }
      });
    },
    getData(){
      getById(this.id).then(res => {
      this.msgData = res.data.data
    })
    }
  },
  mounted() {
    // 创建富文本编辑器
    this.editor = new E("#editorElem");
    this.editor.customConfig.onchange = html => {
      this.repForm.connect = html;
    };
    this.editor.create();
  },
  created() {
    this.userId = Cookies.get('userId')
    getUserById(this.userId).then(res => {
      this.userMsg = res.data.data
    })
    if(this.$route.query.id){
      this.id = this.$route.query.id
    }
    this.getData()
  }
}
</script>

<style scoped>
</style>
