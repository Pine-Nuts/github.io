<template>
  <div class="main">
    <el-row>
      <el-col :span="24" class="top-container">
        MiniBar管理后台
      </el-col>
    </el-row>
    <el-row class="nav-container">
      <el-col :span="4" class="nav-left">
          <el-menu theme="dark" :router="true" :default-active="navVal" class="el-menu-vertical-demo">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-menu"></i>用户管理</template>
              <el-menu-item-group>
                <el-menu-item :route="{name:'UL'}" index="1-1">用户列表</el-menu-item>
                <el-menu-item :route="{name:'UE'}" index="1-2">用户编辑</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-menu"></i>帖子管理</template>
              <el-menu-item-group>
                <el-menu-item :route="{name:'AL'}" index="2-1">帖子列表</el-menu-item>
                <el-menu-item :route="{name:'AE'}" index="2-2">帖子编辑</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"><i class="el-icon-menu"></i>回复管理</template>
              <el-menu-item-group>
                <el-menu-item :route="{name:'RL'}" index="3-1">回复列表</el-menu-item>
                <el-menu-item :route="{name:'RE'}" index="3-2">回复编辑</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title"><i class="el-icon-menu"></i>标签管理</template>
              <el-menu-item-group>
                <el-menu-item :route="{name:'TL'}" index="4-1">标签列表</el-menu-item>
                <el-menu-item :route="{name:'TE'}" index="4-2">标签编辑</el-menu-item>
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
import { mapState } from "vuex";
export default {
  name: "main",
  computed: {
    ...mapState('app',['navVal'])
  }
};
</script>

<style>
html,body{
  height: 100%;
}
.main{
  height: 100%;
}
.top-container{
  height: 60px;
  background-color: #324157;
  color: #fff;
  font-size: 20px;
  line-height: 60px;
  padding-left: 15px;
}
.nav-container{
  height: 100%;
}
.nav-left{
  height: 80%;
}
.el-menu-vertical-demo{
  height: 100%;
}

</style>
