<template>
  <div class="jnr-tabs">
    <!-- 标题区域 -->
    <header class="jnr-tabs-title">
      <slot name="header">
        <div
          @click="tabClick"
          class="jnr-tabs-title-item"
          :key="index"
          :data-index="item.index"
          v-for="(item, index) in tabsDataArray"
          @contextmenu="rightClick(item, $event)"
        >
          <i :data-index="item.index" v-show="item.applyClose" @click="tabClose"
            >×</i
          >
          {{ item.title }}
        </div>
      </slot>
      <!-- 菜单 -->
      <div class="jnr-dialog" v-show="tabsMenuVisable">
        <article class="subItem sperate-4">
          <!-- 配置的具备的项 -->
          <div class="item" @click="closeLeft">关闭左侧所有</div>
          <div class="item" @click="closeRight">关闭右侧所有</div>
          <div class="item" @click="closeAll">关闭所有</div>
          <div class="item" @click="cancel">取消</div>
          <!-- 自定义项 ，需要自己编写功能-->
          <slot name="item"><div class="jnr-disabled item">禁止</div></slot>
        </article>
      </div>
    </header>

    <!-- 内容区域 -->
    <main class="jnr-tabs-content" :style="style">
      <slot name="content">
        <div v-html="tabsCurrentContent"></div>
      </slot>
    </main>
  </div>
