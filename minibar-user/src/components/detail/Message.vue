<template>
  <div class="message">
    <el-row>
      <el-col>
        <el-collapse v-for="item in repData" :key="item._id">
          <el-row>
            <el-col :span="4">
              <el-card :body-style="{ padding: '0px' }">
                <img :src="serverUrl+item.user_id.userphoto" class="image">
                <div style="padding: 14px;">
                  <span>{{item.user_id.username}}</span>
                </div>
              </el-card>
            </el-col>
            <el-col :span="20" style="position: relative;">
              <el-row>
                <el-row v-html="item.connect"></el-row>
              </el-row>
              <el-col style="bottom: 0px;position: absolute">
                <el-row :formatter="dalDate">{{item.createTime}}</el-row>
              </el-col>
            </el-col>
          </el-row>
        </el-collapse>
        <el-pagination
          layout="prev, pager, next"
          :page-count="pageCount"
          @current-change="pageChanged">
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import M from 'moment';
import { getRepData } from "./../../serveice/reply";
import { server } from "./../../utils/config";

export default {
  name: "message",
  data() {
    return {
      serverUrl: server,
      repData: [],
      pageCount: 1,
      msgId:'',
    };
  },
  methods: {
    getDataByPage(page = 1) {
      // 从服务端获取数据
      getRepData(page,this.msgId).then(res => {
        // console.log(res.data.data.list)
        this.repData = res.data.data.list;
        this.pageCount = res.data.data.pageCount;
      });
    },
    dalDate() {
      return M(cellValue).format('YYYY-MM-DD HH:mm:ss')
    },
    pageChanged(page){ // 页码选择改变
      this.getDataByPage(page)
    }
  },
  created() {
    if(this.$route.query.id){
      this.msgId = this.$route.query.id
    }
    console.log(this.msgId)
    this.getDataByPage();
  }
};
</script>

<style scoped>
.el-collapse{
  padding: 0;
  margin: 0;
}

</style>
