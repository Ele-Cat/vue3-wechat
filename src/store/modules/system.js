import { defineStore } from "pinia";

export const useSystemStore = defineStore("system", {
  state: () => {
    return {
      activeMenu: "message", // 当前聚焦的工具栏目
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
