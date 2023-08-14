import { defineStore } from "pinia";

export const useContextMenuStore = defineStore("contextMenu", {
  state: () => {
    return {
      menuVisible: false, // 是否显示右键菜单
      menuLeft: 0, // 菜单位置横坐标
      menuTop: 0, // 菜单位置纵坐标
    };
  },
  actions: {
    // 显示右键菜单
    showContextMenu(top, left) {
      this.menuVisible = true;
      this.menuLeft = left;
      this.menuTop = top;
    },
    // 隐藏右键菜单
    hideContextMenu() {
      this.menuVisible = false;
    },
  },
});
