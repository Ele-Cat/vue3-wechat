import { defineStore } from "pinia";

export const useChatStore = defineStore("chat", {
  state: () => {
    return {
      chatList: [], // 聊天列表
      chatInfos: {}, // 聊天记录
      activeChat: "", // 当前聚焦的聊天对象id
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
