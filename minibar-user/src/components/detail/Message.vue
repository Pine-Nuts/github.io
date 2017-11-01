<template>
  <div class="message">
    <el-row>
      <el-col>
        <el-collapse v-if="this.isFirst">
          <el-row>
            <el-col :span="4">
              <el-card :body-style="{ padding: '0px' }">
                <img :src="serverUrl+message.user_id.userphoto" class="image">
                <div style="padding: 14px;">
                  <span>{{message.user_id.username}}</span>
                </div>
              </el-card>
            </el-col>
            <el-col :span="20">
              <el-row>
                <el-row v-html="message.connect"></el-row>
              </el-row>
              <el-col>
                <el-row>{{message.createTime | dalDate}}</el-row>
              </el-col>
            </el-col>
          </el-row>
        </el-collapse>
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
            <el-col :span="20">
              <el-row>
                <el-row v-html="item.connect"></el-row>
              </el-row>
              <el-col>
                <el-row>{{item.createTime | dalDate}}</el-row>
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
import { getById } from "./../../serveice/article";
import { server } from "./../../utils/config";

export default {
  name: "message",
  props: ["message"],
  data() {
    return {
      serverUrl: server,
      repData: [],
      pageCount: 1,
      msgId:'',
      isFirst: true,
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
    pageChanged(page){ // 页码选择改变
      this.getDataByPage(page)
      this.isFirst = false
    }
  },
  created() {
    if(this.$route.query.id){
      this.msgId = this.$route.query.id
    }
    this.getDataByPage();
  },
  filters: {
    dalDate(val){
      let time=new Date().getTime()-new Date(val).getTime()
      if(time>86400000){
        return val = M(val).format('MM-DD')
      }
      else{
        return val = M(val).format('HH:mm')
      }
    }
  },
  watch: {
    '$route':function(){
      // console.log('111111')
      this.getDataByPage()
    }
  }
};
</script>

<style scoped>
.el-collapse{
  padding: 0;
  margin: 0;
}
.image {
    padding: 5px;
    width: 50%;
    display: inline-block;
  }
</style>
