import { defineStore } from "pinia";
const { innerWidth, innerHeight } = window;

export const useSystemStore = defineStore("system", {
  state: () => {
    return {
      activeMenu: "message", // 当前聚焦的工具栏目
      windows: {
        top: 0,
        left: 0,
        width: 850,
        height: 660,
      },
      boxTitleText: '', // 聊天、收藏夹的标题，因为俩地儿都用到了，就放这儿吧
      isLocked: false, // 是否为锁屏状态
    };
  },
  getters: {
    wechatStyle() {
      return {
        top: `${(innerHeight - this.windows.height) / 2}px`,
        left: `${(innerWidth - this.windows.width) / 2}px`,
        width: `${this.windows.width}px`,
        height: `${this.windows.height}px`,
      }
    },
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
