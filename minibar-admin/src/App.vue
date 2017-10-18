<template>
  <div id="app">
    <el-row class="topnav">
      <el-menu class="el-menu-demo" mode="horizontal">
        <el-menu-item>MiniBar</el-menu-item>
      </el-menu>
    </el-row>
    <el-row class="tac">
      <el-col :span="4" class="leftnav">
        <el-menu default-active="1" class="el-menu-vertical-demo inLeftnav">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>用户</template>
            <el-menu-item-group>
              <el-menu-item index="1-1">编辑</el-menu-item>
              <el-menu-item index="1-2">列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>贴子</template>
            <el-menu-item-group>
              <el-menu-item index="2-1">编辑</el-menu-item>
              <el-menu-item index="2-2">列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-menu"></i>回复</template>
            <el-menu-item-group>
              <el-menu-item index="3-1">编辑</el-menu-item>
              <el-menu-item index="3-2">列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="20">
        <router-view/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
html,body {
  padding: 0;
  margin: 0;
  height: 100%;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
.topnav{
  height: 10%;
  font-size: 50px;
  font-weight: bold;
  line-height: 50%;
}
.tac{
  height: 90%;
}
.leftnav,.inLeftnav{
  height: 100%;
}
</style>
