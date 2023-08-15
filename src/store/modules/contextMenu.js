import { defineStore } from "pinia";

export const useContextMenuStore = defineStore("contextMenu", {
  state: () => {
    return {
      menuVisible: false, // 是否显示右键菜单
      menuLeft: 0, // 菜单位置横坐标
      menuTop: 0, // 菜单位置纵坐标
      // TODO 即便是相同模块，不同状态的条目菜单也是不同的，得空再补充吧
      showInModule: "", // 每个模块展示的右键菜单都不一样，chat、friend、collect，对应字典在src\utils\contextMenu.js
      carryEntryInfo: {}, // 点击右键菜单时，携带的条目信息
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
