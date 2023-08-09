<template>
  <div class="chat-list" ref="componentRef">
    <div v-for="chat in useChatStore.chatList" :key="chat.id" class="custom-item chat-item"
      :class="{ active: useChatStore.activeChat === chat.id }" @click="handleChatClick(chat.id)"
      @contextmenu="rightClicked($event)">
      <img :src="chat.avatar" alt="" class="chat-avatar">
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
import useStore from '@/store'
import { friendTime } from '@/utils/utils'
import useDetectOutsideClick from '@/hooks/useDetectOutsideClick'
import { onMounted, ref } from 'vue'
const { useChatStore, useSystemStore, useContextMenuStore } = useStore()

onMounted(() => {
  useChatStore.activeChat = useChatStore.activeChat || useChatStore.chatList[0]['id']
})

const handleChatClick = (id) => {
  useContextMenuStore.hideContextMenu()
  useChatStore.activeChat = id
}

const rightClicked = (e) => {
  e.preventDefault();
  useContextMenuStore.showContextMenu(e.clientY, e.clientX);
}

const componentRef = ref()
useDetectOutsideClick(componentRef, () => {
  useSystemStore.activeMenu === 'message' && useContextMenuStore.hideContextMenu()
})
</script>

<style lang="less">
.chat-list {
  background-color: #E7E6E5;
  min-height: 100%;
  
  .chat-item {
    display: flex;
    padding: 12px;

    &.top {
      background-color: #E1DEDD;
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