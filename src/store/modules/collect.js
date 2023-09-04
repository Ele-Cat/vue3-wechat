import { defineStore } from "pinia";

export const useCollectStore = defineStore("collect", {
  state: () => {
    return {
      typeList: [
        {
          title: "全部收藏",
          searchType: "all",
          collectType: "type",
        },
        {
          title: "最近使用",
          searchType: "recent",
          collectType: "type",
        },
        {
          title: "链接",
          searchType: "link",
          collectType: "type",
        },
        {
          title: "笔记",
          searchType: "note",
          collectType: "type",
        },
        {
          id: 1,
          title: "标签A",
          searchType: "标签A",
          collectType: "tag",
        },
        {
          id: 2,
          title: "标签B",
          searchType: "标签B",
          collectType: "tag",
        },
        {
          id: 3,
          title: "标签C",
          searchType: "标签C",
          collectType: "tag",
        },
        {
          id: 4,
          title: "标签D",
          searchType: "标签D",
          collectType: "tag",
        },
        {
          id: 5,
          title: "标签E",
          searchType: "标签E",
          collectType: "tag",
        },
        {
          id: 6,
          title: "标签F",
          searchType: "标签F",
          collectType: "tag",
        },
        {
          id: 7,
          title: "标签G",
          searchType: "标签G",
          collectType: "tag",
        },
        {
          id: 8,
          title: "标签H",
          searchType: "标签H",
          collectType: "tag",
        },
        {
          id: 9,
          title: "标签I",
          searchType: "标签I",
          collectType: "tag",
        },
      ],
      collectList: [], // 收藏夹列表
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
