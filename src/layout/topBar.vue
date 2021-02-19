<template>
  <el-container>
    <el-tabs
      style="width: 100%"
      v-model="editableTabsValue"
      type="card"
      closable
      @tab-remove="removeTab"
    >
      <el-tab-pane
        v-for="item in editableTabs"
        :closable="item.closable"
        :key="item.name"
        :label="item.title"
        :name="item.name"
        class="me-tab-pane"
      >
        <jnr-dialog
          id="jnr-dialog"
          v-show="dialogVisible"
          :dataCount="dataCount"
        >
          <article slot="subItem" class="slot-subItem sperate-4">
            <div class="item" @click="closeLeft()">关闭左侧所有</div>
            <div class="item" @click="closeRight()">关闭右侧所有</div>
            <div class="item" @click="closeAll()">关闭所有</div>
            <div class="item jnr-disabled">关闭所有</div>
            <div class="item" @click="dialogVisible = false">取消</div>
          </article>
        </jnr-dialog>
        <jnrDialog v-show="false" />
        <!-- 显示内容 -->
        <el-container>
          <echarts :msg="item.content" />
        </el-container>
        <echarts v-show="false" />
      </el-tab-pane>
    </el-tabs>
  </el-container>
</template>
<script>
import jnrDialog from "@/components/menu/jnrDialog.vue";
import $ from "jquery";
import echarts from "../components/echarts/echarts.vue";
export default {
  name: "topBar",
  mounted() {
    //阻止浏览器默认右键点击事件
    // $(".me-tab-pane").bind("contextmenu", function () {
    //   return false;
    // });
    document.oncontextmenu = function () {
      return false;
    };
    let that = this;
    //接下来就可以为元素绑定右击响应函数了：
    $(".el-tabs__nav-scroll>div").mousedown(function (e) {
      //右键为3
      if (3 == e.which) {
        that.dialogVisible = true;
        // 设置当前选中的 name
        // console.log("item.name:", that.editableTabsValue);
        that.selectTabsValue = that.editableTabsValue;
      } else if (1 == e.which) {
        //左键为1
        console.log("左键");
      }
    });
  },
  data() {
    return {
      dataCount: 3, //菜单数
      dropNameList: new Array(), //待删除的name 列表
      //右键菜单是否可见
      dialogVisible: false,
      selectTabsValue: "0", //右键选中的状态 name
      editableTabsValue: "0", //代表选中 的状态 name
      editableTabs: [
        {
          title: "首页",
          name: "0", //
          content: "首页内容显示区域",
          closable: false, //首页不可关闭
        },
      ],
    };
  },
  components: { echarts, jnrDialog },
  methods: {
    // 执行方法
    handleSubItem(targetname) {
      console.log("执行方法", targetname);
    },
    closeThis() {
      this.dialogVisible = false;
      // 关闭当前的标签页
      this.removeTab(this.selectTabsValue);
    },
    closeLeft() {
      this.dialogVisible = false;
      // 关闭左侧所有
      // 不关闭首页
      for (let i = 1; i < this.editableTabs.length; i++) {
        console.log("this.editableTabs[1]:", this.editableTabs[1].name);
        // 永远删除第二个，因为删除之后个数变化，后面的元素顶替了前面的位置，相当于从头开始
        if (this.editableTabs[i].name === this.selectTabsValue) break;
        this.dropNameList.push(this.editableTabs[i].name);
      }
      // 删除
      var that = this;
      this.dropNameList.forEach((item) => {
        that.removeTab(item);
      });
      this.dropNameList = new Array();
    },
    closeRight() {
      //关闭右侧所有
      this.dialogVisible = false;
      for (let i = this.editableTabs.length - 1; i > 0; i--) {
        //不关闭首页
        if (this.editableTabs[i].name === this.selectTabsValue) break;
        this.removeTab(this.editableTabs[i].name);
      }
    },
    closeAll() {
      this.dialogVisible = false;
      var that = this;
      this.editableTabs.forEach((item) => {
        if (item.name === "0") {
          //不关闭首页
          return; //结束当前一次循环
        }
        that.removeTab(item.name);
      });
    },
    // 判断是否展开,自定义方法一律加上jnr 自定义样式一律加上me开头，避免与
    meIsOpen(name) {
      var isOpen = false;
      this.editableTabs.forEach((item) => {
        if (item.name === name) {
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
    addTab(title, name, content) {
      // 判断是否已经展开了
      // console.log(this.editableTabs);
      // 1 如果没展开则添加后选中
      if (!this.meIsOpen(name)) {
        this.editableTabs.push({
          title,
          name,
          content,
          closable: true,
        });
      }
      // 2  如果展开了就选中
      // 选中
      this.editableTabsValue = name;
    },
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter((tab) => tab.name !== targetName);
    },
  },
};
</script>
<style lang="less" scoped>
.me-dialog {
  .me-dialog-footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 0;
    margin: 0;
    border: 1px solid red;
    > .me-dialog-btn {
      flex: 1;
      border: none !important;
      text-align: left;
      width: 100%;
      margin: 4px 0;
    }
  }
}
.el-dialog--center > .el-dialog__body {
  padding: 0 !important;
}
</style>