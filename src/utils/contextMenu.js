export const contextEnums = {
  toTop: "置顶",
  unTop: "取消置顶",
  unRead: "标为未读",
  hasRead: "标为已读",
  noDisturb: "消息免打扰",
  openInAStandaloneWindow: "在独立窗口中打开",
  hideChat: "不显示聊天",
  deleteChat: "删除聊天",
  copyText: "复制",
  multipleSelect: "多选",
  searchForIt: "搜一搜",
  translate: "翻译",
  transmit: "转发",
  collectText: "收藏",
  quote: "引用",
  deleteChatItem: "删除",
  sendMessage: "发消息",
  setNotesAndLabels: "设置备注和标签",
  setPermissions: "设置朋友权限",
  recommendToFriends: "推荐给朋友",
  markAsStarFriend: "标为星标朋友",
  sendBusinessCard: "发送名片",
  joinInBlacklist: "加入黑名单",
  deleteFriend: "删除朋友",
  editTag: "编辑标签",
  copyAddress: "复制地址",
  deleteCollect: "删除",
}

export const contextMenus = {
  chat: [
    {
      type: "toTop",
    },
    {
      type: "unRead",
    },
    {
      type: "noDisturb",
    },
    {
      type: "openInAStandaloneWindow",
    },
    {
      type: "hideChat",
      borderTop: true,
    },
    {
      type: "deleteChat",
    },
  ],
  chatSelectSome: [
    {
      type: "copyText",
    },
    {
      type: "multipleSelect",
    },
    {
      type: "searchForIt",
    },
  ],
  chatSelectAll: [
    {
      type: "copyText",
    },
    {
      type: "translate",
    },
    {
      type: "transmit",
      borderTop: true,
    },
    {
      type: "collectText",
    },
    {
      type: "multipleSelect",
    },
    {
      type: "quote",
    },
    {
      type: "searchForIt",
    },
    {
      type: "deleteChatItem",
      borderTop: true,
    },
  ],
  friend: [
    {
      type: "sendMessage",
    },
    {
      type: "markAsStarFriend",
    },
    {
      type: "sendBusinessCard",
    },
    {
      type: "deleteFriend",
      borderTop: true,
    },
  ],
  friendInfo: [
    {
      type: "setNotesAndLabels",
    },
    {
      type: "setPermissions",
    },
    {
      type: "recommendToFriends",
      borderTop: true,
    },
    {
      type: "markAsStarFriend",
      borderTop: true,
    },
    {
      type: "joinInBlacklist",
      borderTop: true,
    },
    {
      type: "deleteChatItem",
      borderTop: true,
    },
  ],
  collect: [
    {
      type: "transmit",
    },
    {
      type: "editTag",
    },
    {
      type: "multipleSelect",
    },
    {
      type: "copyAddress",
      borderTop: true,
    },
    {
      type: "deleteCollect",
      borderTop: true,
    },
  ],
};
