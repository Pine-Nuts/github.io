<template>
  <div class="detail">
    <el-row>
      <el-col :span="24" class="type_nav">
        <el-menu class="el-menu-demo" mode="horizontal">
          <el-col :span="18">
            <el-menu :default-active="navVal" :router="true">
              <el-menu-item>标题</el-menu-item>
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
          <el-collapse v-if="isFirst">
            <el-row>
            </el-row>
          </el-collapse>
          <el-collapse v-for="item in repData" :key="item._id">
            <el-row>
            </el-row>
          </el-collapse>
          <el-pagination
            layout="prev, pager, next"
            :page-count="pageCount"
            @current-change="pageChanged">
          </el-pagination>
        </el-col>
        <el-col :span="6">
          <el-col>
            <el-card :body-style="{ padding: '0px' }" v-model="userMsg">
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
            <el-form :model="repForm" :rules="rules" ref="repForm" label-width="100px" class="demo-msgForm">
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
import E from "wangeditor";
import Cookies from "js-cookie";
import { server } from "./../utils/config";
import { getById } from "./../serveice/article";
import { getRepData } from "./../serveice/reply";

export default {
  name: 'Detail',
  data () {
    return {
      isFirst: true,
      editor: {}, // 富文本编辑器
      userId: '',
      id: '',
      serverUrl: server,
      userMsg: {
        username: "",
        userphoto: "",
      },
      msgDate:{

      },
      repForm: {
        title: "",
        connect: "",
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
    getDataById(){
      getById(this.id).then(res => {
        this.msgDate = res.data.data
      })
    },
    getDataByPage(page,id) {
      // 从服务端获取数据
      getRepData(page,id).then(res => {
        this.repData = res.data.data.list;
        this.pageCount = res.data.data.pageCount;
      });
    },
    userHandle(){
      this.$router.push({
        name: "me",
        query: {
           id: this.id,
        }
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          postCreate(this.msgForm).then(res => {
            if (res.data.status == "y") {
              // 成功之后处理
              this.$message({
                message: res.data.msg,
                type: "success"
              });
              this.$router.push({
                name: "Main"
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
    pageChanged(page,id){ // 页码选择改变
      this.isFirst = false;
      this.getDataByPage(page,id)
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
  create() {
    this.userId = Cookies.get('userId')
    getById(this.userId).then(res => {
      this.userMsg = res.data.data
    })
    if (this.$route.query.id) {
      this.id = this.$route.query.id;
    }
    if(this.isFirst){
      this.getDataById()
    }
    this.getDataByPage(page = 1,this.id);
  }
}
</script>

<style scoped>

</style>
