import { defineStore } from "pinia";

export const useCollectStore = defineStore("collect", {
  state: () => {
    return {
      collectTypeList: [
        {
          title: "全部收藏",
          type: "all",
        },
        {
          title: "最近使用",
          type: "recent",
        },
        {
          title: "链接",
          type: "link",
        },
        {
          title: "笔记",
          type: "note",
        },
      ],
      collectList: [], // 收藏夹列表
      tags: [ // 标签类型列表
        {
          id: "1",
          title: "标签A",
        },
        {
          id: "2",
          title: "标签B",
        },
        {
          id: "3",
          title: "标签C",
        },
        {
          id: "4",
          title: "标签D",
        },
        {
          id: "5",
          title: "标签E",
        },
        {
          id: "6",
          title: "标签F",
        },
        {
          id: "7",
          title: "标签G",
        },
        {
          id: "8",
          title: "标签H",
        },
      ],
      activeCollectType: "", // 当前聚焦的收藏类型
      activeCollect: "", // 当前聚焦的收藏对象id
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
