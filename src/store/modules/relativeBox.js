import { defineStore } from "pinia";

export const useRelativeBoxStore = defineStore("relativeBox", {
  state: () => {
    return {
      boxVisible: false, // 是否显示右键菜单
      boxLeft: 0, // 菜单位置横坐标
      boxTop: 0, // 菜单位置纵坐标
    };
  },
  actions: {
    // 显示右键菜单
    showBox(top, left) {
      this.boxVisible = true;
      this.boxLeft = left;
      this.boxTop = top;
    },
    // 隐藏右键菜单
    hideBox() {
      this.boxVisible = false;
    },
  },
});
