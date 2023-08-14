import { defineStore } from "pinia";

export const useCollectStore = defineStore("collect", {
  state: () => {
    return {
      collectList: [ // 收藏夹列表
        {
          id: "1",
          title: "示例介绍示例介绍示例介绍示例介绍",
          content: "测试一下文本内容测试一下文本内容测试一下文本内容测试一下文本内容",
          author: "ele-cat",
          type: "note",
          tags: ['前端'],
          time: "2023-08-08 11:12:12",
          cover: "http://img.adoutu.com/article/1606320535770.gif",
        },
        {
          id: "2",
          title: "示例介绍",
          content: "测试一下文本内容",
          author: "ele-cat",
          type: "link",
          tags: ['前端'],
          time: "2023-08-07 12:12:12",
          cover: "http://img.adoutu.com/article/1606320535770.gif",
        },
        {
          id: "3",
          title: "示例介绍示例介绍示例介绍示例介绍示例介绍",
          content: "测试一下文本内容测试一下文本内容测试一下文本内容",
          author: "ele-cat",
          type: "link",
          tags: ['前端'],
          time: "2023-06-07 12:12:12",
          cover: "http://img.adoutu.com/article/1606320535770.gif",
        },
      ],
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
