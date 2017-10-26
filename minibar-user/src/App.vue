<template>
  <div id="app">
    <el-row :gutter="20">
      <el-col :span="24">
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="14" :offset="5">
        <el-col :span="24" class="type_nav">
          <el-menu :default-active="1" class="el-menu-demo" mode="horizontal">
            <el-col :span="18">
              <el-menu-item index="1"><router-link :to="{name: '/'}">看帖</router-link></el-menu-item>
              <el-menu-item index="2"><router-link :to="{name: 'notice'}">公告</router-link></el-menu-item>
              <el-menu-item index="3"><router-link :to="{name: 'appeal'}">求助</router-link></el-menu-item>
              <el-menu-item index="4"><router-link :to="{name: 'fun'}">划水</router-link></el-menu-item>
            </el-col>
            <el-col :span="6">
              <el-menu-item class="search">
                <el-input placeholder="吧内搜索" icon="search" v-model="input" :on-icon-click="handleIconClick">
                </el-input>
              </el-menu-item>
            </el-col>
          </el-menu>
        </el-col>
        <el-col :span="24">
          <el-col :span="17">
            <router-view/>
          </el-col>
          <el-col :span="7">
            <el-col>
              <el-card :body-style="{ padding: '0px' }">
                <img src="./image/user.png" class="image">
                <div style="padding: 14px;">
                  <span>user</span>
                  <div class="bottom clearfix">
                    <time class="time">{{ currentDate }}</time>
                    <el-button type="text" class="button">操作按钮</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-col>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      activeIndex: '1',
      input: '',
      currentDate: new Date()
    }
  },
  methods: {
    handleIconClick() {
      console.log(123)
    }
  }
}
</script>

<style>
html,
body {
  padding: 0;
  margin: 0;
}

.el-col {
  padding: 0 !important;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
a {
  text-decoration: none
}
</style>

<style scoped>
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    padding: 5px;
    width: 50%;
    display: inline-block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both
  }

</style>

