<template>
  <div class="jnrNavBar">
    <ul>
      <li>houdunren</li>
      <li>视频教程</li>
      <li>每晚直播</li>
      <li>在线文档</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "jnrNavBar",
  props: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="less" scoped>
* {
  padding: 0;
  margin: 0;
  font-size: 14px;
}
.jnrNavBar {
  width: 100%;
  border-bottom: 1px solid #ddd;
  ul {
    display: flex;
    align-items: center;
    background: #f3f3f3;
    list-style: none;
    justify-content: flex-end;
    &:nth-child(1) {
      display: flex;
      align-items: center;
      margin-right: auto;
    }
    li {
      margin: 0 0.8rem;
      cursor: pointer;
      color: #3498db;
      &:hover {
        border-top: 2px solid #2ecc71;
        color: #2c3e50;
        z-index: 1;
      }
    }
  }
}
</style>