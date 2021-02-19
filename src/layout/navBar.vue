
<template>
  <el-container class="hello">
    <el-aside width="200px" style="background-color: #fff">
      <!-- <el-menu :default-openeds="['1']"> -->
      <el-menu>
        <el-submenu
          v-for="(items, index) in menu"
          :key="index"
          :index="items.index"
        >
          <el-menu-item
            v-for="(subItems, subIndex) in items.subMenus"
            @click="
              showTabContent(
                subItems.index,
                subItems.title,
                subItems.content,
                subItems.applyClose
              )
            "
            :key="subIndex"
            :index="subItems.index"
          >
            <template slot="title"
              ><i :class="subItems.icon"></i>{{ subItems.title }}
            </template>
          </el-menu-item>
          <template slot="title"
            ><i :class="items.icon"></i>{{ items.title }}
          </template>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="me-header" height="5rem">
        <el-container class="me-top-menu">
          <el-menu
            :default-active="activeIndex2"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#fff"
            text-color="#636e72"
            active-text-color="#6c5ce7"
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
        </el-container>
        <el-container>
          <el-breadcrumb
            separator-class="el-icon-arrow-right"
            class="me-breadcrumb"
          >
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
          </el-breadcrumb>
        </el-container>
        <!-- </div> -->
      </el-header>
      <el-main style="height: 100vh; border: 1px solid #eee">
        <!--
           1 :dataList : 必须，预先显示的标签数据，并且在之后的更新标签中会用到（结合菜单使用）
           2 height： 非必须，指定面板高度
            dataList 的字段 格式如下： ，
               index：必须 代表唯一标识符，无序的数字，便于展示
              title：必须 标签标题 
              content: 必须，标签对应的内容，可以是字符串也可以是标签
              applyClose:是否允许关闭， 默认为false
          3 @tab-click： 标签点击事件 非必须 ，用于在完成点击之后额外的用户操作
          4 @tab-close： 关闭按钮 非必须，用于在完成关闭之后额外的用户操作
         -->
        <jnr-tabs
          :dataList="dataList"
          :height="tabHeight"
          @tab-click="tabClick"
          @tab-close="tabClose"
        >
          <!-- 1 子组件定义 -->
          <!-- 标题区域 -->
          <!-- 
   <slot name="header">
            <div
              class="jnr-tabs-title-item"
              :key="index"
              :data-index="item.index"
              v-for="(item, index) in dataList"
            >
              <i :data-index="item.index" v-show="item.applyClose">×</i>
              {{ item.title }}
            </div>
 -->
          <!-- 除了自带的菜单项，还可以自定义，甚至可以完全自定义自带菜单 -->
          <slot name="item"><div class="jnr-disabled item">禁止</div> </slot>
          <!-- </slot> -->

          <echarts v-show="false"></echarts>
          <div slot="content"><echarts></echarts></div>
        </jnr-tabs>
      </el-main>
    </el-container>
  </el-container>
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
// import $ from "jquery";
import echarts from "../components/echarts/echarts.vue";
import jnrTabs from "../components/jnr/jnrTabs.vue";
export default {
  name: "navBar",

  components: { echarts, jnrTabs },
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
      tabHeight: "400px", // tab面板高度
      dataList: [
        {
          index: 1,
          title: "首页",
          content: `
          <h1>首页我是标签对应的内容</h1>
          <p>首页文本信息</p>
          `,
          applyClose: false,
        },
      ],
      tabsCurrentIndex: 1, //当前点击的标签index
      activeIndex: "1", //最上面导航栏
      activeIndex2: "1", //最上面导航栏
      tableData: Array(20).fill(item),
      menu: [
        {
          index: "1",
          title: "图表管理",
          icon: "el-icon-monitor",
          subMenus: [
            {
              index: "11",
              title: "条形图",
              icon: "el-icon-s-marketing",
              content: `
         <el-progress :text-inside="true" :stroke-width="26" :percentage="70"></el-progress>
<el-progress :text-inside="true" :stroke-width="24" :percentage="100" status="success"></el-progress>
<el-progress :text-inside="true" :stroke-width="22" :percentage="80" status="warning"></el-progress>
<el-progress :text-inside="true" :stroke-width="20" :percentage="50" status="exception"></el-progress>
          `,
              applyClose: true,
            }, //是否 需要 关闭 × 图标
            {
              index: "12",
              title: "饼图",
              icon: "el-icon-pie-chart",
              content: `
          <h1>饼图我是标签对应的内容</h1>
          <p>饼图文本信息</p>
          `,
              applyClose: true,
            },
            {
              index: "13",
              title: "柱状图",
              icon: "el-icon-s-data",
              content: `
          <h1>我是标签对应的内容</h1>
          <p>文本信息</p>
          `,
              applyClose: true,
            },
            {
              index: "14",
              title: "复式图",
              icon: "el-icon-s-grid",
              content: `
          <h1>我是标签对应的内容</h1>
          <p>文本信息</p>
          `,
              applyClose: true,
            },
          ],
        },
        {
          index: "2",
          title: "权限管理",
          icon: "el-icon-lock",
          subMenus: [
            {
              index: "21",
              title: "权限查看",
              icon: "el-icon-notebook-1",
              content: `
          <h1>我是标签对应的内容</h1>
          <p>文本信息</p>
          `,
              applyClose: true,
            },
            {
              index: "22",
              title: "修改权限",
              icon: "el-icon-unlock",
              content: `
          <h1>我是标签对应的内容</h1>
          <p>文本信息</p>
          `,
              applyClose: true,
            },
          ],
        },
        {
          index: "3",
          title: "挂号与叫号管理",
          icon: "el-icon-phone",
          subMenus: [
            {
              index: "31",
              title: "挂号管理",
              icon: "el-icon-collection-tag",
              content: `
          <h1>我是标签对应的内容</h1>
          <p>文本信息</p>
          `,
              applyClose: true,
            },
            {
              index: "32",
              title: "叫号管理",
              icon: "el-icon-phone-outline",
              content: `
          <h1>我是标签对应的内容</h1>
          <p>文本信息</p>
          `,
              applyClose: true,
            },
          ],
        },
        {
          index: "4",
          title: "公告与文章管理",
          icon: "el-icon-message",
          subMenus: [
            {
              index: "41",
              title: "查看列表",
              icon: "el-icon-notebook-2",
              content: `
          <h1>我是标签对应的内容</h1>
          <p>文本信息</p>
          `,
              applyClose: true,
            },
            {
              index: "42",
              title: "编辑",
              icon: "el-icon-edit",
              content: `
         <el-progress :percentage="100" status="success"></el-progress>
<el-progress :percentage="100" status="warning"></el-progress>
<el-progress :percentage="50" status="exception"></el-progress>
          `,
              applyClose: true,
            },
          ],
        },
        {
          index: "5",
          title: "账号管理",
          icon: "el-icon-s-custom",
          subMenus: [
            {
              index: "51",
              title: "查看资料",
              icon: "el-icon-place",
              content: `
          <h1>我是标签对应的内容</h1>
          <p>文本信息</p>
          `,
              applyClose: true,
            },
            {
              index: "52",
              title: "修改资料",
              icon: "el-icon-setting",
              content: `
          <h1>我是标签对应的内容</h1>
          <p>文本信息</p>
          `,
              applyClose: true,
            },
            {
              index: "53",
              title: "注销登录",
              icon: "el-icon-circle-close",
              content: `
          <h1>我是标签对应的内容</h1>
          <p>文本信息</p>
          `,
              applyClose: true,
            },
          ],
        },
      ],
    };
  },
  methods: {
    // 判断是否展开,自定义方法一律加上jnr 自定义样式一律加上me开头，避免与
    meIsOpen(index) {
      var isOpen = false;
      this.dataList.forEach((item) => {
        if (item.index === index) {
          isOpen = true;
          return;
        }
      });
      // console.log("isOpen:", isOpen);

      return isOpen;
    },
    // 关闭弹出框
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    //点击了标签事件
    tabClick() {
      //
      console.log("我是父组件自定义方法tabClick，被执行了");
    },
    //自定义的关闭事件
    tabClose() {
      console.log("我是父组件自定义方法tabClose，被执行了");
    },
    addTab(index, title, content, applyClose) {
      // 判断是否已经展开了
      // console.log(this.editableTabs);
      // 1 如果没展开则添加后选中
      if (!this.meIsOpen(index)) {
        this.dataList.push({
          index,
          title,
          content,
          applyClose,
        });
      }
      console.log(content);

      // 2  如果展开了就选中
      // 选中
      this.tabsCurrentIndex = index;
    },
    showTabContent(index, title, content, applyClose) {
      // 调用子组件的方法
      // const useTab = this.$refs.useTab;
      this.addTab(index, title, content, applyClose);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  mounted() {},
};
</script>
<style lang="less">
.me-header {
  margin-bottom: 1rem;
  background-color: #fff;
  a {
    text-decoration: none;
  }
  display: flex !important;
  flex-direction: column;
  .me-top-menu {
    display: flex;
    justify-content: flex-end;
    width: 100% !important;
    border-bottom: none !important;
  }
  .me-breadcrumb {
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
el-menu-demo el-menu--horizontal el-menu > li {
  border-bottom: none !important;
}
</style>
