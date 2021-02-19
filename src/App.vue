<template>
  <div id="app">
    <el-button-group v-show="false">
      <router-link class="link" to="/home">
        <el-button type="primary">home</el-button></router-link
      ><br />
      <router-link class="link" to="/navBar">
        <el-button type="primary">navBar</el-button></router-link
      ><br />
      <router-link class="link" to="/topBar">
        <el-button type="primary">topBar</el-button></router-link
      ><br />
      <router-link class="link" to="/jnrNavBar">
        <el-button type="primary">jnrNavBar</el-button></router-link
      ><br />
      <router-link class="link" to="/jnrDialog">
        <el-button type="primary">jnrDialog</el-button></router-link
      ><br />
      <router-link class="link" to="/jnrTabs">
        <el-button type="primary">jnrTabs</el-button></router-link
      ><br />
    </el-button-group>
    <router-view />
  </div>
</template>
<style lang="less" scoped>
.link {
  text-decoration: none;
}
</style>

