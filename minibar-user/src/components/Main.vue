<template>
  <div class="main">
    <el-row>
      <el-col :span="24" class="type_nav">
        <el-menu class="el-menu-demo" mode="horizontal">
          <el-col :span="18">
            <el-menu :default-active="navVal" :router="true">
              <el-menu-item index="1" :route="{name: 'home'}">看帖</el-menu-item>
              <el-menu-item
              v-for="(item, index) in tags"
              :key="item._id"
              :index="String(index+2)"
              @click="tagArt(item._id)"
              >{{item.name}}</el-menu-item>
            </el-menu>
          </el-col>
          <el-col :span="6">
            <el-menu-item class="search">
              <el-input placeholder="吧内搜索" icon="search" v-model="input" :on-icon-click="handleIconClick">
              </el-input>
            </el-menu-item>
          </el-col>
        </el-menu>
      </el-col>
      <el-col :span="24">
        <el-col :span="18">
            <router-view/>
        </el-col>
        <el-col :span="6">
          <el-col>
            <el-card :body-style="{ padding: '0px' }" v-model="userMsg">
              <div class="clearfix">
                <el-button type="text" class="button" @click="clearHandle">退出</el-button>
              </div>
              <img :src="serverUrl+userMsg.userphoto" class="image">
              <div style="padding: 14px;">
                <span>{{userMsg.username}}</span>
                <div class="clearfix">
                  <el-button type="text" class="button" @click="passHandle">修改密码</el-button>
                </div>
                <div class="bottom clearfix">
                  <el-button type="text" class="button" @click="userHandle">操作按钮</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-col>
      </el-col>
      <el-col :span="24">
        <el-menu class="el-menu-demo" mode="horizontal">
          <el-col :span="24">
            <h3 style="text-align: left;"><i class="el-icon-document"></i>发表新帖</h3>
          </el-col>
          <el-col :span="18">
            <el-form :model="msgForm" :rules="rules" ref="msgForm" label-width="100px" class="demo-msgForm">
              <el-form-item label="标题" prop="title">
                <el-input v-model="msgForm.title"></el-input>
              </el-form-item>
              <el-form-item label="内容" prop="connect">
                <div id="editorElem" style="text-align:left"></div>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('msgForm')" style="width: 100%">发表</el-button>
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
import { mapState } from "vuex";
import E from "wangeditor";
import Cookies from "js-cookie";
import { postCreate } from "./../serveice/article";
import { getUserById } from "./../serveice/member";
import { getTagData } from "./../serveice/tag";
import { server } from "./../utils/config";
import { clearLogined } from "./../utils/tools";

export default {
  data() {
    return {
      editor: {}, // 富文本编辑器
      input: '',
      id: '',
      serverUrl: server,
      tags:[],
      userMsg: {
        username: "",
        userphoto: "",
      },
      msgForm: {
        user_id: "",
        title: "",
        connect: "",
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur' }
        ],
        connect: [
          { required: true, message: '请输入内容', trigger: 'blur' },
          { min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.msgForm.user_id = this.id,
          postCreate(this.msgForm).then(res => {
            if (res.data.status == "y") {
              // 成功之后处理
              this.$message({
                message: "发帖成功",
                type: "success"
              });
              this.$router.push({
                name: "home",
                query: {
                    r: Math.random(),
                }
              });
            this.msgForm={}
            this.editor.txt.html('<p><br></p>');
            } else {
              this.$message({
                message: "发帖失败",
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
    passHandle(){
      this.$router.push({
        name: "me",
        query: {
           id: this.id,
           isPwd: true,
        }
      })
    },
    userHandle(){
      this.$router.push({
        name: "me",
        query: {
           id: this.id,
        }
      })
    },
    clearHandle(){
      clearLogined()
      this.$router.push({
        name: "login",
      })
    },
    tagArt(cb){
      this.$router.push({
        name: "connect",
        query: {
           tag_id: cb,
        }
      })
    },
    handleIconClick(){
      console.log(123)
    }
  },
  created() {
    this.id = Cookies.get('userId')
    getUserById(this.id).then(res => {
      this.userMsg = res.data.data
    })
    getTagData().then(res => {
      this.tags = res.data.data
    })
  },
  mounted() {
    // 创建富文本编辑器
    this.editor = new E("#editorElem");
    this.editor.customConfig.onchange = html => {
      this.msgForm.connect = html;
    };
    this.editor.create();
  },
  computed: {
    ...mapState('app',['navVal'])
  },
}
</script>

<style scoped>
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    padding: 5px;
    width: 50%;
    display: inline-block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both
  }

</style>
