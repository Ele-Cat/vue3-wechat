import { defineStore } from "pinia";

export const useSystemStore = defineStore("system", {
  state: () => {
    return {
      activeMenu: "message",
      boxTitleText: '',
      contextMenu: {
        visible: false,
        top: 0,
        left: 0,
      },
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
