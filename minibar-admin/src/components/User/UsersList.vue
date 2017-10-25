<template>
  <div class="type-list">
    <el-row>
      <el-col :span="22" :offset="1">
        <el-table
          :data="tableData"
          stripe
          border
          style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            width="80">
          </el-table-column>
          <el-table-column
            prop="username"
            label="名字"
            width="180">
          </el-table-column>
          <el-table-column
            prop="password"
            label="密码">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            width="180"
            :formatter="dalDate">
          </el-table-column>
          <el-table-column
            label="操作"
            width="180">
            <template scope="scope">
              <el-button size="small" @click="editHandle(scope.row)" type="primary" icon="edit"></el-button>
              <el-button size="small" @click="delHandle(scope.row)" type="danger" icon="delete"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--
          page-count 总页数
         -->
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
import { getUserData, postDel } from './../../serveice/member'
import M from 'moment'
export default {
  data() {
    return {
      tableData: [],
      pageCount: 1,
    }
  },
  methods: {
    editHandle(item) {
      // this.$message({
      //   message: item._id,
      //   type: 'warning'
      // })
      this.$router.push({
        name: 'UE',
        query: {
          id: item._id
        }
      })
    },
    delHandle(item) {
      // this.$message({
      //   message: item._id,
      //   type: 'error'
      // })
      this.$confirm('确认删除此记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // });
          postDel(item._id)
            .then(res=>{
              if(res.data.status=='y'){
                // 成功之后处理
                this.$message({
                  message: res.data.msg,
                  type: 'success'
                })
                // 页面跳转,传递一个随机参数
                //  传递随机数能使$route的值发生改变
                //  在watch中监听$route的变化
                //    触发重新获取数据的方法
                this.$router.push({
                  name: 'UL',
                  query: {
                    r: Math.random(),
                  }
                })
              }
              else{
                this.$message({
                  message: res.data.msg,
                  type: 'error'
                })
              }
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    getDataByPage(page=1) { // 从服务端获取数据
      getUserData(page).then(res=>{
        // console.log(res.data)
        this.tableData = res.data.data.list
        this.pageCount = res.data.data.pageCount
      })
    },
    // 格式化日期
    dalDate(row, column, cellValue) {
      // console.log(row)
      // console.log(column)
      // console.log(cellValue)
      return M(cellValue).format('YYYY-MM-DD HH:mm:ss')
    },
    pageChanged(page){ // 页码选择改变
      this.getDataByPage(page)
    }
  },
  created() {
    this.getDataByPage()
  },
  watch: {
    // 监听路由信息的改变,重新加载数据
    //  主要解决删除记录后无法刷新的问题
    //  在执行删除之后,传递一个随机数作为参数,
    //    从而引起路由信息的改变
    '$route':function(){
      // console.log('111111')
      this.getDataByPage()
    }
  }
}
</script>
