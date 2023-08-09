import { defineStore } from "pinia";

export const useChatStore = defineStore("chat", {
  state: () => {
    return {
      chatList: [
        {
          id: "1",
          name: "示例介绍示例介绍示例介绍示例介绍",
          type: "friend",
          lastChatTime: "2023-08-08 11:12:12",
          lastChatContent:
            "测试一下文本内容测试一下文本内容测试一下文本内容测试一下文本内容",
          lastChatContentType: "text",
          avatar: "http://img.adoutu.com/article/1606320535770.gif",
        },
        {
          id: "2",
          name: "示例介绍",
          type: "group",
          lastChatTime: "2023-08-07 12:12:12",
          lastChatContent: "测试一下文本内容",
          lastChatContentType: "text",
          avatar: "http://img.adoutu.com/article/1606320535770.gif",
        },
        {
          id: "3",
          name: "示例介绍示例介绍示例介绍示例介绍示例介绍",
          type: "friend",
          lastChatTime: "2023-06-07 12:12:12",
          lastChatContent: "测试一下文本内容测试一下文本内容测试一下文本内容",
          lastChatContentType: "text",
          avatar: "http://img.adoutu.com/article/1606320535770.gif",
        },
      ],
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
