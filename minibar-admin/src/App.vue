<template>
  <div id="app">
    <el-row class="containerBox">
      <el-col :span="20" :offset="2" class="container">
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

#app{
  height: 100%;
}
.containerBox,.container{
  height: 100%;
}
</style>
