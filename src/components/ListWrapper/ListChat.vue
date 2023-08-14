<template>
  <div class="chat-list">
    <div
      v-for="chat in useChatStore.chatList"
      :key="chat.id"
      class="custom-item chat-item"
      :class="{ active: useChatStore.activeChat === chat.friendId }"
      @click="handleChatClick(chat)"
      @contextmenu.stop="rightClicked($event)"
    >
      <img :src="chat.avatar" alt="" class="chat-avatar" />
      <div class="chat-info">
        <div class="chat-info-top">
          <p class="chat-name">{{ chat.name }}</p>
          <p class="chat-time">{{ friendTime(chat.lastChatTime) }}</p>
        </div>
        <p class="chat-content">{{ chat.lastChatContent }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { friendTime } from "@/utils/utils";
import useStore from "@/store";
const {
  useChatStore,
  useSystemStore,
  useContextMenuStore,
} = useStore();

// 点击聊天列表
const handleChatClick = (chat) => {
  // 展示聊天内容
  useChatStore.activeChat = chat.friendId;
  // 展示聊天标题
  useSystemStore.boxTitleText = chat.name;
};

// 点击右键展示自定义菜单
const rightClicked = (e) => {
  e.preventDefault();
  useContextMenuStore.showContextMenu(e.clientY, e.clientX);
};
</script>

<style lang="less" scoped>
.chat-list {
  background-color: #e7e6e5;
  height: 100%;
  overflow: auto;

  .chat-item {
    display: flex;
    padding: 12px;

    &.top {
      background-color: #e1dedd;
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