</template>
<script>
import $ from "jquery";
export default {
  name: "tabs",
  components: {},
  watch: {
    //监听 用户 dataList 的变化，一有更新马上同步更新本组件 tabsDataArray
    dataList(newVal, oldVal) {
      console.log("旧的数组：", oldVal);
      console.log("新的数组：", newVal);
      this.tabsDataArray = newVal;
    },
  },
  // 接收用于预定义数据
  props: {
    //接受传递过来的参数,
    height: String, //设置组件的高度  非必须
    dataList: Array, //预先显示的标签 必须
    //接收父组件传递过来的方法
    // tabClose: {
    //   type: Function,
    //   default: null,
    // },
    // tabClick: {
    //   type: Function,
    //   default: null,
    // },
  },
  data() {
    return {
      style: "height:100px;", //整个容器的默认高度样式
      tabsCurrentContent: "", //当前菜单项的内容
      tabsMenuVisable: false, //右键菜单是否显示
      tabsCurrentIndex: 1, //当前激活序号
      tabsDataArray: [] /*实际上的数据列表 ，
      有
      id: 代表是第几个，便于索引 
      index：代表唯一标识符，无序的数字，便于展示
      title：标签标题
      applyClose:是否允许关闭，需要默认为false
    */,
    };
  },
  // 使用计算属性修改 父组件传过来的值 dataList
  computed: {
    dataList: {
      get() {
        //计算属性的get方法，返回值，初始化时会被调用,当data相关的值没有发生变化时，从缓存中取
        return this.getUtcTime(date) + this.str;
      },
      set(val) {
        //计算属性的set方法，修改设置值,当data相关值发生变化，会调用该方法，之后再调用get方法
        console.log("调用了 set", val);
      },
    },
  },
  // 预处理用户自定义数据
  mounted() {
    // 0 避免作用域失效  复制 this
    const that = this;
    // 1赋值
    // 1.1  拼接传递过来的 height 参数
    if (!this.height) {
      console.log("没有传递高");
    } else {
      this.style = `height:${this.height};`;
    }

    //1.2 复制初始数据  使用深拷贝

    if (this.dataList) {
      this.dataList.forEach((item) => {
        that.tabsDataArray.push(item);
      });
    }
    // 删除没用的对象, 还没写;

    //2 禁止页面默认右键事件
    document.oncontextmenu = function () {
      return false;
    };
    //3 当点击页面其他地方时，关闭右键触发的菜单
    $("body").click(() => {
      // this.tabsMenuVisable = false;
    });

    //4默认显示第一个 面板内容
    //切换面板显示
    this.changeContent();
  },
  methods: {
    // 关闭菜单
    closeMenu() {
      this.tabsMenuVisable = false;
      // 关闭当前样式
      //其他样式全部关闭
      $(".jnr-tabs>.jnr-tabs-title>.jnr-tabs-title-item").css({
        color: "#6F7374",
      });
      //恢复原来的选中的样式
      var countIndex = 0; //当前项是第几个
      for (var i = 0; i < this.tabsDataArray.length; i++) {
        if (this.tabsCurrentIndex == this.tabsDataArray[i].index) {
          countIndex = i + 1;
          break;
        }
      }
      $(
        `.jnr-tabs>.jnr-tabs-title>.jnr-tabs-title-item:nth-of-type(${countIndex})`
      ).css({
        color: "#00a8ff",
      });
    },
    //右键事件
    rightClick(item, event) {
      //当前追加样式
      event.toElement.style.color = "#27ae60";
      // 显示菜单
      this.tabsMenuVisable = true;

      //获取当前选中的标签 index
      this.selectIndex = item.index;
      //设置当前的右键选中的index

      // 根据 position 设置菜单位置
      // console.log(event.target.style.width, event.target.style.height);
      var offsetX = event.offsetX;
      var offsetY = event.offsetY;
      var screenX = event.screenX;
      var screenY = event.screenY;
      var clientX = event.clientX;
      var clientY = event.clientY;
      var pageX = event.pageX;
      var pageY = event.pageY;
      var countIndex = 0; //当前项是第几个
      for (var i = 0; i < this.tabsDataArray.length; i++) {
        if (item.index == this.tabsDataArray[i].index) {
          countIndex = i;
          break;
        }
      }
      var left = offsetX + countIndex * 5.1 * 14;
      var top = parseInt($(event.target).css("height").split("px")[0]);

      console.log("left", left, "top", top);
      $(".jnr-tabs>.jnr-tabs-title>.jnr-dialog").css({
        left: left + "px",
        top,
      });

      {
        //无意义的
        let a =
          offsetX +
          offsetY +
          screenX +
          screenY +
          clientX +
          clientY +
          pageX +
          pageY;
        offsetY = a;
      }
    },
    //切换面板显示
    changeContent() {
      //切换内容
      for (let i = 0; i < this.tabsDataArray.length; i++) {
        if (this.tabsDataArray[i].index == this.tabsCurrentIndex) {
          this.tabsCurrentContent = this.tabsDataArray[i].content;
          break;
        }
      }
    },
    // 提供鼠标点击标签事件/切换
    tabClick(target) {
      console.log("item 被点击了,我是子组件提供的方法");
      // 设置当前选中的 index
      this.tabsCurrentIndex = target.toElement.dataset.index;
      //显示关闭图标
      //再执行父组件的方法 方法没有参数时第二个参数用 null或者不写第二个参数也行，父组件没有此方法不会报错
      this.$emit("tab-click", null);
      console.log("tabsDataArray,", this.tabsDataArray);
      //切换面板显示
      this.changeContent();
      //其他样式全部关闭
      $(".jnr-tabs>.jnr-tabs-title>.jnr-tabs-title-item").css({
        color: "#6F7374",
      });
      //添加选中样式
      console.log(" $(target)", target);
      target.toElement.style.color = "#00a8ff";
    },
    // 提供关闭功能
    tabClose(target) {
      console.log("子组件关闭图标 i 被点击了", target);
      // 获取自定义属性的 data-index
      this.tabsCurrentIndex = target.toElement.dataset.index;
      //关闭当前标签和对应的内容
      let tabs = this.tabsDataArray;
      console.log("this.tabsCurrentIndex ", this.tabsCurrentIndex);
      this.tabsDataArray = tabs.filter((tab) => {
        return tab.index != this.tabsCurrentIndex;
      });
      this.tabsCurrentIndex--;
      if (this.tabsCurrentIndex < 1) this.tabsCurrentIndex = 1;
      console.log("this.tabsCurrentIndex ", this.tabsCurrentIndex);
      //关闭当前菜单
      this.tabsMenuVisable = false;

      //再执行父组件的方法
      this.$emit("tab-close");
      //删除选中样式
      //切换面板显示
      this.changeContent();
      //阻止父级事件发生
      return false;
    },
    // 删除指定元素
    removeTab(index) {
      // 是可以关闭的才能关
      let tabs = this.tabsDataArray;
      this.tabsDataArray = tabs.filter((tab) => {
        // 关闭 index项
        return tab.index != index || !tab.applyClose; //返回关不了的新数组
      });
      //更新 dataList
      this.dataList = this.tabsDataArray;
    },
    //提供右键打开菜单事件
    closeLeft() {
      const that = this;
      var dropNameList = new Array();
      // 关闭左侧所有
      // 不关闭首页
      for (let i = 1; i < this.tabsDataArray.length; i++) {
        // 永远删除第二个，因为删除之后个数变化，后面的元素顶替了前面的位置，相当于从头开始
        if (this.tabsDataArray[i].index === this.selectIndex) break;
        dropNameList.push(this.tabsDataArray[i].index);
      }
      // 删除
      dropNameList.forEach((item) => {
        that.removeTab(item);
      });
      // 关闭菜单面板
      this.closeMenu();
    },

    // 菜单事件
    closeRight() {
      const that = this;
      var dropNameList = new Array();
      //关闭右侧所有
      for (let i = this.tabsDataArray.length - 1; i > 0; i--) {
        //不关闭首页
        if (this.tabsDataArray[i].index === this.selectIndex) break;
        this.removeTab(this.tabsDataArray[i].index);
      }
      dropNameList.forEach((item) => {
        that.removeTab(item);
      });
      // 关闭菜单面板
      this.closeMenu();
    },
    //关闭所有
    closeAll() {
      const that = this;
      var tabs = this.tabsDataArray;
      tabs.forEach((item) => {
        that.removeTab(item.index);
      });
      // 关闭菜单面板
      this.closeMenu();
    },
    cancel() {
      // 关闭菜单面板
      this.closeMenu();
    },
  },
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

    //菜单
    .jnr-dialog {
      background: #fff;
      z-index: 1;
      color: #000;
      border: 1px solid #e4e7ed;
      border-top-left-radius: 5px;
      border-color: #ddd;
      border-top-right-radius: 5px;
      width: 12.7rem;
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
      // 第一个默认显示
      &:nth-of-type(1) {
        color: #00a8ff;
      }
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

  .jnr-tabs-content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
}
</style>