<template>
  <div id="app">
    <el-row :gutter="20">
      <el-col :span="14" :offset="5">
        <router-view/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'app',
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



