import { defineStore } from "pinia";

export const useRelativeBoxStore = defineStore("relativeBox", {
  state: () => {
    return {
      boxLeft: 0, // 菜单位置横坐标
      boxTop: 0, // 菜单位置纵坐标
    };
  },
  actions: {
    // 显示右键菜单
    showBox(top, left) {
      this.boxLeft = left;
      this.boxTop = top;
    },
  },
});
