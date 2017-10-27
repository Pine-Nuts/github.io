<template>
  <div id="load">
    <el-row :gutter="20">
      <el-col :span="14" :offset="6">
        <h1>MiniBar</h1>
        <el-menu class="el-menu-demo" mode="horizontal" :default-active="navVal" :router="true">
            <el-menu-item :route="{name: 'login'}" index="l">登陆</el-menu-item>
            <el-menu-item :route="{name: 'register'}" index="r">注册</el-menu-item>
        </el-menu>
        <router-view/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: 'load',
  computed: {
    ...mapState('app',['navVal'])
  },
}
</script>
<style scoped>
h1{
  color: #20a0ff;
};
</style>





