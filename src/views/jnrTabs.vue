<template>
  <div class="jnr-tabs">
    <!-- 标题区域 -->
    <header class="jnr-tabs-title">
      <slot name="header">
        <div
          class="jnr-tabs-title-item"
          :key="index"
          :data-index="item.index"
          v-for="(item, index) in titleArray"
        >
          <i :data-index="item.index">×</i>
          {{ item.title }}
        </div>
      </slot>
    </header>
    <div class="jnr-dialog" v-show="jnrVisable">
      <main class="subItem sperate-4">
        <slot name="subItem"
          ><div class="item">关闭左侧所有</div>
          <div class="item">关闭右侧所有</div>
          <div class="item">关闭所有</div>
          <div class="jnr-disabled item">禁止</div>
        </slot>
      </main>
    </div>
    <!-- 内容区域 -->
    <main class="jnr-tabs-content" :style="style">
      <slot name="content">我是内容区域</slot>
    </main>
  </div>
</template>
<script>
import $ from "jquery";
export default {
  name: "tabs",
  components: {},
  props: { height: String, dialogVisible: Boolean, editableTabsValue: Number }, //接受传递过来的参数,
  data() {
    return {
      style: "height:100px;",
      jnrVisable: false,
      jnrTabValue: 1,
      titleArray: [
        { index: 11, title: "条形图" },
        { index: 12, title: "饼图" },
      ],
    };
  },
  mounted() {
    document.oncontextmenu = function () {
      return false;
    };
    console.log(this.height);
    //   拼接参数
    if (this.height === "" || this.height === null) {
      console.log("没有传递高");
    } else {
      this.style = `height:${this.height};`;
    }
    const that = this;

    this.jnrVisable = this.dialogVisible;
    //测试用
    //添加点击事件

    //接下来就可以为元素绑定右击响应函数了：
    $(".jnr-tabs>.jnr-tabs-title>.jnr-tabs-title-item").mousedown(function (e) {
      //右键为3
      if (3 == e.which) {
        console.log("我被右键点击了", this);
        that.jnrVisable = true;
        var index = $(this).attr("data-index");
        console.log("index:", index);

        $(".jnr-tabs>.jnr-dialog").css({
          left: `calc( ${index} * 5.1rem -  2.2rem )`,
        });
        //设置显示的位置
        // 设置当前选中的 name
        // that.selectTabsValue = that.editableTabsValue;
      }
    });
    // 点击事件
    $(".jnr-tabs>.jnr-tabs-title>.jnr-tabs-title-item").click(function () {
      console.log("item 被点击了");
      // 设置当前选中的 index
      that.jnrTabValue = $(this).attr("data-index");

      //显示关闭图标
    });

    $(".jnr-tabs>.jnr-tabs-title>.jnr-tabs-title-item>i").click(function () {
      console.log("i 被点击了");
      that.jnrTabValue = $(this).attr("data-index");
      //关闭当前标签和对应的内容
      let tabs = that.titleArray;
      console.log("i ", that.jnrTabValue);
      that.titleArray = tabs.filter((tab) => {
        return tab.index != that.jnrTabValue;
      });
      that.jnrTabValue--;
      if (that.jnrTabValue < 1) that.jnrTabValue = 1;
      console.log("i ", that.jnrTabValue);
      //关闭
      that.jnrVisable = false;
      return false; //阻止父级事件发生
    });

    $("body").click(() => {
      this.jnrVisable = false;
    });
  },
  methods: {},
};
</script>
<style lang="less" scoped>
* {
  padding: 0;
  margin: 0;
  font-size: 14px;
}
.jnr-tabs {
  display: flex;
  flex-direction: column;
  .jnr-tabs-title {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-left: 2rem;
    position: relative;
    .jnr-tabs-title-item {
      font-size: 0.85rem;
      border: 1px solid #ddd;
      border-bottom: none;
      width: 5.1rem;
      height: 2.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      position: relative;

      i {
        display: flex;
        border-radius: 50%;
        position: absolute;
        justify-content: center;
        align-items: center;
        right: 10%;
        top: 50%;
        transform: translateY(-50%);
        visibility: hidden;
        height: 0.9rem;
        width: 0.9rem;
      }
      &:hover {
        color: #00a8ff;
        width: 6rem;
      }
      &:hover > i {
        background: #95a5a6;
        color: white;
        visibility: visible;
      }
    }
    // 下边框
    &::before {
      content: "";
      border-bottom: 1px solid #ddd;
      position: absolute;
      bottom: 0;
      width: 100%;
    }
  }
  //菜单
  .jnr-dialog {
    background: #fff;
    z-index: 1;
    color: #000;
    border: 1px solid #e4e7ed;
    border-top-left-radius: 5px;
    border-color: #ddd;
    border-top-right-radius: 5px;
    width: 15.7rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    position: absolute;
    font-family: "Fira Code";
    // 第几个就是 2.8rem + 6 * nrem
    left: calc(2.8rem + 6rem);
    top: 2.7rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

    .subItem {
      width: 100%;
      .item {
        font-size: 0.78rem;
        box-sizing: border-box;
        width: 100%;
        margin-top: 10px;
        cursor: pointer;
        padding-left: 26px;
        padding-top: 5px;
        padding-bottom: 5px;
        // border: 1px solid red;
        &:hover {
          background: rgb(200, 200, 201);
        }
        &.jnr-disabled {
          color: rgb(162, 165, 169);
          cursor: not-allowed;
        }
      }
    }
    .sperate-1 {
      & > .item:nth-of-type(1n) {
        border-bottom: 1px solid #ddd;
        padding-top: 5px;
      }
    }
    .sperate-2 {
      & > .item:nth-of-type(2n) {
        border-bottom: 1px solid #ddd;
        padding-top: 5px;
      }
    }
    .sperate-3 {
      & > .item:nth-of-type(3n) {
        border-bottom: 1px solid #ddd;
        padding-top: 5px;
      }
    }
    .sperate-4 {
      & > .item:nth-of-type(4n-1) {
        border-bottom: 1px solid #ddd;
        padding-top: 5px;
      }
    }
  }
  .jnr-tabs-content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
}
</style>