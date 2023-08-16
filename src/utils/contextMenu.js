const contextMenus = {
  chat: [
    {
      label: "置顶",
      value: "toTop",
      borderTop: false,
    },
    {
      label: "标为未读",
      value: "unRead",
      borderTop: false,
    },
    {
      label: "消息免打扰",
      value: "noDisturb",
      borderTop: false,
    },
    {
      label: "在独立窗口中打开",
      value: "openInAStandaloneWindow",
      borderTop: false,
    },
    {
      label: "不显示聊天",
      value: "hideChat",
      borderTop: true,
    },
    {
      label: "删除聊天",
      value: "deleteChat",
      borderTop: false,
    },
  ],
  chatSelectSome: [
    {
      label: "复制",
      value: "copyText",
      borderTop: false,
    },
    {
      label: "多选",
      value: "multipleSelect",
      borderTop: false,
    },
    {
      label: "搜一搜",
      value: "searchForIt",
      borderTop: false,
    },
  ],
  chatSelectAll: [
    {
      label: "复制",
      value: "copyText",
      borderTop: false,
    },
    {
      label: "翻译",
      value: "translate",
      borderTop: false,
    },
    {
      label: "转发",
      value: "forward",
      borderTop: true,
    },
    {
      label: "收藏",
      value: "collectText",
      borderTop: false,
    },
    {
      label: "多选",
      value: "multipleSelect",
      borderTop: false,
    },
    {
      label: "引用",
      value: "quote",
      borderTop: false,
    },
    {
      label: "搜一搜",
      value: "searchForIt",
      borderTop: false,
    },
    {
      label: "删除",
      value: "deleteChatItem",
      borderTop: true,
    },
  ],
  friend: [
    {
      label: "发消息",
      value: "sendMessage",
      borderTop: false,
    },
    {
      label: "标为星标朋友",
      value: "markAsStarFriend",
      borderTop: false,
    },
    {
      label: "发送名片",
      value: "sendBusinessCard",
      borderTop: false,
    },
    {
      label: "删除朋友",
      value: "deleteFriend",
      borderTop: true,
    },
  ],
  collect: [
    {
      label: "转发",
      value: "transmit",
      borderTop: false,
    },
    {
      label: "编辑标签",
      value: "editTag",
      borderTop: false,
    },
    {
      label: "多选",
      value: "multipleChoice",
      borderTop: false,
    },
    {
      label: "复制地址",
      value: "copyAddress",
      borderTop: true,
    },
    {
      label: "删除",
      value: "deleteCollect",
      borderTop: true,
    },
  ],
};

export default contextMenus;