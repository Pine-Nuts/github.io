<template>
  <div class="home">
    <el-row>
      <el-col>
        <el-collapse v-for="item in msgData" :key="item._id">
          <el-row>
            <el-col :span="4"><el-button :plain="true" :disabled="true">{{item.readNumber}}</el-button></el-col>
            <el-col :span="16" class="connect">
              <el-row>{{item.title}}</el-row>
              <el-row>{{item.connect}}</el-row>
            </el-col>
            <el-col :span="4">
              <el-row>{{item.user_id.username}}</el-row>
              <el-row>{{item.updateTime}}</el-row>
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
import { getArtData } from "./../serveice/article";

export default {
  name: "Home",
  data() {
    return {
      msgData: []
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
     dalDate(row, column, cellValue) {
      return M(cellValue).format('YYYY-MM-DD HH:mm:ss')
    },
  },
  created() {
    this.getDataByPage();
  }
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
