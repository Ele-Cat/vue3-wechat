import { defineStore } from "pinia";

export const useUserInfoStore = defineStore("userInfo", {
  state: () => {
    return {
      user: {}
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
