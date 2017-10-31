<template>
  <div class="home">
    <el-row>
      <el-col>
        <el-collapse v-for="item in msgData" :key="item._id">
          <el-row>
            <el-col :span="2"><el-button :plain="true" :disabled="true">{{item.readNumber}}</el-button></el-col>
            <el-col :span="22">
              <el-col :span="18" class="connect">
                <el-row @click.native="toDetail(item._id)">{{item.title}}</el-row>
                <el-row v-html="item.connect"></el-row>
              </el-col>
              <el-col :span="6" style="text-align: left;">
                <el-row>{{item.user_id.username}}</el-row>
                <el-row>{{item.updateTime | dalDate}}</el-row>
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
import { getArtData } from "./../../serveice/article";

export default {
  name: "Home",
  data() {
    return {
      msgData: [],
      pageCount: 1,
    };
  },
  methods: {
    getDataByPage(page = 1) {
      // 从服务端获取数据
      getArtData(page).then(res => {
        // console.log(res.data.data.list)
        this.msgData = res.data.data.list;
        this.pageCount = res.data.data.pageCount;
      });
    },
    toDetail(cb) {
      this.$router.push({ name: 'detail' });
      this.$router.push({query:{id: cb}});
    },
    pageChanged(page){ // 页码选择改变
      this.getDataByPage(page)
    }
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
  created () {
    this.getDataByPage();
  },
  watch: {
    // 监听路由信息的改变,重新加载数据
    // 从而引起路由信息的改变
    '$route':function(){
        this.getDataByPage();
    }
  },
};
</script>

<style scoped>
.el-collapse{
  padding: 0;
  margin: 0;
}
.connect{
  text-align: left;
  overflow: hidden;
}
</style>
