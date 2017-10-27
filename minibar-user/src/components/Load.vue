<template>
  <div id="load">
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <el-menu class="el-menu-demo" mode="horizontal" :default-active="navVal" :router="true">
          <el-menu-item :route="{name: 'login'}">登陆</el-menu-item>
          <el-menu-item :route="{name: 'register'}">注册</el-menu-item>
        </el-menu>
        <router-view/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'load',
}
</script>





