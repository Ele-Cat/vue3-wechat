import { defineStore } from "pinia";
const { innerWidth, innerHeight } = window;

export const useSystemStore = defineStore("system", {
  state: () => {
    return {
      activeMenu: "message", // 当前聚焦的工具栏目
      windows: { // 窗口信息
        top: 0,
        left: 0,
        width: 850,
        height: 660,
        minWidth: 700,
        minHeight: 500,
      },
      boxTitleText: '', // 聊天、收藏夹的标题，因为俩地儿都用到了，就放这儿吧
      isLocked: false, // 是否为锁屏状态
    };
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
      },
    ],
  },
});
