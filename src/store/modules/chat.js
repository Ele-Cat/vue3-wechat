import { defineStore } from "pinia";

export const useChatStore = defineStore("chat", {
  state: () => {
    return {
      chatList: [],
      chatInfos: {},
      activeChat: "",
    };
  },
  // actions: {
  //   addChat() {
  //     this.chatList.shift({
  //       id: '2',
  //       name: '',
  //       type: '',
  //       lastChatTime: '',
  //       lastChatContnt: '',
  //       lastChatContntType: '',
  //       avatar: '',
  //     })
  //   },
  //   editChat() {

  //   },
  //   deleteChat() {},
  // },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
      },
    ],
  },
});
