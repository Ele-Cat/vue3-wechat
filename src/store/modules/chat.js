import { defineStore } from "pinia";
import dayjs from "dayjs";
import { guid } from "@/utils/utils";

export const useChatStore = defineStore("chat", {
  state: () => {
    return {
      chatList: [], // 聊天列表
      chatInfos: {}, // 聊天记录
      activeChat: "", // 当前聚焦的聊天对象id
      isFocusSendArea: false,
      sendMethods: 'enter', // 发送消息方式
    };
  },
  actions: {
    addChat() {
      this.chatList.shift({
        id: '2',
        name: '',
        type: '',
        lastChatTime: '',
        lastChatContnt: '',
        lastChatContntType: '',
        avatar: '',
      })
    },
    editChat() {

    },
    deleteChat() {},
    /**
     * 将文本添加至聊天记录
     * @param {string} activeChat 当前聊天
     * @param {string} content 发送的信息
     */
    sendChatMsg(activeChat, content) {
      this.chatInfos[activeChat].push({
        id: guid(),
        type: "send",
        content: content,
        createTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      });
    },
    /**
     * 将聊天前移
     * @param {string} activeChat 当前聊天
     * @param {string} content 发送的信息
     */
    forwardChat(activeChat, content) {
      const targetIndex = this.chatList.findIndex(item => item.friendId === activeChat);
      const targetItem = this.chatList.splice(targetIndex, 1)[0];
      targetItem.lastChatContent = content;
      targetItem.lastChatTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
      this.chatList.unshift(targetItem);
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
