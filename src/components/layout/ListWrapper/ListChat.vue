<template>
  <perfect-scrollbar>
    <div class="chat-list">
      <div
        v-for="chat in chatLists"
        :key="chat.id"
        class="custom-item chat-item"
        :class="{ active: useChatStore.activeChat === chat.friendId, top: chat.isTop }"
        @click="handleChatClick(chat)"
        @contextmenu.stop="e => rightClicked(e, chat)"
      >
        <a-badge :count="chat.unReadCount || 0" title="">
          <img :src="chat.avatar" alt="" class="chat-avatar" />
        </a-badge>
        <div class="chat-info">
          <div class="chat-info-top">
            <p class="chat-name">{{ chat.name }}</p>
            <p class="chat-time">{{ friendTime(chat.lastChatTime) }}</p>
          </div>
          <p class="chat-content">{{ chat.lastChatContent }}</p>
        </div>
      </div>
    </div>
    <WeNoData v-if="!chatLists.length" text="无结果" :imageStyle="{color:'#ccc'}" />
  </perfect-scrollbar>
</template>

<script setup>
import { friendTime } from "@/utils/utils";
import useStore from "@/store";
import { computed } from "vue";
const {
  useChatStore,
  useSystemStore,
  useContextMenuStore,
} = useStore();

// 点击聊天列表
const handleChatClick = (chat) => {
  // 展示聊天内容
  useChatStore.activeChat = chat.friendId;
  useChatStore.chatList.map(item => {
    if (item.friendId === chat.friendId) {
      item['unReadCount'] = 0;
    }
  })
  // 展示聊天标题
  useSystemStore.boxTitleText = chat.name;
  useSystemStore.listSearchText = "";
};

// 点击右键展示自定义菜单
const rightClicked = (e, chat) => {
  e.preventDefault();
  useContextMenuStore.showContextMenu(e.clientX, e.clientY, "chat", chat);
};

const chatLists = computed(() => {
  let chatList = [...useChatStore.chatList.filter(chat => chat.isTop), ...useChatStore.chatList.filter(chat => !chat.isTop)]
  return chatList.filter(chat => chat.name.indexOf(useSystemStore.listSearchText) >= 0)
})
</script>

<style lang="less" scoped>
.chat-list {
  background-color: #e7e6e5;

  .chat-item {
    display: flex;
    padding: 12px;

    &.top {
      background-color: #DCDCDC;
      &:hover {
        background-color: #D6D6D6;
      }
      &.active {
        background-color: #C9C9C9;
      }
    }

    .chat-avatar {
      width: 40px;
      height: 40px;
      border-radius: 4px;
    }

    .chat-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      margin-left: 12px;
      width: 170px;

      .chat-info-top {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        color: #000;

        .chat-name {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          flex: 1;
        }

        .chat-time {
          font-size: 12px;
          color: #999;
        }
      }

      .chat-content {
        font-size: 12px;
        color: #999;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>

<style lang="less">
.chat-list {
  .ant-badge {
    .ant-badge-count {
      min-width: 16px !important;
      height: 16px !important;
      line-height: 16px !important;
      box-shadow: none !important;
      font-size: 12px !important;
      .ant-scroll-number-only, .ant-scroll-number-only-unit {
        height: 16px !important;
      }
    }
    .ant-badge-multiple-words {
      padding: 0 4px;
    }
  }
}
</style>