import { defineStore } from "pinia";

export const useSystemStore = defineStore("system", {
  state: () => {
    return {
      activeMenu: "chat", // 当前聚焦的工具栏目
      windows: { // 窗口信息
        top: 0,
        left: 0,
        width: 850,
        height: 660,
        minWidth: 700,
        minHeight: 500,
      },
      boxTitleText: '', // 聊天、收藏夹的标题，因为俩地儿都用到了，就放这儿吧
      listSearchText: '', // 搜索栏内容
      windowState: {
        isTop: false, // 是否置顶
        status: "normal", // 默认 normal、最小化 minimize、最大化 maximize、关闭 closed
        prevStatus: "", // 默认 normal、最小化 minimize、最大化 maximize
        prevWindows: {}, // 最小化、最大化后，恢复至上一次的窗口状态
      },
      isLocked: false, // 是否为锁屏状态
      qqGroupLink: "http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=FBr4JIxIckrUqgDK-rbdMkoQYfJT4BCs&authKey=Dl1dUP8%2BXRNefHTYG38DyEi3CAOf20Pc8yyIJwKQ7HlP5WX7nYhURs2vVtmttNHX&noverify=0&group_code=887911914", // 跳转加群链接
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
