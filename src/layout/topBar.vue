<template>
  <el-container>
    <!-- <el-button size="small" @click="addTab(editableTabsValue)">
        add tab
      </el-button> -->
    <el-tabs
      style="width: 100%"
      v-model="editableTabsValue"
      type="card"
      closable
      @tab-remove="removeTab"
    >
      <el-tab-pane
        v-for="item in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      >
        <!-- 显示内容 -->
        <el-container>
          <echarts :msg="item.content" />
        </el-container>
      </el-tab-pane>
    </el-tabs>
  </el-container>
</template>
<script>
import echarts from "../components/echarts/echarts.vue";
export default {
  name: "topBar",

  data() {
    return {
      editableTabsValue: "2",
      editableTabs: [
        {
          title: "Tab 1",
          name: "1",
          content: "Tab 1 content",
        },
        {
          title: "Tab 2",
          name: "2",
          content: "Tab 2 content",
        },
      ],
      tabIndex: 2,
    };
  },
  components: { echarts },
  methods: {
    addTab(title, name, content) {
      this.editableTabs.push({
        title,
        name,
        content,
      });
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