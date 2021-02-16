
<template>
  <div class="hello">
    <div class="me-top" data-title="我的网站" data-logo="JNR">
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo me-top-menu"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1">处理中心</el-menu-item>
        <el-submenu index="2">
          <template slot="title">我的工作台</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
            <el-menu-item index="2-4-2">选项2</el-menu-item>
            <el-menu-item index="2-4-3">选项3</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="3" disabled>消息中心</el-menu-item>
        <el-menu-item index="4">
          <div>
            <el-avatar
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            ></el-avatar></div
        ></el-menu-item>
      </el-menu>
    </div>
    <el-container style="height: 100vh; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <!-- <el-menu :default-openeds="['1']"> -->
        <el-menu>
          <el-submenu
            v-for="(items, index) in menu"
            :key="index"
            :index="index"
          >
            <el-menu-item
              v-for="(item, i) in items.items"
              @click="showTabContent(i, item.title)"
              :key="i"
              :index="i"
            >
              <template slot="title"
                ><i :class="item.icon"></i>{{ item.title }}
              </template>
            </el-menu-item>
            <template slot="title"
              ><i :class="items.icon"></i>{{ items.title }}
            </template>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 1 子组件定义 -->
        <top-bar ref="useTab"></top-bar>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="less">
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>


<script>
import topBar from "@/layout/topBar.vue";
export default {
  name: "navBar",
  components: { topBar },
  props: {
    msg: String,
  },
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄",
    };
    return {
      html: false,
      tableData: Array(20).fill(item),
      menu: [
        {
          id: 1,
          title: "图表管理",
          icon: "el-icon-s-marketing",
          items: [
            { id: 1 - 1, title: "条形图", icon: "" },
            { id: 1 - 2, title: "饼图" },
            { id: 1 - 3, title: "柱状图", icon: "el-icon-s-data" },
            { id: 1 - 4, title: "复式图" },
          ],
        },
        {
          id: 2,
          title: "权限管理",
          icon: "el-icon-s-marketing",
          items: [
            { id: 2 - 1, title: "权限查看" },
            { id: 2 - 2, title: "修改权限" },
          ],
        },
        {
          id: 3,
          title: "挂号与叫号管理",
          icon: "el-icon-s-marketing",
          items: [
            { id: 3 - 1, title: "挂号管理" },
            { id: 3 - 2, title: "叫号管理" },
          ],
        },
        {
          id: 4,
          title: "公告与文章管理",
          icon: "el-icon-s-comment",
          items: [
            { id: 4 - 1, title: "查看列表" },
            { id: 4 - 2, title: "发布公告和文章" },
          ],
        },
        {
          id: 5,
          title: "账号管理",
          icon: "el-icon-s-custom",
          items: [
            { id: 5 - 1, title: "查看资料" },
            { id: 5 - 2, title: "修改资料", icon: "el-icon-setting" },
            { id: 5 - 3, title: "注销登录" },
          ],
        },
      ],
    };
  },
  methods: {
    showTabContent(index, title) {
      // 调用子组件的方法
      const useTab = this.$refs.useTab;
      useTab.addTab(title, "name" + index, "content" + index);
    },
  },
};
</script>
<style lang="less">
.me-navbar-header {
  background: #545c64;
}
.me-top {
  position: relative;
  &::before {
    content: attr(data-title);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 1em;
    width: 4em;
    line-height: 1em;
    font-size: 1rem;
    color: #273c75;
  }
  &::after {
    content: attr(data-logo);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(50%, -50%);
    display: inline-block;
    height: 1em;
    width: 4em;
    font-size: 2rem;
    transition: 1s;
    color: #273c75;
  }
  &:hover::after {
    transform: translate(50%, -50%) rotate(360deg);
    color: #4cd137;
  }
  a {
    text-decoration: none;
  }
  display: flex;
  justify-content: flex-end;
  width: 100%;
  z-index: 2;
  background: linear-gradient(
      to right,
      #55efc4,
      white,
      #81ecec,
      white,
      #74b9ff,
      white,
      #dfe6e9,
      white,
      #ffeaa7
    )
    rgba(0, 0, 0, 0.4);
  ul.me-top-menu,
  ul.me-top-menu > li,
  s ul.me-top-menu > li > div {
    background: none !important;
    color: #2d3436 !important;
  }
}
</style>
