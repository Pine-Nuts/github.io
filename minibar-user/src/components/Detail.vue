<template>
  <div class="detail">
    <el-row>
      <el-col>
        <el-collapse v-for="item in repData" :key="item._id">
          <el-row>
          </el-row>
        </el-collapse>
        <el-pagination
          layout="prev, pager, next"
          :page-count="pageCount"
          @current-change="pageChanged">
        </el-pagination>
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
import { getRepData } from "./../serveice/reply";

export default {
  name: 'Detail',
  data () {
    return {
      editor: {}, // 富文本编辑器
      id: '',
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
    getDataByPage(page,id) {
      // 从服务端获取数据
      getRepData(page,id).then(res => {
        this.repData = res.data.data.list;
        this.pageCount = res.data.data.pageCount;
      });
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
    if (this.$route.query.id) {
      this.id = this.$route.query.id;
    }
    this.getDataByPage(page = 1,this.id);
  }
}
</script>

<style scoped>

</style>
