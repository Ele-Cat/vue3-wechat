import { defineStore } from "pinia";

export const useContextMenuStore = defineStore("contextMenu", {
  state: () => {
    return {
      menuVisible: false,
      menuTop: 0,
      menuLeft: 0,
    };
  },
  actions: {
    showContextMenu(top, left) {
      this.menuVisible = true;
      this.menuTop = top;
      this.menuLeft = left;
    },
    hideContextMenu() {
      this.menuVisible = false;
    },
  },
});
